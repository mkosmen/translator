import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import CustomBackdrop from './components/CustomBackdrop';
import Header from './components/Header';
import Body from './components/Body';
import {getAll} from './models/translate';

type SentenceItem = {
  _id: string;
  sentence: string;
};

const App = () => {
  const sheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['5%', '90%'], []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sentences, setSentences] = React.useState<SentenceItem[]>([
    {_id: '1', sentence: 'Deneme'},
    {
      _id: '2',
      sentence:
        'Occaecat ex excepteur incididunt proident ex veniam enim elit irure adipisicing dolore ut consectetur.',
    },
  ]);

  React.useEffect(() => {
    console.log('çalıştı');

    const items = getAll();

    for (const i of items) {
      console.log(i);
    }
  }, []);

  const renderItem = ({item}: {item: SentenceItem}) => {
    return (
      <View style={styles.historyItem}>
        <Text style={styles.historyItemText}>{item.sentence}</Text>
        <TouchableOpacity
          style={styles.historyItemDeleteButton}
          activeOpacity={1}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={21}
            color="red"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={styles.gesture}>
      <SafeAreaView style={styles.container}>
        <Header />
        <Body />

        <BottomSheet ref={sheetRef} snapPoints={snapPoints}>
          <BottomSheetView style={styles.historyContainer}>
            <Text style={styles.historyTitle}>Kelime Geçmişi</Text>
            <FlatList
              data={sentences}
              renderItem={renderItem}
              keyExtractor={item => item._id}
            />
          </BottomSheetView>
        </BottomSheet>
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
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  historyContainer: {
    padding: 15,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 15,
    width: '100%',
    textAlign: 'center',
  },
  historyItem: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
  },
  historyItemText: {
    fontSize: 18,
    paddingRight: 30,
  },
  historyItemDeleteButton: {
    marginLeft: 'auto',
    paddingLeft: 15,
  },
});

export default App;
