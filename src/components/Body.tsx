import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Languages, getLanguageText} from '@utils/const';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  children?: React.ReactNode;
  translatedText?: string;
  source: Languages;
  target: Languages;
  handleChange?: (text: string) => void;
  handleChangeSourceAndTarget?: ({
    source,
    target,
  }: {
    source: Languages;
    target: Languages;
  }) => void;
};

const Body = (props: Props) => {
  const [sourceLanguage, setSourceLanguage] = React.useState<Languages>(
    props.source,
  );
  const [targetLanguage, setTargetLanguage] = React.useState<Languages>(
    props.target,
  );

  const changeSourceOrTarget = () => {
    const newSourceLanguage = sourceLanguage === 'en' ? 'tr' : 'en';
    const newTargetLanguage = newSourceLanguage === 'en' ? 'tr' : 'en';

    setSourceLanguage(newSourceLanguage);
    setTargetLanguage(newTargetLanguage);

    props.handleChangeSourceAndTarget?.({
      source: newSourceLanguage,
      target: newTargetLanguage,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Metin Girin"
          onChangeText={props.handleChange}
          maxLength={1000}
        />
      </View>

      <View style={styles.divider} />

      <View
        style={[
          styles.resultWrapper,
          props.translatedText ? styles.hasTranslatedText : '',
        ]}>
        <Text style={styles.result}>{props.translatedText}</Text>
      </View>

      <View style={styles.actions}>
        <View style={[styles.actionItem, styles.langLabel]}>
          <Text style={styles.langLabelText}>
            {getLanguageText(sourceLanguage)}
          </Text>
        </View>
        <View style={styles.langSelector}>
          <TouchableOpacity
            style={styles.langButton}
            onPress={changeSourceOrTarget}
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
            {getLanguageText(targetLanguage)}
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
