import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Trending = ({album, title, skip, navigation}) => {
  const store = async e => {
    try {
      await AsyncStorage.setItem('AlbumId', e);
      console.log('album Stored');
      navigation.navigate('Playlist');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <Text
        style={{fontSize: 20, marginLeft: 10, marginTop: 2, color: 'black'}}>
        {title}
      </Text>

      <FlatList
        style={styles.flatlist}
        data={album}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          if (item.type != skip) {
            return (
              <TouchableOpacity
                onPress={() => {
                  if (skip != '') {
                    store(item.id);
                  } else {
                    alert(`No data found for ${title}`);
                  }
                }}>
                <View style={styles.box}>
                  <Image source={{uri: `${item.image}`}} style={styles.image} />
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            );
          }
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 150,
    // position:"absolute"
  },
  flatlist: {
    width: '98%',
    margin: 10,
    height: 50,
  },
  box: {
    width: 90,
    marginHorizontal: 5,
    height: 80,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  title: {
    color: 'black',
  },
});
export default Trending;
