import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Header from './components/Header';
import Body from './components/Body';

const App = () => {
  return (
    <SafeAreaView>
      <Header />
      <Body />
    </SafeAreaView>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({});

export default App;
