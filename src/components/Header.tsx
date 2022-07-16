import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const Header = () => {
  return (
    <SafeAreaView>
      <Text style={styles.text}>Basit Çeviri</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    width: '100%',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '500',
    padding: 5,
  },
});

export default Header;
