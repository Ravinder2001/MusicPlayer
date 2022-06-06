import { View, Text,StatusBar } from 'react-native'
import React from 'react'
import Navigations from './src/Components/Navigations'
const App = () => {
  return (
    <View style={{flex:1,backgroundColor:"040C6F"}}>
      <StatusBar backgroundColor="#040C6F" barStyle='light-content'/>
     <Navigations/>
    </View>
  )
}

export default App