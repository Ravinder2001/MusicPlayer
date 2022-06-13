import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');
const Search = ({navigation}) => {
  const [text, setText] = useState('');
  const [data, setData] = useState(null);
  async function songs(text) {
    console.log(text);
    if (text.length >= 2) {
      const res = await fetch(
        `https://saavn.me/search/songs?query=${text}&page=1&limit=2`,
      );
      const songArray = await res.json();
      console.log(songArray.results[0].album);
      setData(songArray.results);
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
  return (
    // <KeyboardAvoidingView>
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
            placeholder="Search"
            onChangeText={e => {
              setText(e);
              songs(e);
            }}
          />
        </View>
        {data ? (
          <View style={styles.list}>
            <ScrollView>
            {data.map(e => (
              <TouchableOpacity
                key={e.id}
                onPress={() => {
                  store(e.album.id);
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    // margin: 10,
                    // borderWidth: 1,
                    padding: 10,
                  }}>
                  <Image
                    source={{uri: `${e.image[1].link}`}}
                    style={styles.songImage}
                  />
                  <View style={{padding: 12}}>
                    <Text style={{fontSize: 18, color: 'black'}}>{e.name}</Text>
                    <Text style={{fontSize: 16, color: 'gray',width:200}}>
                      {e.artist}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            </ScrollView>
          </View>
        ) : null}
      </ImageBackground>
    </View>
    // </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {width: '100%', height: height, backgroundColor: '#E8E7E7'},
  backImage: {width: '100%', height: 200, position: 'relative'},
  heading: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Cochin',

    position: 'absolute', // child
    bottom: 0, // position where you want
    left: 30,
    top: 30,
  },
  searchBox: {
    width: '70%',
    height: 50,
    // borderWidth: 1,
    opacity: 0.8,
    position: 'absolute', // child
    bottom: 0, // position where you want
    left: 30,
    top: 110,
    borderRadius: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  input: {
    // borderWidth:1,
    width: '80%',
    height: 50,
    marginTop: 0,
    fontSize: 22,
    // position: 'absolute', // child
    // bottom: 0, // position where you want
    // left: 30,
    // top: 110,
  },
  list: {
    width: '90%',
    height: height - 270,
    position: 'absolute', // child
    bottom: 0, // position where you want
    left: 30,
    top: 170,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'scroll',
  },
  songImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});
export default Search;
