import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Slider from '@react-native-community/slider';
import React from 'react';
import songs from '../data';
import Icon from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');
const Home = () => {
  function renderSongs({index, item}) {
    return (
      <View style={styles.flatlist}>
        <View style={styles.img_box}>
          <Image source={{uri: item.image}} style={styles.song_image} />
        </View>
        <View>
          <Text style={styles.song_name}>{item.title}</Text>
        </View>
        <View>
          <Text style={styles.artist_name}>{item.artist}</Text>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.main_container}>
      <View style={styles.container}>
        <FlatList
          data={songs}
          renderItem={renderSongs}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={15}
        />
        <View>
          <Slider
            style={styles.slider}
            value={10}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor="red"
            minimumTrackTintColor="red"
            maximumTrackTintColor="gray"
            onSlidingComplete={() => {}}
          />
        </View>
        <View style={styles.song_time}>
          <Text style={styles.time_text}>0:00</Text>
          <Text style={styles.time_text}>3:55</Text>
        </View>
        <View style={styles.music_control}>
          <TouchableOpacity>
            <Icon name="play-skip-back-outline" size={60} color="red" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="ios-pause-circle-outline" size={60} color="red" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="play-skip-forward-outline" size={60} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottom_icon}>
          <TouchableOpacity onPress={() => {}}>
            <Icon name="heart-outline" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Icon name="repeat" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Icon name="share-outline" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Icon name="reorder-three" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    // backgroundColor: 'red',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    // borderTopWidth: 1,
    alignItems: 'center',
    paddingVertical: 15,
    width: width,
    backgroundColor: 'red',
  },
  bottom_icon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  song_image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  img_box: {
    elevation: 5,
  },
  song_name: {
    fontSize: 30,
    margin: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  artist_name: {
    fontSize: 18,
  },
  slider: {
    width: 350,
    height: 40,
    marginTop: 10,
    // flexDirection: 'row',
  },
  song_time: {
    width: 320,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time_text: {
    fontSize: 15,
    color: 'black',
    margin: 0,
  },
  music_control: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    margin: 20,
  },
  flatlist: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Home;
