import React from 'react';
import {
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import debounce from 'lodash.debounce';
import {translate} from '../services/translate';
import {Languages, getLanguageText} from '../utils/const';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Body = () => {
  const [text, setText] = React.useState<string>('');
  const [source, setSource] = React.useState<Languages>('tr');
  const [target, setTarget] = React.useState<Languages>('en');
  const [translatedText, setTranslatedText] = React.useState<string>('');

  const search = React.useRef(
    debounce(async q => {
      const result = await translate({q, source, target});

      setTranslatedText(result);
    }, 100),
  ).current;

  const handleChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const {text: nextValue} = event.nativeEvent;
    setText(nextValue);
    search(nextValue);
  };

  const setSourceAndTargetLanguage = () => {
    const newSourceLanguage = source === 'en' ? 'tr' : 'en';
    const newTargetLanguage = newSourceLanguage === 'en' ? 'tr' : 'en';

    setSource(newSourceLanguage);
    setTarget(newTargetLanguage);
  };

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Metin Girin"
        defaultValue={text}
        onChange={handleChange}
        maxLength={1000}
      />

      <View style={styles.divider} />

      <View style={styles.result}>
        <Text>{translatedText}</Text>
      </View>

      <View style={styles.actions}>
        <View style={[styles.actionItem, styles.langLabel]}>
          <Text style={styles.langLabelText}>{getLanguageText(source)}</Text>
        </View>
        <View style={styles.langSelector}>
          <TouchableOpacity
            style={styles.langButton}
            onPress={setSourceAndTargetLanguage}
            activeOpacity={1}>
            <MaterialIcons name="swap-horiz" size={32} color="#333" />
          </TouchableOpacity>
        </View>
        <View style={[styles.actionItem, styles.langLabel]}>
          <Text style={styles.langLabelText}>{getLanguageText(target)}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    fontSize: 25,
    padding: 5,
  },
  divider: {},
  result: {},
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  actionItem: {
    padding: 4,
  },
  langLabel: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 12,
  },
  langLabelText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  langSelector: {
    marginHorizontal: 15,
  },
  langButton: {},
});

export default Body;
