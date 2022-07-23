import React from 'react';
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

const App = () => {
  const [text, setText] = React.useState<string>('');
  const [translatedText, setTranslatedText] = React.useState<string>('');
  const [sourceAndTarget, setSourceAndTarget] =
    React.useState<SourceAndTargetProps>({
      source: 'tr',
      target: 'en',
    });

  const handleChange = (q: string) => {
    search.cancel();
    setText(q);
  };

  const handleChangeSourceAndTarget = (langs: SourceAndTargetProps) => {
    setSourceAndTarget(langs);
  };

  const search = React.useRef(
    debounce(async (props: TranslateProps) => {
      const result = await translate(props);

      setTranslatedText(result);
    }, 150),
  ).current;

  React.useEffect(() => {
    if (text) {
      search({
        q: text,
        source: sourceAndTarget.source,
        target: sourceAndTarget.target,
      });
    } else {
      setTranslatedText('');
    }

    return () => {
      search.cancel();
    };
  }, [search, text, sourceAndTarget]);

  return (
    <GestureHandlerRootView style={styles.gesture}>
      <SafeAreaView style={styles.container}>
        <Header />

        <Body
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
