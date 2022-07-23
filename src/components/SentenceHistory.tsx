import React from 'react';
import {Text, StyleSheet, FlatList, View, TouchableOpacity} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import CustomBackdrop from './components/CustomBackdrop';

type SentenceItem = {
  _id: string;
  sentence: string;
};

const SentenceHistory = () => {
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

  const renderItem = ({item}: {item: SentenceItem}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.sentence}</Text>
        <TouchableOpacity style={styles.itemDeleteButton} activeOpacity={1}>
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
    <BottomSheet ref={sheetRef} snapPoints={snapPoints}>
      <BottomSheetView style={styles.container}>
        <Text style={styles.title}>Kelime Geçmişi</Text>
        <FlatList
          data={sentences}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 15,
    width: '100%',
    textAlign: 'center',
    color: '#333',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
  },
  itemText: {
    fontSize: 18,
    paddingRight: 30,
    color: '#333',
  },
  itemDeleteButton: {
    marginLeft: 'auto',
    paddingLeft: 15,
  },
});

export default SentenceHistory;
