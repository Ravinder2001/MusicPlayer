import {View, Text, Button,StyleSheet} from 'react-native';
import React, {useState} from 'react';
import MusicPlayer from '../components/MusicPlayer';
import BottomSheet from '../components/BottomSheet';
import {Provider} from 'react-native-paper';
const Home = () => {
  const [show, setShow] = useState(true);
  return (
    <Provider>
      <View style={styles.container}>
        {/* <MusicPlayer /> */}
        <Button title="show sheet" onPress={() => setShow(true)} />
        < 
          show={show}
          onDismiss={() => {
            setShow(false);
          }}
          enableBackdropDismiss
          MusicPlayer={MusicPlayer}
        />
      </View>
    </Provider>
  );
};
const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#ccc" 
  }
})
export default Home;
