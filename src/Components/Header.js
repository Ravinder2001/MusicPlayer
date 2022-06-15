import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Trending from './Trending';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');
const Header = ({navigation}) => {
  const [text, setText] = useState('');
  const [data, setData] = useState(null);
  const [trending, setTrending] = useState(null);
  const [album, setAlbum] = useState(null);
  const [playlist, setPLaylist] = useState(null);
  const [radio, setRadio] = useState(null);
  const [discover, setDiscover] = useState(null);
  const [city, setCity] = useState(null);
  async function songs(text) {
    console.log(text);
    if (text != '') {
      const res = await fetch(`https://saavn.me/search/songs?query=${text}`);
      const songArray = await res.json();
      // console.log(songArray.results[0].album);
      setData(songArray.results);
    } else {
      setData(null);
    }
  }
  const store = async e => {
    try {
      await AsyncStorage.setItem('AlbumId', e);
      console.log('album Stored');
      navigation.navigate('Playlist');
    } catch (err) {
      console.log(err);
    }
  };

  const getTrending = async () => {
    const res = await fetch('https://saavn.me/home');
    const data = await res.json();
    setTrending(data.results.new_trending);
    setAlbum(data.results.new_albums);
    setPLaylist(data.results.top_playlists);
    setRadio(data.results.radio);
    setDiscover(data.results.browse_discover);
    setCity(data.results.city_mod);
  };

  useEffect(() => {
    navigation.addListener('focus', async () => {
      getTrending();
      setData(null);
      setText('');
    });
  }, [text, data]);
  return (
    <View>
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: 'https://img.freepik.com/free-photo/portrait-carefree-beautiful-stylish-girl-with-curly-hair-dancing-with-closed-eyes-broad-smile-while-holding-smartphone-listening-music-earphones_176420-24651.jpg?t=st=1655114139~exp=1655114739~hmac=f53f9319c1ab718f517de9c253e8ee469a0b185addfce8821e81b9dea97ee5a3&w=900',
          }}
          style={styles.backImage}>
          <Text style={styles.heading}>Search</Text>
          <View style={styles.searchBox}>
            <Icon
              name="search"
              size={25}
              style={{marginTop: 12, marginLeft: 20}}
            />
            <TextInput
              style={styles.input}
              value={text}
              placeholder="Songs"
              onChangeText={e => {
                setText(e);
                songs(e);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setData(null);
                setText('');
              }}>
              <Icon name="md-remove-circle" size={25} style={{marginTop: 12}} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      {data ? (
        <View style={styles.list}>
          <FlatList
            style={{flex: 1}}
            data={data}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    store(item.album.id);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 5,
                      width: '95%',
                      borderRadius: 10,
                      backgroundColor: 'white',
                    }}>
                    <Image
                      source={{uri: `${item.image[1].link}`}}
                      style={styles.songImage}
                    />
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 18, color: 'black'}}>
                        {item.name}
                      </Text>
                      <Text style={{fontSize: 16, color: 'gray', width: 200}}>
                        {item.artist}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.id}
            // contentContainerStyle={{
            //   flexGrow: 1,
            // }}
          />
        </View>
      ) : (
        <View>
          <ScrollView>
            <Trending
              album={trending}
              title={'Trending'}
              skip={'playlist'}
              navigation={navigation}
            />
            <Trending
              album={album}
              title={'Top Albums'}
              skip={'playlist'}
              navigation={navigation}
            />
            <Trending
              album={playlist}
              title={'Top Playlist'}
              skip={''}
              navigation={navigation}
            />
            <Trending
              album={discover}
              title={'Broswer Discover'}
              skip={''}
              navigation={navigation}
            />
            <Trending
              album={radio}
              title={'Radio'}
              skip={''}
              navigation={navigation}
            />
            <Trending
              album={city}
              title={'City Mood'}
              skip={''}
              navigation={navigation}
            />
            <View style={{height: 335, width: 100}}></View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 170,
    backgroundColor: '#E8E7E7',
    position: 'relative',
  },
  backImage: {
    width: '100%',
    height: 170,
  },
  heading: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Cochin',

    position: 'absolute', // child
    bottom: 0, // position where you want
    left: 30,
    top: 20,
  },
  searchBox: {
    width: '70%',
    height: 50,
    // borderWidth: 1,
    opacity: 0.8,
    position: 'absolute', // child
    bottom: 0, // position where you want
    left: 30,
    top: 100,
    borderRadius: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  input: {
    width: '72%',
    height: 50,
    marginTop: 0,
    fontSize: 22,
  },
  list: {
    width: '100%',
    height: height,
    backgroundColor: 'white',
    padding: 5,
  },
  songImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});
export default Header;
