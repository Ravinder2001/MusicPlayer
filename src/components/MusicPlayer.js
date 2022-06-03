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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
        // Capability.Stop,
      ],
    });
    await TrackPlayer.add(songs);
  } catch (error) {
    console.log(error);
  }
};
var count = 0;
const togglePlayBack = async playBackState => {
  count++;
  const currentTrack = await TrackPlayer.getCurrentTrack();
  console.log('here');
  if (currentTrack != null) {
    if (playBackState % 2 == 1) {
      await TrackPlayer.play();
    } else if (playBackState % 2 == 0) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.pause();
    }
  }
};
const MusicPlayer = () => {
  const playBackState = usePlaybackState();
  const progress = useProgress();
  const [songIndex, setSongIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);
  const [trackImage, setTrackImage] = useState('');
  const [trackArtist, setTrackArtist] = useState('');
  const [tracktitle, setTrackTitle] = useState('');
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type == Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title, image, artist} = track;
      setTrackArtist(artist);
      setTrackImage(image);
      setTrackTitle(title);
    }
  });
  const skipto = async trackId => {
    await TrackPlayer.skip(trackId);
  };
  const [repeat, setRepeat] = useState('off');
  const repeatIcon = () => {
    if (repeat == 'off') {
      return 'repeat-off';
    }
    if (repeat == 'track') {
      return 'repeat-once';
    }
    if (repeat == 'repeat') {
      return 'repeat';
    }
  };
  const repeatMode = () => {
    if (repeat == 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeat('track');
    }
    if (repeat == 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeat('repeat');
    }
    if (repeat == 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeat('off');
    }
  };
  useEffect(() => {
    setupPlayer();
    scrollX.addListener(async ({value}) => {
      const index = Math.round(value / width);
      skipto(index);
      setSongIndex(index);
      setTimeout(async () => {
        if (count > 0) {
          await TrackPlayer.play();
        } else {
          await TrackPlayer.pause();
        }
      }, 400);
    });
    return () => {
      scrollX.removeAllListeners();
      // TrackPlayer.destroy();
    };
  }, []);
  const skipForward = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
    // setTimeout(async () => {
    //   await TrackPlayer.play();
    // }, 400);
  };
  const skipBackward = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
    // setTimeout(async () => {
    //   await TrackPlayer.play();
    // }, 400);
  };
  // console.log(progress.position)
  function renderSongs({index, item}) {
    return (
      <Animated.View style={styles.flatlist}>
        <View style={styles.img_box}>
          <Image
            source={trackImage ? {uri: trackImage} : null}
            style={styles.song_image}
          />
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
          <Text style={styles.song_name}>{tracktitle}</Text>
        </View>
        <View>
          <Text style={styles.artist_name}>{trackArtist}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            repeatMode();
          }}>
          <MaterialCommunityIcons
            name={`${repeatIcon()}`}
            size={30}
            color="red"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="heart-outline" size={30} color="red" />
        </TouchableOpacity>
        <View>
          <Slider
            style={styles.slider}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="red"
            minimumTrackTintColor="red"
            maximumTrackTintColor="gray"
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}
          />
        </View>
        <View style={styles.song_time}>
          <Text style={styles.time_text}>
            {new Date(progress.position * 1000).toISOString().substr(14, 5)}
          </Text>
          <Text style={styles.time_text}>
            {new Date((progress.duration - progress.position) * 1000)
              .toISOString()
              .substr(14, 5)}
          </Text>
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
export default MusicPlayer;
