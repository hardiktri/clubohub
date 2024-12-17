import React, { ReactNode } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import color from '../globalServices/color';

type BackgroundImageProps = {
  children?: ReactNode;
};

export const BackgroundImage: React.FC<BackgroundImageProps> = ({ children }) => {
  return (
    <SafeAreaView style={styles.modalBackground}>
    <View >
      <ImageBackground
        style={{ width: '100%', height: '100%' }}
        source={require('../images/bg_img.png')}
        resizeMode={'stretch'}
      >
        {children}
      </ImageBackground>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    // flex: 1,
    backgroundColor: color.bgcolor,
  },
});