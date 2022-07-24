import React, {useRef, useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text, ToastAndroid} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Header from './components/Header';
import Body from './components/Body';
import SentenceHistory from './components/SentenceHistory';
import {translate, TranslateProps, SourceAndTargetProps} from 'utils/translate';
import {debounce} from 'lodash';
import {
  createTable,
  create,
  getAll,
  isExist,
  remove,
  getOne,
} from '@services/translate';
import {getDBConnection} from '@utils/database';
import {SentenceItem} from '@models/index';

const App = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [translatedText, setTranslatedText] = useState<string>('');
  const [translationData, setTranslationData] = useState<TranslateProps>({
    sentence: '',
    source: 'tr',
    target: 'en',
  });
  const [showActions, setShowActions] = useState<boolean>(
    translationData.sentence !== '',
  );
  const [sentences, setSentences] = useState<SentenceItem[] | undefined>();

  const handleChange = (q: string) => {
    search?.cancel();
    setTranslationData(old => ({...old, sentence: q}));
  };

  const handleChangeSourceAndTarget = (langs: SourceAndTargetProps) => {
    setTranslationData(old => {
      return {
        ...old,
        ...langs,
      };
    });
  };

  const search = useRef(
    debounce(async (props: TranslateProps) => {
      const [result, db] = await Promise.all([
        translate(props),
        getDBConnection(),
      ]);

      setTranslatedText(result);

      if (props.sentence.length > 1) {
        const recordIsExists = await isExist(db, {
          sentence: props.sentence,
          source: props.source,
        });

        if (!recordIsExists) {
          await create(db, props);
          getAll(db).then(d => {
            setSentences(d);
          });
        }
      }
    }, 100),
  ).current;

  const handleClear = () => {
    setTranslationData(old => ({...old, sentence: ''}));
  };

  const handleDelete = async (rowid: number) => {
    try {
      const db = await getDBConnection();
      await remove(db, rowid);

      const newSentences = sentences?.filter(s => s.rowid !== rowid);

      setSentences(newSentences);
    } catch (error) {}
  };

  const handleSelect = async (rowid: number) => {
    try {
      const db = await getDBConnection();
      const data = await getOne(db, rowid);

      if (data) {
        setTranslationData(old => ({
          ...old,
          sentence: data.sentence,
          source: data.source,
          target: data.target,
        }));

        ToastAndroid.show('Cümle kalıbı seçildi', ToastAndroid.SHORT);
      }
    } catch (error) {}
  };

  useEffect(() => {
    console.log('translationData', translationData);

    if (translationData.sentence) {
      search(translationData);
    } else {
      setTranslatedText('');
    }

    setShowActions(translationData.sentence !== '');

    return () => {
      search.cancel();
    };
  }, [search, translationData]);

  useEffect(() => {
    const createTableIfNotExists = async () => {
      const db = await getDBConnection();
      await createTable(db);

      return db;
    };

    createTableIfNotExists().then(async d => {
      const results = await getAll(d);
      setSentences(results);

      setIsReady(true);
    });
  }, []);

  return (
    <GestureHandlerRootView style={styles.gesture}>
      {isReady ? (
        <SafeAreaView style={styles.container}>
          <Header showActions={showActions} handleClear={handleClear} />

          <Body
            text={translationData.sentence}
            source={translationData.source}
            target={translationData.target}
            handleChange={handleChange}
            handleChangeSourceAndTarget={handleChangeSourceAndTarget}
            translatedText={translatedText}
          />

          <SentenceHistory
            items={sentences}
            handleDelete={handleDelete}
            handleSelect={handleSelect}
          />
        </SafeAreaView>
      ) : (
        <View>
          <Text>Lütfen Bekleyin</Text>
        </View>
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gesture: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default App;
