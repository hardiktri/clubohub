import React, { Component, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from './src/screen/splash/SplashScreen';
import AppNavigator from './src/components/AppNavigator';
import { localNotificationService } from './src/Firebase/LocalNotificationService';
import { fcmService } from './src/Firebase/FCMService';
import AsyncStorage from '@react-native-async-storage/async-storage';



// const Drawer = createDrawerNavigator();


const App = ({ navigation }) => {

  useEffect(() => {

    localNotificationService.configure(onOpenNotification)
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);

    return () => { }
  }, [])

  const onRegister = (token) => {
    console.log("fcm Token == ", token);
    AsyncStorage.setItem('FCMtoken', token);
    // alert(token);
  }

  const onNotification = (notify) => {
    console.log("onNotification == ", notify);

    const options = {
      soundName: 'default',
      playSound: true,
    }

    localNotificationService.showNotification(
      0,
      notify.title,
      notify.body,
      notify,
      options
    )

  }

  const onOpenNotification = (notify) => {
    console.log("onOpenNotification == ", notify);
  }

  return (
    <AppNavigator />
  )
}


export default App;