import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Playlist = ({navigation}) => {
  const [albumCover, setAlbumCover] = useState(null);
  const [albumName, setAlbumName] = useState(null);

  const [songs, setSongs] = useState(null);
  const getAlbum = async () => {
    try {
      const id = await AsyncStorage.getItem('AlbumId');
      console.log(id);
      const res = await fetch(`https://saavn.me/albums?id=${id}`);
      const albumData = await res.json();
      // console.log(albumData.results);
      setAlbumName(albumData.results.name);
      setAlbumCover(albumData.results.image[2].link);
      setSongs(albumData.results.songs);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    navigation.addListener('focus', () => {
      getAlbum();
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{albumName}</Text>
      <Image style={styles.image} source={{uri: `${albumCover}`}} />
      <View>
        {songs ? (
          <View style={styles.list}>
            <FlatList
              style={{flex: 1}}
              data={songs}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={async () => {
                      const length = item.downloadUrl.length;
                      const song = item.downloadUrl[length - 1].link;
                      const name = item.name;
                      const image = item.image[2].link;
                      const artist = item.primaryArtists;
                      // console.log(song)
                      await AsyncStorage.setItem('song', song);
                      await AsyncStorage.setItem('name', name);
                      await AsyncStorage.setItem('image', image);
                      await AsyncStorage.setItem('artist', artist);
                      console.log('song stored');
                      navigation.navigate('MusicPlayer');
                    }}
                    key={item.id}>
                    <View style={styles.box}>
                      <Image
                        style={styles.songImage}
                        source={{uri: `${item.image[0].link}`}}
                      />
                      <Text style={styles.songName}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
  },
  image: {
    width: '80%',
    height: 250,
    marginHorizontal: '10%',
    borderRadius: 10,
    margin: 20,
  },
  box: {
    flexDirection: 'row',
    width: '80%',
    marginHorizontal: '10%',
    borderBottomWidth: 1,
    padding: 10,
    margin: 10,
  },
  songImage: {
    width: 50,
    height: 50,
  },
  songName: {
    marginTop: 10,
    fontSize: 20,
    marginLeft: 20,
    color: 'black',
  },
  list: {
    width: '100%',
    height:300,
    padding: 5,
  },
});
export default Playlist;
