import { View, Text,StatusBar } from 'react-native'
import React from 'react'
import Navigations from './src/Components/Navigations'
const App = () => {
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
      <StatusBar backgroundColor="white" barStyle='dark-content'/>
     <Navigations/>
    </View>
  )
}

export default App