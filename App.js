import {View, StyleSheet} from 'react-native';
import React from 'react';
import MusicPlayer from './src/Screens/MusicPlayer';
import Search from './src/Screens/Search';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const App = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{
            headerShown: false,
          }}
          name="MusicPlayer"
          component={MusicPlayer}
        />
        <Tab.Screen
          options={{
            headerShown: false,
          }}
          name="Search"
          component={Search}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
