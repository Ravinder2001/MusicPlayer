import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const {width, height} = Dimensions.get('window');
const Playlist = ({navigation}) => {
  const [albums, setAlbums] = useState(null);
  const [songs, setSongs] = useState(null);
  const getAlbum = async () => {
    try {
      const id = await AsyncStorage.getItem('AlbumId');
      console.log(id);
      const res = await fetch(`https://saavn.me/albums?id=${id}`);
      const albumData = await res.json();
      // console.log(albumData.results);
      setAlbums(albumData.results);
      const temp = [];
      for (var i = 0; i < albumData.results.songs.length; i++) {
        const length = albumData.results.songs[i].downloadUrl.length;
        temp.push({
          id: albumData.results.songs[i].id,
          name: albumData.results.songs[i].name,
          artist: albumData.results.songs[i].primaryArtists,
          url: albumData.results.songs[i].downloadUrl[length - 1].link,
          image: albumData.results.songs[i].image[2].link,
          artist: albumData.results.songs[i].primaryArtists,
        });
      }
      console.log(temp[1]);
      setSongs(temp);
    } catch (err) {
      console.log('err', err);
    }
  };
  useEffect(() => {
    navigation.addListener('focus', () => {
      getAlbum();
    });
  }, [navigation]);
  // if (songs) {
  //   console.log('album', songs[0]);
  // }

  return (
    <View style={styles.container}>
      {albums ? (
        <View>
          <View style={styles.header}>
            <Image
              style={styles.image}
              source={{uri: `${albums.image[2].link}`}}
            />
            <View>
              <Text style={styles.heading}>{albums.name}</Text>
              <Text style={styles.sub_heading}>{albums.primaryArtist}</Text>
              <Text style={styles.year}>{albums.year}</Text>
              <Text style={styles.sub_heading}>Songs: {albums.songCount}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={styles.play}>Play</Text>
            </TouchableOpacity>
          </View>
          <View>
            {albums ? (
              <View style={styles.list}>
                <FlatList
                  style={{flex: 1}}
                  data={albums.songs}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        onPress={async () => {
                          // console.log('item', item.downloadUrl);
                          if (item.downloadUrl == false) {
                            alert('Sorry!! No Data Found.');
                          }

                          // console.log('song stored',index);
                          navigation.navigate('MusicPlayer', {
                            currentIndex: index,
                            music: songs,
                          });
                        }}
                        key={item.id}>
                        <View style={styles.box}>
                          <Image
                            style={styles.songImage}
                            source={{uri: `${item.image[0].link}`}}
                          />
                          <Text style={styles.songName}>{item.name}</Text>
                          <MaterialCommunityIcons
                            style={styles.icon}
                            name="plus"
                            size={50}
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={item => item.id}
                />
              </View>
            ) : (
              <ActivityIndicator />
            )}
          </View>
        </View>
      ) : (
        <ActivityIndicator style={styles.loading} size={'large'} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    width: width,
    height: height,
  },
  header: {
    width: '100%',
    marginTop: 20,
    marginHorizontal: 10,
    // justifyContent:"center",
    flexDirection: 'row',
  },
  image: {
    width: '40%',
    height: 150,
    borderRadius: 10,
  },
  heading: {
    width: '55%',
    marginLeft: 20,

    fontSize: 20,
    color: 'black',
  },
  sub_heading: {
    width: '50%',
    marginLeft: 20,
    fontSize: 15,
    color: 'black',
  },
  year: {
    backgroundColor: 'red',
    padding: 5,
    width: 50,
    borderRadius: 20,
    textAlign: 'center',
    color: 'white',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  play: {
    padding: 5,
    backgroundColor: '#030A5C',
    width: '50%',
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    borderRadius: 20,
    marginHorizontal: '25%',
    marginTop: 20,
  },
  list: {
    width: '100%',
    height: 380,
    padding: 5,
    marginTop: 20,
    // borderWidth:1
  },
  box: {
    flexDirection: 'row',
    width: '90%',
    borderBottomWidth: 1,
    padding: 10,
    margin: 10,
  },
  songImage: {
    width: 55,
    height: 55,
    borderRadius: 10,
  },
  songName: {
    marginTop: 10,
    fontSize: 18,
    marginLeft: 10,
    color: 'black',
    // borderWidth:1,
    width: '65%',
  },
  icon: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 50,
    height: 50,
    textAlign: 'center',
    color: 'red',
    marginLeft: 10,
    // borderColor: '#030A5C',
    // borderWidth: 1,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
export default Playlist;
