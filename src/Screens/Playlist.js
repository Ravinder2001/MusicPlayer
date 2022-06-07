import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
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
          <View>
            <ScrollView>
              {songs.map(e => (
                <TouchableOpacity
                  onPress={async () => {
                    const length = e.downloadUrl.length;
                    const song = e.downloadUrl[length - 1].link;
                    const name = e.name;
                    // console.log(song)
                    await AsyncStorage.setItem('song', name);
                    console.log('song stored');
                    navigation.navigate('MusicPlayer');
                  }}
                  key={e.id}>
                  <View style={styles.box}>
                    <Image
                      style={styles.songImage}
                      source={{uri: `${e.image[0].link}`}}
                    />
                    <Text style={styles.songName}>{e.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
});
export default Playlist;
