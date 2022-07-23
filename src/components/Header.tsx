import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type Props = {
  showActions: boolean;
  handleClear?: () => void;
};

const Header = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Basit Çeviri</Text>

      {props.showActions ? (
        <View style={styles.actions}>
          <TouchableOpacity activeOpacity={1} onPress={props.handleClear}>
            <FontAwesome5 name="times" size={18} color="#333" />
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  actions: {
    marginLeft: 'auto',
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
    padding: 5,
    color: '#333',
  },
});

export default Header;
