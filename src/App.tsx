import React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CustomBackdrop from './components/CustomBackdrop';
import Header from './components/Header';
import Body from './components/Body';

const App = () => {
  const sheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['5%', '70%'], []);

  return (
    <GestureHandlerRootView style={styles.gesture}>
      <SafeAreaView style={styles.container}>
        <Header />
        <Body />

        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          backdropComponent={CustomBackdrop}>
          <BottomSheetView>
            <Text>Awesome 🔥</Text>
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
});

export default App;
