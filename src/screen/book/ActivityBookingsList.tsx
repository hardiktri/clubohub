import * as React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import color from '../../globalServices/color';
import GlobalStyle from '../../globalServices/globalStyle';
import Scale from '../../globalServices/Scale';
import {BackgroundImage} from '../../components/BackgroundImage';
import SelectDropdown from 'react-native-select-dropdown';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import {getTime, getTimeHrs, getdate} from '../../globalServices/utils';
import ActivityBookingsListController, {
  Props,
} from './ActivityBookingsListController';
import {CustomHeader} from '../../components/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';

const arr = [0, 1];
const arr1 = [0, 1];

export default class ActivityBookingsList extends ActivityBookingsListController {
  constructor(props: Props) {
    super(props);
  }

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
                source={require('../../images/ic_cancel.png')}
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
              Are you sure that you want to cancel your booking?
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
                onPress={() => {
                  this.setState({cancelbookingmodel: false}),
                    this.cancelBookingAPI();
                }}
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
    const renderSeparator = () => {
      return (
        <View style={{height: 0.5, backgroundColor: color.dividercolor}} />
      );
    };
    return (
      <BackgroundImage>
        <CustomHeader
          title="My Activity Bookings"
          onBackPress={() => this.props.navigation.goBack()}
        />
        <View
          style={[
            styles.container,
            {opacity: this.state.cancelbookingmodel ? 0.1 : 1},
          ]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flex: 1}}>
              {this.state.activityBookingList.length > 0 ? (
                <FlatList
                  data={this.state.activityBookingList}
                  scrollEnabled={false}
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
                          {padding: Scale(0), height: 'auto'},
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
                              {getdate(item.slot_datetime)} |{' '}
                            </Text>
                            <Text style={[styles.normalText, {flex: 1}]}>
                              {' '}
                              {getTimeHrs(item.start_date_time)}
                              {' - '}
                              {getTimeHrs(item.end_date_time)}
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <TouchableOpacity
                                onPress={() =>
                                  this.props.navigation.navigate(
                                    'EditBookScreen',
                                    {item: item},
                                  )
                                }>
                                <Image
                                  resizeMode={'contain'}
                                  source={require('../../images/ic_edit.png')}
                                  style={{marginEnd: Scale(10)}}
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() =>
                                  this.setState({
                                    cancelbookingmodel: true,
                                    idForDelete: item.id,
                                  })
                                }>
                                <Image
                                  resizeMode={'contain'}
                                  source={require('../../images/ic_delete.png')}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                          <View style={styles.detailsContainer}>
                            {/* Avatar */}
                            <Image
                              resizeMode="contain"
                              source={{
                                uri: item.activity_icon,
                              }}
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
                                  ,
                                  {paddingStart: Scale(10)},
                                ]}>
                                {item.total_person}{' '}
                                <Text style={styles.normalText}> Members</Text>
                              </Text>
                            </View>
                          </View>
                          <Text style={styles.bookingIdText}>
                            BOOKING ID :
                            <Text style={styles.boldText}> {item.id}</Text>
                          </Text>
                          <View style={styles.playerContainer}>
                            <Text style={styles.boldText}>
                              {item.player_name}
                            </Text>
                            <Text style={styles.boldText}>
                              ₹ {item.total_amount}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noDataText}>No data available</Text>
                </View>
              )}
            </View>
          </ScrollView>
          {this.PopupModal()}
        </View>
      </BackgroundImage>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Scale(16),
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
    marginTop: Scale(5),
    // borderColor: color.yellow,
    // borderRadius: Scale(18),
    padding: Scale(16),
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
  noDataContainer: {
    height: Scale(150),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    marginTop: '50%',
    borderColor: color.yellow,
    borderRadius: Scale(18),
    padding: Scale(16),
    marginBottom: Scale(10),
  },
  noDataText: {
    fontSize: 18,
    color: 'gray',
  },

  //drop down styles
  dropdown1BtnStyle: {
    flex: 1,
    height: Scale(50),
    backgroundColor: 'transperent',
  },
  dropdown1BtnTxtStyle: {color: '#FFF', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: color.bgcolor},
  dropdown1RowStyle: {
    backgroundColor: color.bgcolor,
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: {color: '#FFF', textAlign: 'left'},
});
