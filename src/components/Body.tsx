import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import debounce from 'lodash.debounce';
import {translate} from '../services/translate';
import {Languages, getLanguageText} from '../utils/const';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {create} from '../models/translate';

interface TranslateValueObject {
  q: string;
  source: Languages;
  target: Languages;
}

const Body = () => {
  const [translateValues, setTranslateValues] =
    React.useState<TranslateValueObject>({
      q: '',
      source: 'tr',
      target: 'en',
    });
  const [translatedText, setTranslatedText] = React.useState<string>('');

  React.useEffect(() => {
    const fetchData = debounce(async () => {
      create(translateValues.q);
      const result = await translate(translateValues);

      setTranslatedText(result);
    }, 100);

    translateValues.q && fetchData();
  }, [translateValues]);

  const handleChange = (text: string) => {
    setTranslateValues(old => {
      return {
        ...old,
        q: text,
      };
    });

    if (!text) {
      setTranslatedText('');
    }
  };

  const setSourceAndTargetLanguage = () => {
    const newSourceLanguage = translateValues.source === 'en' ? 'tr' : 'en';
    const newTargetLanguage = newSourceLanguage === 'en' ? 'tr' : 'en';

    setTranslateValues(old => {
      return {
        ...old,
        source: newSourceLanguage,
        target: newTargetLanguage,
      };
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Metin Girin"
          defaultValue={translateValues.q}
          onChangeText={handleChange}
          maxLength={1000}
        />
      </View>

      <View style={styles.divider} />

      <View
        style={[
          styles.resultWrapper,
          translatedText ? styles.hasTranslatedText : '',
        ]}>
        <Text style={styles.result}>{translatedText}</Text>
      </View>

      <View style={styles.actions}>
        <View style={[styles.actionItem, styles.langLabel]}>
          <Text style={styles.langLabelText}>
            {getLanguageText(translateValues.source)}
          </Text>
        </View>
        <View style={styles.langSelector}>
          <TouchableOpacity
            style={styles.langButton}
            onPress={setSourceAndTargetLanguage}
            activeOpacity={1}>
            <MaterialCommunityIcons
              name="swap-horizontal"
              size={32}
              color="#333"
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.actionItem, styles.langLabel]}>
          <Text style={styles.langLabelText}>
            {getLanguageText(translateValues.target)}
          </Text>
        </View>
      </View>

      <View style={styles.voiceWrapper}>
        <TouchableOpacity style={styles.voiceButton}>
          <MaterialCommunityIcons
            name="microphone-outline"
            size={32}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  inputWrapper: {},
  input: {
    width: '100%',
    fontSize: 25,
    padding: 5,
  },
  divider: {},
  resultWrapper: {},
  hasTranslatedText: {
    marginBottom: 15,
  },
  result: {
    width: '100%',
    fontSize: 25,
    padding: 5,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
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
  voiceWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  voiceButton: {
    backgroundColor: '#333',
    borderRadius: 50,
    padding: 15,
  },
});

export default Body;
