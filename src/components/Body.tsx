import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import Voice, {SpeechResultsEvent} from '@react-native-community/voice';
import {Languages, getLanguageText} from '@utils/const';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  children?: React.ReactNode;
  text?: string;
  translatedText?: string;
  source: Languages;
  target: Languages;
  handleChange: (text: string) => void;
  handleChangeSourceAndTarget?: ({
    source,
    target,
  }: {
    source: Languages;
    target: Languages;
  }) => void;
};

const Body = (props: Props) => {
  const {handleChange, text, source, target} = props;

  const [searchText, setSearchText] = useState<string | undefined>(text);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [sourceLanguage, setSourceLanguage] = useState<Languages>(source);
  const [targetLanguage, setTargetLanguage] = useState<Languages>(target);

  const startSpeechRecognizing = async () => {
    try {
      await Voice.start(sourceLanguage === 'en' ? 'en-US' : 'tr-TR');

      setModalVisible(true);
    } catch (e) {
      Alert.alert('Bir hata oluştu');
    }
  };

  const stopSpeechRecognizing = async () => {
    setModalVisible(false);

    try {
      await Voice.stop();
    } catch (e) {
      Alert.alert('Bir hata oluştu');
    }
  };

  const changeSourceOrTarget = () => {
    const newSourceLanguage = targetLanguage;
    const newTargetLanguage = sourceLanguage;

    setSourceLanguage(newSourceLanguage);
    setTargetLanguage(newTargetLanguage);

    props.handleChangeSourceAndTarget?.({
      source: newSourceLanguage,
      target: newTargetLanguage,
    });
  };

  const handleTextChange = useCallback(
    (q: string) => {
      setSearchText(q);

      handleChange(q);
    },
    [handleChange],
  );

  useEffect(() => {
    Voice.onSpeechError = (e: any) => {
      const error = JSON.stringify(e.error);
      Alert.alert('Bir hata oluştu', error);
    };

    Voice.onSpeechResults = (e: SpeechResultsEvent) => {
      const results = e.value;

      handleTextChange(results?.[0] ?? '');
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [handleTextChange]);

  useEffect(() => {
    setSearchText(text);
  }, [text]);

  useEffect(() => {
    setSourceLanguage(source);
    setTargetLanguage(target);
  }, [source, target]);

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Metin Girin"
          placeholderTextColor="#999"
          value={searchText}
          multiline={true}
          onChangeText={handleTextChange}
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
        <TouchableOpacity
          style={styles.voiceButton}
          onLongPress={startSpeechRecognizing}
          onPressOut={stopSpeechRecognizing}>
          <MaterialCommunityIcons
            name="microphone-outline"
            size={32}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      <Modal isVisible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <MaterialCommunityIcons
              name="microphone-outline"
              size={32}
              style={styles.modalTextIcon}
            />
            <Text style={styles.modalText}>Kayıt Başlatıldı</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  inputWrapper: {
    width: '100%',
  },
  input: {
    width: '100%',
    fontSize: 18,
    padding: 5,
    color: '#444',
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
    color: '#333',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: 180,
  },
  modalText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 18,
    color: '#333',
  },
  modalTextIcon: {
    backgroundColor: '#d0d0d0',
    padding: 15,
    borderRadius: 30,
    marginBottom: 20,
    color: '#333',
  },
});

export default Body;
