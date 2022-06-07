import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      <Text style={styles.heading}>Search</Text>
      <TextInput
        style={styles.input}
        placeholder="Search song here"
        onChangeText={e => {
          setText(e);
          songs(e);
        }}
      />
      {data ? (
        <View>
          {/* <ScrollView> */}
          {data.map(e => (
            <TouchableOpacity
              key={e.id}
              onPress={() => {
                store(e.album.id);
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  margin: 10,
                  borderWidth: 1,
                  padding: 10,
                }}>
                <Image
                  source={{uri: `${e.image[1].link}`}}
                  style={{width: 100, height: 100}}
                />
                <Text style={{fontSize: 20, color: 'black'}}>{e.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
          {/* </ScrollView> */}
        </View>
      ) : null}
    </View>
    // </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {width: '80%', marginHorizontal: '10%'},
  heading: {textAlign: 'center', fontSize: 20, color: 'black'},
  input: {
    borderBottomWidth: 1,
    fontSize: 20,
  },
});
export default Search;
