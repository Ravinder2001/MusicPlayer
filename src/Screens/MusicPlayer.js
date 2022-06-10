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
// import songs from '../data';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const setupPlayer = async e => {
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
    await TrackPlayer.add(e);
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
const MusicPlayer = ({navigation}) => {
  const playBackState = usePlaybackState();
  const progress = useProgress();
  const [songIndex, setSongIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);
  const [trackImage, setTrackImage] = useState('');
  const [trackArtist, setTrackArtist] = useState('');
  const [tracktitle, setTrackTitle] = useState('');
  const [url, setUrl] = useState(null);
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
  const songs = [
    {
      id: 1,
      image:
        'https://a10.gaanacdn.com/gn_img/song/P7m3GNKqxo/m3GgG19N3q/size_l_1530226074.webp',
      title: 'raatien',
      artist: 'Diljit Dosanjh',
      url: 'https://aac.saavncdn.com/238/ba005edfedac86b02e41f4a9fa9d215d_320.mp4',
    },
  ];
  async function fetchSong() {
    try {
      console.log('going');

      // const [sonsDetail, setSongDetail] = useState(null);
      const urls = await AsyncStorage.getItem('song');
      console.log("urls",urls)
      
      const songs = [
        {
          id: 1,
          image:
            'https://a10.gaanacdn.com/gn_img/song/P7m3GNKqxo/m3GgG19N3q/size_l_1530226074.webp',
          title: 'raatien',
          artist: 'Diljit Dosanjh',
          url: urls,
        },
      ];
      setupPlayer(songs);

      await TrackPlayer.add(songs);
      // TrackPlayer.destroy();
      
      setTimeout(async () => {
        await TrackPlayer.play();
      }, 500);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    navigation.addListener('focus', async () => {
      await TrackPlayer.setupPlayer({});
      setupPlayer(songs);
      // setUrl(urls);
      await TrackPlayer.reset();
      console.log('focused');
      fetchSong();
    });

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
  }, [navigation]);
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
          // data={songs}
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '80%',
          }}>
          <View>
            <TouchableOpacity
              onPress={() => {
                repeatMode();
              }}>
              <MaterialCommunityIcons
                name={`${repeatIcon()}`}
                size={35}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => {}}>
              <Icon name="heart-outline" size={35} color="white" />
            </TouchableOpacity>
          </View>
        </View>
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
              color="white"
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
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipForward}>
            <Icon
              name="play-skip-forward-outline"
              size={50}
              color="white"
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
    backgroundColor: '#040C6F',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  song_image: {
    width: 300,
    height: 280,
    borderRadius: 10,
    marginTop: 20,
  },
  img_box: {
    elevation: 5,
  },
  song_name: {
    fontSize: 30,
    margin: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  artist_name: {
    color: 'white',
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
    color: 'white',
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
