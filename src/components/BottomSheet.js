import {
  View,
  Text,
  Dimensions,
  Animated,
  StyleSheet,
  Button,
  Pressable,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {Portal} from 'react-native-paper';
import {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
const BottomSheet = ({show, onDismiss, enableBackdropDismiss, MusicPlayer}) => {
  const bottomSheetHeight = Dimensions.get('window').height - 100;
  const deviceWidth = Dimensions.get('window').width;
  const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;
  console.log(bottom);
  const [open, setOpen] = useState(show);
  const onGesture = event => {
    if (event.nativeEvent.translationY > 0) {
      bottom.setValue(-event.nativeEvent.translationY);
    }
  };
  const onGestureEnd = event => {
    if (event.nativeEvent.translationY > bottomSheetHeight / 2) {
      onDismiss();
    } else {
      bottom.setValue(0);
    }
  };
  useEffect(() => {
    if (show) {
      setOpen(show);
      Animated.timing(bottom, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(bottom, {
        toValue: -bottomSheetHeight,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        setOpen(false);
      });
    }
  }, [show]);
  if (!open) {
    return null;
  }
  return (
    <Portal>
      <GestureHandlerRootView style={{flex: 1}}>
        <Pressable
          onPress={enableBackdropDismiss ? onDismiss : undefined}
          style={styles.backdrop}
        />

        <Animated.View
          style={[
            styles.root,
            {
              height: bottomSheetHeight,
              bottom: bottom,
              shadowOffset: {
                height: -3,
              },
            },
            styles.commom,
          ]}>
          <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>
            <View style={{flex: 1}}>
              <MusicPlayer onDismiss={onDismiss} />
            </View>
          </PanGestureHandler>
        </Animated.View>
      </GestureHandlerRootView>
    </Portal>
  );
};
const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // overflow: 'hidden',
  },
  header: {
    height: 33,
    backgroundColor: '#fff',
  },
  commom: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
    },
    shadowOpacity: 0.23,
    shadowRadius: 4,
    elevation: 3,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 80,
    backgroundColor: 'rgba(0,0,0, 0.012)',
  },
});
export default BottomSheet;
