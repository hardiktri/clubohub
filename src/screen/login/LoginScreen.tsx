import * as React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import GlobalStyle from '../../globalServices/globalStyle';
import LoginScreenController, {Props} from './LoginScreenController';
import Scale from '../../globalServices/Scale';
import LinearGradient from 'react-native-linear-gradient';
export default class LoginScreen extends LoginScreenController {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled">
          <ImageBackground
            style={styles.backgroundContainer}
            source={require('../../images/ic_background.png')}
            resizeMode={'stretch'}>
            <View style={{padding: Scale(16), marginTop: Scale(150)}}>
              <View style={styles.logoContainer}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../images/ic_logo.png')}
                />
              </View>
              <Text style={styles.welcomeText}>Hello, Welcome</Text>
              <Text style={styles.loginText}>Login with mobile number</Text>
              <View>
                <View style={styles.phoneNumberContainer}>
                  <View style={{flex: 0.5}}>
                    <LinearGradient
                      colors={['#B78428', '#252525']}
                      start={{x: 1, y: 0}}
                      end={{x: 0, y: 0}}
                      style={[GlobalStyle.grediant]}>
                      <View
                        style={[
                          GlobalStyle.bordercontainer,
                          {
                            flexDirection: 'row',
                            width: '97%',
                            alignItems: 'center',
                          },
                        ]}>
                        <Image
                          resizeMode={'contain'}
                          source={require('../../images/ic_india.png')}
                        />
                        <Text style={styles.flagText}>+91</Text>
                      </View>
                    </LinearGradient>
                  </View>
                  <View style={styles.inputContainer}>
                    <LinearGradient
                      colors={['#B78428', '#252525']}
                      start={{x: 1, y: 0}}
                      end={{x: 0, y: 0}}
                      style={GlobalStyle.grediant}>
                      <TextInput
                        style={[
                          GlobalStyle.bordercontainer,
                          {fontSize: Scale(16), width: '99%'},
                        ]}
                        placeholder="Phone Number"
                        autoCapitalize="none"
                        returnKeyType="next"
                        maxLength={10}
                        keyboardType="numeric"
                        placeholderTextColor="white"
                        value={this.state.phoneNumber}
                        onChangeText={text => {
                          this.setState({phoneNumber: text});
                        }}
                        underlineColorAndroid="#f000"
                      />
                    </LinearGradient>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => this.loginBtnClick()}
                  style={styles.loginButton}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  backgroundContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  logoContainer: {
    alignSelf: 'center',
    marginTop: Scale(30),
  },
  welcomeText: {
    color: 'white',
    textAlign: 'center',
    fontSize: Scale(16),
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    marginTop: Scale(30),
    fontWeight: 'bold',
    fontSize: Scale(22),
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    marginBottom: Scale(30),
    marginTop: Scale(15),
  },
  flagContainer: {
    ...GlobalStyle.txteditable,
    flex: 0.5,
  },
  flagText: {
    color: 'white',
    fontSize: Scale(16),
    paddingStart: Scale(10),
  },
  inputContainer: {
    // ...GlobalStyle.txteditable,
    flex: 1.5,
    marginStart: Scale(15),
  },
  inputStyle: {
    ...GlobalStyle.inputStyle,
  },
  loginButton: {
    ...GlobalStyle.buttonStyle,
  },
  buttonText: {
    ...GlobalStyle.btntext,
  },
});
