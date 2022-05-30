import Home from './src/Screens/Home';
import {View, StatusBar, StyleSheet} from 'react-native';
import React from 'react';

const App = () => {
  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="red" barStyle="default" /> */}
      <Home />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
