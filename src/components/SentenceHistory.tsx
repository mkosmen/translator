import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SentenceItem} from '@models/index';

type Props = {
  items?: SentenceItem[];
  handleDelete?: (rowid: number) => void;
};

const SentenceHistory = (props: Props) => {
  const {items} = props;
  const sheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['5%', '90%'], []);

  const renderItem = ({item}: {item: SentenceItem}) => {
    return (
      <View style={styles.item}>
        <View style={styles.textContainer}>
          <Text style={styles.languages}>
            {item.source} - {item.target}
          </Text>
          <Text style={styles.itemText}>{item.sentence}</Text>
        </View>

        <TouchableOpacity
          style={styles.itemDeleteButton}
          activeOpacity={1}
          onPress={() => props?.handleDelete?.(item.rowid)}>
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
        {items && items.length > 0 ? (
          <BottomSheetFlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item: SentenceItem) => item.rowid.toString()}
            contentContainerStyle={styles.items}
          />
        ) : (
          <View style={styles.noItems}>
            <Text>Hiç kelime yok</Text>
          </View>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemText: {
    fontSize: 14,
    paddingRight: 30,
    color: '#333',
    marginRight: 30,
  },
  itemDeleteButton: {
    marginLeft: 'auto',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  languages: {
    marginRight: 15,
  },
  items: {},
  noItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SentenceHistory;
