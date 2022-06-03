import {View, StyleSheet} from 'react-native';
import React from 'react';
import MusicPlayer from '../components/MusicPlayer';
const Home = () => {
  return (
    <View style={styles.container}>
      <MusicPlayer />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Home;
