import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import Slider from '@react-native-community/slider';
import React, {useEffect, useState, useRef} from 'react';
import songs from '../data';
import Icon from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
    });
    await TrackPlayer.add(songs);
  } catch (error) {
    console.log(error);
  }
};
const togglePlayBack = async playBackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  console.log(currentTrack, playBackState, State.Playing);
  console.log(State.Paused);
  if (currentTrack != null) {
    if (playBackState % 2 == 1) {
      await TrackPlayer.play();
    } else if (playBackState % 2==0) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.pause();
    }
  }
};
const Home = () => {
  const playBackState = usePlaybackState();

  const [songIndex, setSongIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);
  useEffect(() => {
    setupPlayer();
    scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      setSongIndex(index);
    });
    return () => {
      scrollX.removeAllListeners();
      TrackPlayer.destroy();
    };
  }, []);
  const skipForward = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };
  const skipBackward = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };
  function renderSongs({index, item}) {
    return (
      <Animated.View style={styles.flatlist}>
        <View style={styles.img_box}>
          <Image source={{uri: item.image}} style={styles.song_image} />
        </View>
      </Animated.View>
    );
  }

  return (
    <SafeAreaView style={styles.main_container}>
      <View style={styles.container}>
        <Animated.FlatList
          ref={songSlider}
          data={songs}
          renderItem={renderSongs}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={15}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x: scrollX},
                },
              },
            ],
            {useNativeDriver: true},
          )}
        />
        <View>
          <Text style={styles.song_name}>{songs[songIndex].title}</Text>
        </View>
        <View>
          <Text style={styles.artist_name}>{songs[songIndex].artist}</Text>
        </View>
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
          <TouchableOpacity onPress={skipBackward}>
            <Icon
              name="play-skip-back-outline"
              size={50}
              color="red"
              style={{marginTop: 15}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              togglePlayBack(playBackState);
            }}>
            <Icon
              name={
                playBackState == State.Playing
                  ? 'pause-circle-outline'
                  : 'play-circle-outline'
              }
              size={80}
              color="red"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipForward}>
            <Icon
              name="play-skip-forward-outline"
              size={50}
              color="red"
              style={{marginTop: 15}}
            />
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
    width: '65%',
    margin: 20,
  },
  flatlist: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Home;
