// @ts-nocheck

import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
  StyleSheet,
} from 'react-native';
import Scale from '../globalServices/Scale';
import color from '../globalServices/color';
type AppProps = {
  title?: string;
  onBackPress?: any;
};

export const CustomHeader = ({title, onBackPress}: AppProps) => {
  return (
    <View style={styles.modalBackground}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={onBackPress} style={{flex: 0.5}}>
          <Image
            source={require('../images/back_arrow.png')}
            style={{
              width: Scale(30),
              height: Scale(30),
              marginStart: Scale(20),
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            letterSpacing: 1,
            fontSize: Scale(18),
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  modalBackground: {
    //  alignItems: 'center',
    height: Scale(50),
    // backgroundColor: '#2194FF',
    backgroundColor: color.bgcolor,
    justifyContent: 'center',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
