import {View, StyleSheet} from 'react-native';
import React from 'react';
import MusicPlayer from '../components/MusicPlayer';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Home = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      {/* <View style={styles.container}> */}
        <Tab.Navigator>
          <Tab.Screen name="MusicPlayer" component={MusicPlayer} />
        </Tab.Navigator>
      {/* </View> */}
    </NavigationContainer>
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
