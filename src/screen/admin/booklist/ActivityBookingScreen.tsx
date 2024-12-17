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
import ActivityBookingScreenController, {
  Props,
} from './ActivityBookingScreenController';
import Scale from '../../../globalServices/Scale';
import {SafeAreaFrameContext} from 'react-native-safe-area-context';
import {CustomHeader} from '../../../components/CustomHeader';
import {BackgroundImage} from '../../../components/BackgroundImage';
import {getTime, getTimeHrs} from '../../../globalServices/utils';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
// import { Button } from "react-native-elements";
// Customizable Area End
const arr = [0, 1, 2, 3, 5];
const arr1 = [0, 1];

export default class ActivityBookingScreen extends ActivityBookingScreenController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

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
        <CustomHeader
          title={this.props.route.params.item.activity_name}
          onBackPress={() => this.props.navigation.goBack()}
        />

        <KeyboardAvoidingView
          style={{flex: 1}}
          keyboardVerticalOffset={30}
          behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
          <View style={{padding: Scale(16), paddingTop: Scale(5), flex: 1}}>
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
                      this.filterbooking(text);
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
                    this.getbooking_list('current'),
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
                    this.getbooking_list('past'),
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

            <FlatList
              data={this.state.filteractivity}
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
                      <View
                        style={[
                          styles.dateTimeContainer,
                          {
                            flexDirection: 'row',
                            alignItems: 'center',
                          },
                        ]}>
                        <Text style={styles.boldText}>
                          {moment(item.slot_datetime).format('DD MMM')} |{' '}
                        </Text>
                        <Text style={[styles.normalText, {flex: 1}]}>
                          {getTimeHrs(item.start_date_time)} -{' '}
                          {getTimeHrs(item.end_date_time)}
                        </Text>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate(
                                'EditBookAdminScreen',
                                {item: item},
                              )
                            }>
                            <Image
                              resizeMode={'contain'}
                              source={require('../../../images/ic_edit.png')}
                              style={{marginEnd: Scale(5)}}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate(
                                'ViewBookingScreen',
                                {item: item},
                              )
                            }>
                            <Image
                              resizeMode={'contain'}
                              source={require('../../../images/ic_eye.png')}
                              style={{height: Scale(25), width: Scale(25)}}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.detailsContainer}>
                        {/* Avatar */}
                        <Image
                          resizeMode="contain"
                          source={{uri: item.activity_icon}}
                          style={styles.avatar}
                        />
                        <View style={styles.infoContainer}>
                          <Text
                            style={[
                              styles.boldText,
                              {paddingStart: Scale(10)},
                            ]}>
                            {item.activity_name}
                          </Text>
                          <Text
                            style={[
                              styles.boldText,
                              {paddingStart: Scale(10)},
                            ]}>
                            {item.total_member}{' '}
                            <Text style={styles.normalText}> Members </Text>
                            <Text
                              style={[
                                styles.boldText,
                                {paddingStart: Scale(10)},
                              ]}>
                              {item.total_guest}{' '}
                              <Text style={styles.normalText}> Guest</Text>
                            </Text>
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.bookingIdText}>
                        BOOKING ID :
                        <Text style={styles.boldText}> {item.id}</Text>
                      </Text>
                      <View style={styles.playerContainer}>
                        <Text style={styles.boldText}>{item.player_name}</Text>
                        <Text style={[styles.boldText, {color: color.yellow}]}>
                          Rs {item.total_amount}
                        </Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
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
    width: Scale(60),
    height: Scale(60),
    borderRadius: 15,
    borderWidth: Scale(1),
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
    // marginTop: Scale(10),
    // borderColor: color.yellow,
    // borderRadius: Scale(18),
    padding: Scale(20),
    marginBottom: Scale(5),
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
