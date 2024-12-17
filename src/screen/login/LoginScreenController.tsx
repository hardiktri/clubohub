import { Component } from 'react';
import makeApiCall from '../../globalServices/api';
import { apiFunctions, showtoasterror } from '../../globalServices/utils';
import { Keyboard } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export interface Props {
  navigation?: any;
  id?: string;
}

interface S {
  phoneNumber: any;
}

interface SS {
  id: any;
}

export default class LoginScreenController extends Component<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    this.state = {
      phoneNumber: '',
    };
  }

  async componentDidMount() {
    // this.getFcmToken()
  }

  async loginBtnClick() {
    Keyboard.dismiss();
    if (!this.state.phoneNumber || this.state.phoneNumber.length != 10) {
      return showtoasterror('Please enter valid phone number.');
    }
    let data = new FormData();
    data.append('mobile_no', this.state.phoneNumber);
    const responseData = await makeApiCall(apiFunctions.login, 'POST', data);
    console.log('responseData:::--->', responseData);
    if (responseData?.status == 'success') {
      this.props.navigation.replace('VerifyOtpScreen', {
        mobilenumber: this.state.phoneNumber,
        otp: responseData.otp,
      });
    } else {
      showtoasterror(responseData?.message);
    }
  }

  getFcmToken = async () => {

    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('fcm', fcmToken);
    }
  }
}
