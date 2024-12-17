import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import color from '../../globalServices/color';
import GlobalStyle from '../../globalServices/globalStyle';
import VerifyOtpScreenController, {Props} from './VerifyOtpScreenController';
import Scale from '../../globalServices/Scale';
import {BackgroundImage} from '../../components/BackgroundImage';
import LinearGradient from 'react-native-linear-gradient';
export default class VerifyOtpScreen extends VerifyOtpScreenController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <BackgroundImage>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.title}>Verify your mobile number</Text>
            <View style={{flexDirection: 'row', marginTop: Scale(20)}}>
              <LinearGradient
                colors={['#B78428', '#252525']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={[GlobalStyle.grediant, {flex: 1.5}]}>
                <TextInput
                  style={[
                    GlobalStyle.bordercontainer,
                    {textAlign: 'center', width: '94.5%'},
                  ]}
                  autoCapitalize="none"
                  returnKeyType="next"
                  maxLength={1}
                  keyboardType="numeric"
                  placeholderTextColor="white"
                  value={this.state.otp1}
                  ref={this.input1Ref}
                  onChangeText={text => {
                    this.setState({otp1: text});
                    this.handleInputOneFocus(text);
                  }}
                  onKeyPress={e => {
                    this.removeInputFunction(e.nativeEvent.key, 1);
                  }}
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </LinearGradient>

              <LinearGradient
                colors={['#B78428', '#252525']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={[
                  GlobalStyle.grediant,
                  {flex: 1.5, marginStart: Scale(15)},
                ]}>
                <TextInput
                  style={[
                    GlobalStyle.bordercontainer,
                    {textAlign: 'center', width: '94.5%'},
                  ]}
                  autoCapitalize="none"
                  returnKeyType="next"
                  maxLength={1}
                  keyboardType="numeric"
                  placeholderTextColor="white"
                  value={this.state.otp2}
                  ref={this.input2Ref}
                  onChangeText={text => {
                    this.setState({otp2: text});
                    this.handleInputTwoFocus(text);
                  }}
                  onKeyPress={e => {
                    this.removeInputFunction(e.nativeEvent.key, 2);
                  }}
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </LinearGradient>

              <LinearGradient
                colors={['#B78428', '#252525']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={[
                  GlobalStyle.grediant,
                  {flex: 1.5, marginStart: Scale(15)},
                ]}>
                <TextInput
                  style={[
                    GlobalStyle.bordercontainer,
                    {textAlign: 'center', width: '94.5%'},
                  ]}
                  autoCapitalize="none"
                  returnKeyType="next"
                  maxLength={1}
                  keyboardType="numeric"
                  placeholderTextColor="white"
                  value={this.state.otp3}
                  ref={this.input3Ref}
                  onChangeText={text => {
                    this.setState({otp3: text});
                    this.handleInputThreeFocus(text);
                  }}
                  onKeyPress={e => {
                    this.removeInputFunction(e.nativeEvent.key, 3);
                  }}
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </LinearGradient>
              <LinearGradient
                colors={['#B78428', '#252525']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={[
                  GlobalStyle.grediant,
                  {flex: 1.5, marginStart: Scale(15)},
                ]}>
                <TextInput
                  style={[
                    GlobalStyle.bordercontainer,
                    {textAlign: 'center', width: '94.5%'},
                  ]}
                  autoCapitalize="none"
                  returnKeyType="next"
                  maxLength={1}
                  keyboardType="numeric"
                  placeholderTextColor="white"
                  value={this.state.otp4}
                  ref={this.input4Ref}
                  onChangeText={text => {
                    this.setState({otp4: text});
                    this.handleInputFourFocus(text);
                  }}
                  onKeyPress={e => {
                    this.removeInputFunction(e.nativeEvent.key, 4);
                  }}
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </LinearGradient>
              <LinearGradient
                colors={['#B78428', '#252525']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={[
                  GlobalStyle.grediant,
                  {flex: 1.5, marginStart: Scale(15)},
                ]}>
                <TextInput
                  style={[
                    GlobalStyle.bordercontainer,
                    {textAlign: 'center', width: '94.5%'},
                  ]}
                  autoCapitalize="none"
                  returnKeyType="next"
                  maxLength={1}
                  keyboardType="numeric"
                  placeholderTextColor="white"
                  value={this.state.otp5}
                  ref={this.input5Ref}
                  onChangeText={text => {
                    this.setState({otp5: text});
                    this.handleInputFiveFocus(text);
                  }}
                  onKeyPress={e => {
                    this.removeInputFunction(e.nativeEvent.key, 5);
                  }}
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </LinearGradient>
              <LinearGradient
                colors={['#B78428', '#252525']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={[
                  GlobalStyle.grediant,
                  {flex: 1.5, marginStart: Scale(15)},
                ]}>
                <TextInput
                  style={[
                    GlobalStyle.bordercontainer,
                    {textAlign: 'center', width: '94.5%'},
                  ]}
                  autoCapitalize="none"
                  returnKeyType="next"
                  maxLength={1}
                  keyboardType="numeric"
                  placeholderTextColor="white"
                  value={this.state.otp6}
                  ref={this.input6Ref}
                  onChangeText={text => {
                    this.setState({otp6: text});
                  }}
                  onKeyPress={e => {
                    this.removeInputFunction(e.nativeEvent.key, 6);
                  }}
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </LinearGradient>
            </View>
            <TouchableOpacity
              onPress={() => this.verifyBtnClick()}
              style={styles.buttonStyle}>
              <Text style={GlobalStyle.btntext}>Verify</Text>
            </TouchableOpacity>

            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>Not yet code?</Text>
              <TouchableOpacity onPress={() => this.resendOtpAPICall()}>
                <Text style={styles.resendLink}> RESEND NOW</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.otpInfoText}>
              OTP has been sent on Your Mobile Number.
            </Text>
            {/* <Text style={styles.otpInfoText}>
              OTP has been sent on Your Mobile Number. ({this.state.ShowOTP})
            </Text> */}
          </View>
        </TouchableWithoutFeedback>
      </BackgroundImage>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginTop: Scale(20),
    fontWeight: 'bold',
    fontSize: 22,
  },
  flatList: {
    height: '100%',
  },
  listHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstPlaceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    width: '100%',
    maxWidth: 280,
  },
  listPlaceContainer: {},
  firstPlaceProfile: {
    width: 80,
    height: 80,
    borderRadius: 80,
    borderWidth: 1,
  },
  firstPlacePosition: {
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: 50,
    width: 20,
    height: 20,
    bottom: -8,
    left: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstPlaceProfileContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  firstPlaceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 230,
    width: '100%',
  },
  otherPlaceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
  },
  otherPlaceProfile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
  },
  otherPlacePosition: {
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: 50,
    width: 20,
    height: 20,
    bottom: -8,
    left: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainerStyle: {
    paddingBottom: '20%',
  },
  textBold: {
    fontWeight: '700',
  },
  textWhite: {
    color: 'white',
  },
  emptyUserContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
  },
  emptyUserLabel: {
    fontSize: 18,
  },
  buttonLoadMore: {
    height: 100,
    marginTop: 16,
  },
  paginationStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  buttonStyle: {
    height: 40,
    backgroundColor: color.active_tab, // Example color, replace with your color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Scale(10),
  },
  resendText: {
    textAlign: 'center',
    color: color.white,
    padding: Scale(8),
  },
  resendLink: {
    color: color.active_tab,
    fontWeight: '500',
  },
  otpInfoText: {
    textAlign: 'center',
    color: color.white,
    padding: 10,
  },
});
