import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { View, ToastAndroid, Platform, AlertIOS } from 'react-native';
import Snackbar from 'react-native-snackbar';
import * as ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import Scale from './Scale';

export const apiFunctions = {
  // url: 'https://developmentdemo.co.in/api/', //staging server
  url: 'https://clubohub.com/app/api/', //prod server
  login: 'otp/login',
  verifyotp: 'otp/verifyOtp',
  getprofile: 'user/profile',
  getfamily: 'user/family',
  getnotification: 'notification',
  notification_read: 'notification_read',
  policylist: 'policylist',
  getclubs: 'clubs',
  announcement: 'announcement',
  faqcontactus: 'faqcontactus',
  subscribedplans: 'subscribedplans',
  getmemberlistbyclub: 'getmemberlistbyclub',
  helpfeedback: 'helpfeedback',
  adminsubscribedplans: 'adminsubscribedplans',
  adminbookinglist: 'adminbookinglist',
  // getclubs: 'clubs',
  getslots: 'slots',
  bookinglist: 'bookinglist',
  addsubscribedplans: 'addsubscribedplans',
  cancelbooking: 'cancelbooking',
  getpaymentdetails: 'booking',
  makeBooking: 'makebooking',
  sendrequest: 'sendrequest',
  getrequest: 'getrequest',
  requestAction: "request-action",
  chathistory: 'chathistory',
  chatlisting: 'chatlisting',
  chatsave: 'chatsave',
  clearcount: 'chatread'
};
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};
export const clearData = async () => {
  try {
    AsyncStorage.removeItem('club_id');
    AsyncStorage.removeItem("userdetails");
    AsyncStorage.removeItem('id');
    AsyncStorage.removeItem('role');
    AsyncStorage.removeItem('token');
  } catch (e) {
    // saving error
  }
};
export const getdata = async key => {
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);
    // console.log(item);
    return item;
  } catch (error) {
    console.log(error);
  }
  return;
};
export function showtoasterror(msg) {
  Snackbar.show({
    text: msg,
    position: 'top',
    duration: 4000,
    backgroundColor: '#C1464C',
    // marginBottom:50
  });
}
export function showtoastsucces(msg) {
  Snackbar.show({
    text: msg,
    position: 'top',
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: '#5AB126',
  });
}
export function launchCamera(callback) {
  let options = {
    includeBase64: true,

    storageOptions: {
      includeBase64: true,

      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.launchCamera(options, response => {
    // console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      const source = { uri: response.uri };
      // console.log('response', JSON.stringify(response));
      // console.log('path', response.assets[0].base64);
      callback(JSON.stringify(response));
    }
  });
}
export function launchGallary(callback) {
  const options = {
    quality: 0.75,
    maxWidth: 300,
    maxHeight: 300,
    includeBase64: true,
    storageOptions: {
      skipBackup: true,
    },
  };
  ImagePicker.launchImageLibrary(options, response => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled photo picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      callback(JSON.stringify(response));
    }
  });
}
export function getTimeIn24Hrs(d) {
  var time = moment(d, 'YYYY-MM-DD HH:mm:ss').format('HH:mm');
  // console.log('getDateYYYYMMDD date', currentDate);
  return time;
}
export function getDDMMMYYYY(d) {
  var time = moment(d, 'YYYY-MM-DD HH:mm:ss').format('DD MMM YYYY');
  // console.log('getDateYYYYMMDD date', currentDate);
  return time;
}
export function getdate(date) {
  const parsedDate = moment(date);
  const formattedDate = parsedDate.format('DD MMM YYYY');
  return formattedDate;
}
export function getTime(date) {
  const parsedTime = moment(date);
  const formattedTime = parsedTime.format('HH:mm A');
  return formattedTime;
}
export function getTimeHrs(date) {
  const formattedTime = moment(date, 'HH:mm:ss').format('HH:mm A');
  return formattedTime;
}
