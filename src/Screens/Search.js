import {View, Text, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../Components/Header';

const Search = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} />
    </View>
  );
};

export default Search;
