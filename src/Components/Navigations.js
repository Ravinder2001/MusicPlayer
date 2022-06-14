import {View, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MusicPlayer from '../Screens/MusicPlayer';
import Search from '../Screens/Search';
import Favorite from '../Screens/Favorite';
import Playlist from '../Screens/Playlist';
import Settings from '../Screens/Settings';




const Navigations = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Search"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#030A5C',
          },
        }}>
        <Tab.Screen
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={focused ? styles.focusIcon : styles.unFocusIcon}>
                <Icon name="search" size={35} style={{color: 'white'}} />
              </View>
            ),
          }}
          name="Search"
          component={Search}
        />
        <Tab.Screen
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={focused ? styles.focusIcon : styles.unFocusIcon}>
                <MaterialCommunityIcons
                  name="playlist-music"
                  size={35}
                  style={{color: 'white'}}
                />
              </View>
            ),
          }}
          name="Playlist"
          component={Playlist}
        />
        <Tab.Screen
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={focused ? styles.focusIcon : styles.unFocusIcon}>
                <Icon name="musical-note" size={35} style={{color: 'white'}} />
              </View>
            ),
          }}
          name="MusicPlayer"
          component={MusicPlayer}
        />
        <Tab.Screen
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={focused ? styles.focusIcon : styles.unFocusIcon}>
                <Icon name="heart-sharp" size={35} style={{color: 'white'}} />
              </View>
            ),
          }}
          name="Favorite"
          component={Favorite}
        />
        <Tab.Screen
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={focused ? styles.focusIcon : styles.unFocusIcon}>
                <Icon
                  name="reorder-three-sharp"
                  size={35}
                  style={{color: 'white'}}
                />
              </View>
            ),
          }}
          name="Settings"
          component={Settings}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  focusIcon: {
    position: 'absolute',
    top: -20,
    backgroundColor: 'red',
    borderRadius: 50,

    padding: 10,
  },
  unFocusIcon: {
    backgroundColor: '#030A5C',
  },
});
export default Navigations;
