import React, {useRef, useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Header from './components/Header';
import Body from './components/Body';
import SentenceHistory from './components/SentenceHistory';
import {translate, TranslateProps, SourceAndTargetProps} from 'utils/translate';
import {debounce} from 'lodash';
import {createTable, create, getAll} from '@services/translate';
import {getDBConnection} from '@utils/database';
import {SentenceItem} from '@models/index';

const App = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [sourceAndTarget, setSourceAndTarget] = useState<SourceAndTargetProps>({
    source: 'tr',
    target: 'en',
  });
  const [showActions, setShowActions] = useState<boolean>(text !== '');
  const [sentences, setSentences] = useState<SentenceItem[] | undefined>();

  const handleChange = (q: string) => {
    search?.cancel();
    setText(q);
  };

  const handleChangeSourceAndTarget = (langs: SourceAndTargetProps) => {
    console.log('handleChangeSourceAndTarget');
    setSourceAndTarget(langs);
  };

  const search = useRef(
    debounce(async (props: TranslateProps) => {
      const [result, db] = await Promise.all([
        translate(props),
        getDBConnection(),
      ]);

      setTranslatedText(result);

      create(db, props);
      getAll(db).then(d => {
        setSentences(d);
      });
    }, 100),
  ).current;

  const handleClear = () => {
    setText('');
  };

  const handleDelete = (rowid: number) => {
    const newSentences = sentences?.filter(s => s.rowid !== rowid);

    setSentences(newSentences);
  };

  useEffect(() => {
    if (text) {
      search({
        sentence: text,
        source: sourceAndTarget.source,
        target: sourceAndTarget.target,
      });
    } else {
      setTranslatedText('');
    }

    setShowActions(text !== '');

    return () => {
      search.cancel();
    };
  }, [search, text, sourceAndTarget]);

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
            text={text}
            source={sourceAndTarget.source}
            target={sourceAndTarget.target}
            handleChange={handleChange}
            handleChangeSourceAndTarget={handleChangeSourceAndTarget}
            translatedText={translatedText}
          />

          <SentenceHistory items={sentences} handleDelete={handleDelete} />
        </SafeAreaView>
      ) : (
        <View>
          <Text>Loading</Text>
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
