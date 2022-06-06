import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';

const Search = () => {
  const [text, setText] = useState('');
  const [data, setData] = useState(null);
  async function songs(text) {
    console.log(text);
    if (text.length >= 2) {
      const res = await fetch(
        `https://saavn.me/search/songs?query=${text}&page=1&limit=2`,
      );
      const songArray = await res.json();
      console.log(songArray.results[0].image[1].link);
      setData(songArray.results);
    }
  }
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
          <ScrollView>
            {data.map(e => (
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  margin: 10,
                  borderWidth: 1,
                  padding: 10,
                }}
                key={e.id}>
                <Image
                  source={{uri: `${e.image[1].link}`}}
                  style={{width: 100, height: 100}}
                />
                <Text style={{fontSize: 20, color: 'black'}}>{e.name}</Text>
              </View>
            ))}
          </ScrollView>
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
