import { Component } from 'react';
import { TextInput } from 'react-native';
import makeApiCall from '../../globalServices/api';
import {
  apiFunctions,
  storeData,
  getdata,
  showtoasterror,
  showtoastsucces,
} from '../../globalServices/utils';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Props {
  navigation?: any;
  id?: string;
  route?: any;
}

interface S {
  needRetakeToken: boolean;
  token: string;
  totalCount: number;
  totalPage: number;
  pageIndex: number;
  moreLoading: boolean;
  otp1: any;
  otp2: any;
  otp3: any;
  otp4: any;
  otp5: any;
  otp6: any;
  ShowOTP: any;
}

interface SS {
  id: any;
}

export default class VerifyOtpScreenController extends Component<Props, S, SS> {
  input1Ref: React.RefObject<TextInput>;
  input2Ref: React.RefObject<TextInput>;
  input3Ref: React.RefObject<TextInput>;
  input4Ref: React.RefObject<TextInput>;
  input5Ref: React.RefObject<TextInput>;
  input6Ref: React.RefObject<TextInput>;

  constructor(props: Props) {
    super(props);

    this.state = {
      needRetakeToken: true,
      token: '',
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      otp6: '',
      ShowOTP: props.route.params.otp,
      pageIndex: 1,
      totalCount: 1,
      totalPage: 1,
      moreLoading: false,
    };

    this.input1Ref = React.createRef<TextInput>();
    this.input2Ref = React.createRef<TextInput>();
    this.input3Ref = React.createRef<TextInput>();
    this.input4Ref = React.createRef<TextInput>();
    this.input5Ref = React.createRef<TextInput>();
    this.input6Ref = React.createRef<TextInput>();
  }

  async componentDidMount() {
    console.log('dsadsadsa', this.props.route.params.mobilenumber);
  }
  verifyBtnClick = async () => {
    if (
      !this.state.otp1 &&
      !this.state.otp2 &&
      !this.state.otp3 &&
      !this.state.otp4 &&
      !this.state.otp5 &&
      !this.state.otp6
    ) {
      return showtoasterror('Please enter otp.');
    }
    let otp =
      this.state.otp1 +
      this.state.otp2 +
      this.state.otp3 +
      this.state.otp4 +
      this.state.otp5 +
      this.state.otp6;

    let data = new FormData();
    data.append('mobile_no', this.props.route.params.mobilenumber);
    data.append('otp', otp);

    let device_token = await AsyncStorage.getItem('FCMtoken');

    data.append('device_token', device_token);

    console.log('device_token => ', device_token);

    const responseData = await makeApiCall(
      apiFunctions.verifyotp,
      'POST',
      data,
    );
    console.log('responseData:::--->', responseData);
    if (responseData.status == 'success') {
      showtoastsucces('You are login successfully!');
      let res = responseData.data;
      storeData('id', res.user.id);
      storeData('role', res.user.role);

      storeData('userdetails', res.user);
      storeData('token', res.token);
      let userdetails = await getdata('userdetails');
      let id = await getdata('token');
      console.log('id:::--->', id);
      console.log('userdetails:::--->', userdetails);
      if (res.user.role == '4') {
        this.props.navigation.replace('DrawerNavigatorAdmin');
      } else {
        // this.props.navigation.replace('DrawerNavigatorAdmin');
        this.props.navigation.replace('DrawerNavigator');
      }
    } else {
      showtoasterror('Please enter correct OTP.');
    }
  };
  async resendOtpAPICall() {
    let data = new FormData();
    data.append('mobile_no', this.props.route.params.mobilenumber);
    const responseData = await makeApiCall(apiFunctions.login, 'POST', data);
    console.log('responseData:::--->', responseData);
    if (responseData.status == 'success') {
      this.setState({
        ShowOTP: responseData.otp,
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: '',
        otp5: '',
        otp6: '',
      });
      this.input1Ref.current?.focus();
      showtoastsucces('OTP resend is successfully!');
    } else {
    }
  }

  handleInputOneFocus = (text: string) => {
    text && this.input2Ref?.current?.focus();
  };
  handleInputTwoFocus = (text: string) => {
    text && this.input3Ref.current && this.input3Ref.current.focus();
  };
  handleInputThreeFocus = (text: string) => {
    text && this.input4Ref.current && this.input4Ref.current.focus();
  };
  handleInputFourFocus = (text: string) => {
    text && this.input5Ref.current && this.input5Ref.current.focus();
  };
  handleInputFiveFocus = (text: string) => {
    text && this.input6Ref.current && this.input6Ref.current.focus();
  };

  removeInputFunction = (text: string, from: number) => {
    if (text === 'Backspace') {
      switch (from) {
        case 1:
          this.removeInputOne('');
          break;
        case 2:
          this.removeInputTwo(this.state.otp2);
          break;
        case 3:
          this.removeInputThree(this.state.otp3);
          break;
        case 4:
          this.removeInputFour(this.state.otp4);
          break;
        case 5:
          this.removeInputFive(this.state.otp5);
          break;
        case 6:
          this.removeInputSix(this.state.otp6);
          break;
      }
    }
  };

  removeInputOne = (text: string) => {
    this.setState({ otp1: text });
  };
  removeInputTwo = (text: string) => {
    if (text.length === 0) {
      this.setState({ otp1: text });
      this.input1Ref.current?.focus();
    } else {
      this.setState({ otp2: text });
      this.input2Ref.current?.focus();
    }
  };
  removeInputThree = (text: string) => {
    if (text.length === 0) {
      this.setState({ otp2: text });
      this.input2Ref.current && this.input2Ref.current.focus();
    } else {
      this.setState({ otp3: text });
      this.input3Ref.current && this.input3Ref.current.focus();
    }
  };
  removeInputFour = (text: string) => {
    if (text.length === 0) {
      this.setState({ otp3: text });
      this.input3Ref.current && this.input3Ref.current.focus();
    } else {
      this.setState({ otp4: text });
      this.input4Ref.current && this.input4Ref.current.focus();
    }
  };
  removeInputFive = (text: string) => {
    if (text.length === 0) {
      this.setState({ otp4: text });
      this.input4Ref.current && this.input4Ref.current.focus();
    } else {
      this.setState({ otp5: text });
      this.input5Ref.current && this.input5Ref.current.focus();
    }
  };
  removeInputSix = (text: string) => {
    if (text.length === 0) {
      this.setState({ otp5: text });
      this.input5Ref.current && this.input5Ref.current.focus();
    } else {
      this.setState({ otp6: text });
      this.input6Ref.current && this.input6Ref.current.focus();
    }
  };
}
