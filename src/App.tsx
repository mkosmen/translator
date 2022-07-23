import React, {useRef, useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Header from './components/Header';
import Body from './components/Body';
import SentenceHistory from './components/SentenceHistory';
import {
  translate,
  TranslateProps,
  SourceAndTargetProps,
} from '@services/translate';
import {debounce} from 'lodash';
import {create, getAll} from '@models/translate';

const App = () => {
  const [text, setText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [sourceAndTarget, setSourceAndTarget] = useState<SourceAndTargetProps>({
    source: 'tr',
    target: 'en',
  });
  const [showActions, setShowActions] = useState<boolean>(text !== '');

  const handleChange = (q: string) => {
    console.log('handleChange');

    search?.cancel();
    setText(q);
  };

  const handleChangeSourceAndTarget = (langs: SourceAndTargetProps) => {
    console.log('handleChangeSourceAndTarget');
    setSourceAndTarget(langs);
  };

  const search = useRef(
    debounce(async (props: TranslateProps) => {
      const result = await translate(props);

      setTranslatedText(result);

      // TODO: Problem burada
      create({text: props.q, source: props.source, target: props.target});
    }, 100),
  ).current;

  const handleClear = () => {
    setText('');
  };

  useEffect(() => {
    console.log('useEffect 1');
    if (text) {
      search({
        q: text,
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
    // console.log('useEffect 2');
    getAll().map(m => {
      console.log('m', m.id);
    });
  }, []);

  return (
    <GestureHandlerRootView style={styles.gesture}>
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

        <SentenceHistory />
      </SafeAreaView>
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
