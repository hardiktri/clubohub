import * as React from 'react';

// Customizable Area Start
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform,
  Modal,
} from 'react-native';
import color from '../../../globalServices/color';
import GlobalStyle from '../../../globalServices/globalStyle';

// Merge Engine - import assets - Start
// Merge Engine - import assets - End
// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// import dayjs from "dayjs";
// import ImageComponent from "./components/ImageComponent/ImageComponent";
import MemberlistScreenController, {Props} from './MemberlistScreenController';
import Scale from '../../../globalServices/Scale';
import {SafeAreaFrameContext} from 'react-native-safe-area-context';
import {BackgroundImage} from '../../../components/BackgroundImage';
import LinearGradient from 'react-native-linear-gradient';
// import { Button } from "react-native-elements";
// Customizable Area End
const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const arr1 = [0, 1];

export default class MemberlistScreen extends MemberlistScreenController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
  PopupModal = () => {
    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={this.state.cancelbookingmodel}
        onRequestClose={() => {}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: color.bgcolor,
              height: '25%',
              width: '92%',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: color.yellow,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../../images/ic_cancel.png')}
                style={{height: Scale(50), width: Scale(50)}}
              />
            </View>
            <Text
              style={[
                styles.text_color,
                {fontSize: Scale(18), fontWeight: '700', textAlign: 'center'},
              ]}>
              Cancel Booking
            </Text>
            <Text
              style={[
                styles.text_color,
                {fontSize: Scale(12), fontWeight: '300', textAlign: 'center'},
              ]}>
              Are you sure that you want to cancel you booking?
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: Scale(10),
                padding: Scale(15),
              }}>
              <TouchableOpacity
                onPress={() => this.setState({cancelbookingmodel: false})}
                style={[
                  GlobalStyle.buttonStyle,
                  {
                    flex: 1,
                    marginRight: 10,
                    backgroundColor: color.bgcolor,
                    borderWidth: 1,
                    borderColor: color.yellow,
                  },
                ]}>
                <Text style={{color: 'white'}}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({cancelbookingmodel: false})}
                style={[GlobalStyle.buttonStyle, {flex: 1, marginLeft: 10}]}>
                <Text style={{color: 'white'}}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  render() {
    // Customizable Area Start
    const renderSeparator = () => {
      return (
        <View style={{height: 0.5, backgroundColor: color.dividercolor}} />
      );
    };
    // Merge Engine - render - Start
    return (
      <BackgroundImage>
        <KeyboardAvoidingView
          style={{flex: 1}}
          // keyboardVerticalOffset={25}
          behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
          <View
            style={[
              styles.container,
              {opacity: this.state.cancelbookingmodel ? 0.1 : 1},
            ]}>
            <Text style={styles.headertxt}>Member List</Text>

            <View style={{flexDirection: 'row'}}>
              <LinearGradient
                colors={['#B78428', '#252525']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={GlobalStyle.grediant}>
                <View
                  style={[
                    GlobalStyle.bordercontainer,
                    {
                      flexDirection: 'row',
                      padding: 0,
                      alignItems: 'center',
                    },
                  ]}>
                  <TextInput
                    style={{flex: 1, color: color.searchtxt, marginLeft: 10}} // Add any additional styles
                    placeholder="Search here...."
                    autoCapitalize="none"
                    returnKeyType="next"
                    placeholderTextColor={color.searchtxt}
                    onChangeText={text => {
                      this.filtermeber(text);
                    }}
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                  />
                  <Image
                    style={{marginRight: 10}} // Adjust margin as needed
                    resizeMode={'contain'}
                    source={require('../../../images/ic_search.png')}
                  />
                </View>
              </LinearGradient>
            </View>

            <View
              style={{flex: 1, marginBottom: Scale(50), marginTop: Scale(10)}}>
              <FlatList
                nestedScrollEnabled={true}
                data={this.state.filtermemberlist}
                ItemSeparatorComponent={renderSeparator}
                renderItem={({item, index}) => (
                  <View style={styles.itemStyle}>
                    <View>
                      <Image
                        source={
                          item.profile_pic == ''
                            ? require('../../../images/user-default.png')
                            : { uri: `${item.profile_pic}` }
                        }
                        style={styles.avatar}
                      />
                    </View>

                    <View
                      style={{
                        paddingStart: Scale(15),
                        flex: 1,
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection: 'column', flex: 3}}>
                          <Text style={styles.textname}>
                            {item.first_name} {item.last_name}
                          </Text>
                          <Text style={styles.textdesc}>{item.email}</Text>
                        </View>
                        <View style={styles.memberstyle}>
                          <Text style={{color: color.white}}>Member</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()} // Assign a unique key to each item
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </BackgroundImage>

      // </View>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Scale(16),
    backgroundColor: color.bgcolor,
  },
  h1txt: {
    color: color.white,
    fontWeight: '600',
    fontSize: Scale(18),
  },
  memberstyle: {
    flex: 1,
    fontSize: Scale(12),
    justifyContent: 'center',
    marginStart: Scale(10),
    alignItems: 'center',
    backgroundColor: color.yellow,
    width: Scale(70),
    height: Scale(25),
    padding: Scale(0),
    borderRadius: Scale(20),
  },
  text_color: {
    color: color.white,
  },
  badge: {
    width: Scale(25),
    height: Scale(25),
    borderRadius: 20,
    marginTop: Scale(12),
    marginHorizontal: Scale(10),
    backgroundColor: color.yellow,

    justifyContent: 'center',
  },
  avatar: {
    width: Scale(52),
    height: Scale(52),
    borderRadius: 25,
    borderWidth: Scale(2),
    borderColor: color.yellow,
  },
  headertxt: {
    textAlign: 'center',
    color: color.white,
    fontSize: Scale(16),
    fontWeight: '600',
    marginTop: Scale(10),
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textname: {
    color: color.white,
    fontSize: Scale(14),
    fontWeight: 'bold',
  },
  itemStyle: {
    flexDirection: 'row',
    paddingTop: Scale(10),
    paddingBottom: Scale(10),
    padding: Scale(0),
  },

  textdesc: {
    color: color.white,
    fontSize: Scale(11),
  },
  itemContainer: {
    borderWidth: 0.5,
    marginTop: Scale(10),
    borderColor: color.yellow,
    borderRadius: Scale(18),
    padding: Scale(16),
    marginBottom: Scale(10),
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Scale(10),
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Scale(10),
  },
  infoContainer: {
    flex: 1,
    marginTop: Scale(5),
  },
  bookingIdText: {
    marginBottom: Scale(10),
    textAlign: 'center',
    color: color.white,
  },
  playerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boldText: {
    fontWeight: 'bold',
    color: color.white,
  },
  normalText: {
    fontWeight: '300',
    color: color.white,
  },
});
// Customizable Area End
