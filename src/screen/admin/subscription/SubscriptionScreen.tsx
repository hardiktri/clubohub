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
import SubscriptionScreenController, {
  Props,
} from './SubscriptionScreenController';
import Scale from '../../../globalServices/Scale';
import {SafeAreaFrameContext} from 'react-native-safe-area-context';
import {BackgroundImage} from '../../../components/BackgroundImage';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
// import { Button } from "react-native-elements";
// Customizable Area End
const arr = [0, 1, 2, 3, 4];
const arr1 = [0, 1, 2, 3, 4];

export default class SubscriptionScreen extends SubscriptionScreenController {
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
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'center',
                marginStart: Scale(50),
              }}>
              <Text style={[styles.headertxt, {flex: 2, alignSelf: 'center'}]}>
                Activity Subscription
              </Text>
              <TouchableOpacity
                style={{flex: 0.5, alignItems: 'center', alignSelf: 'flex-end'}}
                onPress={() =>
                  this.props.navigation.navigate('AddSubscriptionScreen')
                }>
                <Image
                  resizeMode={'contain'}
                  source={require('../../../images/ic_add.png')}
                  style={{
                    height: Scale(25),
                    width: Scale(25),
                    marginTop: Scale(1),
                  }}
                />
              </TouchableOpacity>
            </View>
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
              style={{
                flexDirection: 'row',
                padding: Scale(5),
                marginTop: Scale(10),
              }}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({iscurrent: true}, () =>
                    this.getsubscription_list('current'),
                  )
                }
                style={[
                  GlobalStyle.buttonStyle,
                  {
                    flex: 1,
                    marginEnd: Scale(10),
                    backgroundColor: this.state.iscurrent
                      ? color.yellow
                      : color.bgcolor,
                    borderColor: color.yellow,
                    borderWidth: 0.5,
                  },
                ]}>
                <Text
                  style={[
                    GlobalStyle.btntext,
                    {
                      fontSize: Scale(16),
                      fontWeight: this.state.iscurrent ? '900' : '300',
                    },
                  ]}>
                  Current
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({iscurrent: false}, () =>
                    this.getsubscription_list('past'),
                  )
                }
                style={[
                  GlobalStyle.txteditable,
                  {
                    flex: 1,
                    marginTop: Scale(0),
                    backgroundColor: this.state.iscurrent
                      ? color.bgcolor
                      : color.yellow,
                  },
                ]}>
                <Text
                  style={[
                    GlobalStyle.btntext,
                    {
                      fontWeight: this.state.iscurrent ? '300' : '900',
                      fontSize: Scale(16),
                    },
                  ]}>
                  Past
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{flex: 1, marginBottom: Scale(50), marginTop: Scale(10)}}>
              <FlatList
                data={this.state.filtersubscription_list}
                contentContainerStyle={{marginBottom: Scale(200)}}
                ItemSeparatorComponent={renderSeparator}
                renderItem={({item, index}) => (
                  <LinearGradient
                    colors={['#B78428', '#252525']}
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 0}}
                    style={[GlobalStyle.grediant, {height: 'auto'}]}>
                    <View
                      style={[
                        GlobalStyle.bordercontainer,
                        {
                          padding: Scale(0),
                          height: 'auto',
                          marginStart: 2,
                          marginLeft: 1.5,
                        },
                      ]}>
                      <View style={styles.itemContainer}>
                        <View style={styles.detailsContainer}>
                          {/* Avatar */}
                          <Image
                            resizeMode="contain"
                            source={{uri: item.activity_icon}}
                            style={[styles.avatar, {marginBottom: Scale(10)}]}
                          />
                          <View style={styles.infoContainer}>
                            <Text
                              style={[
                                styles.boldText,
                                {paddingStart: Scale(10)},
                              ]}>
                              {item.user_name}
                            </Text>
                            <Text
                              style={[
                                styles.normalText,
                                {paddingStart: Scale(10)},
                              ]}>
                              {item.activity_name}
                            </Text>
                            <Text
                              style={[
                                styles.normalText,
                                {paddingStart: Scale(10)},
                              ]}>
                              {moment(item.subscription_start).format(
                                'DD/MM/YYYY',
                              )}
                              -{' '}
                              {moment(item.subscription_end).format(
                                'DD/MM/YYYY',
                              )}
                            </Text>
                            <Text
                              style={[
                                styles.boldText,
                                {paddingStart: Scale(10)},
                              ]}>
                              Rs. {item.subscription_price}
                            </Text>
                          </View>
                        </View>
                        <Text style={styles.bookingIdText}>
                          Subcription ID :
                          <Text style={styles.boldText}> {item.id} </Text>
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </BackgroundImage>
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
    width: Scale(50),
    height: Scale(50),
    borderRadius: 15,
    borderWidth: Scale(1),
    borderColor: color.yellow,
  },
  headertxt: {
    textAlign: 'center',
    color: color.white,
    fontSize: Scale(16),
    fontWeight: '600',
    marginTop: Scale(20),
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textname: {
    color: color.white,
    fontSize: Scale(16),
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
    fontSize: Scale(12),
  },
  itemContainer: {
    // borderWidth: 0.5,
    marginTop: Scale(10),
    // borderColor: color.yellow,
    // borderRadius: Scale(18),
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
    fontSize: Scale(12),
  },
});
// Customizable Area End
