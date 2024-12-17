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
import BookScreenController, {Props} from './BookScreenController';
import Scale from '../../globalServices/Scale';
import {BackgroundImage} from '../../components/BackgroundImage';
import SelectDropdown from 'react-native-select-dropdown';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import {getTime, getTimeHrs, getdate} from '../../globalServices/utils';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const arr = [0, 1];
const arr1 = [0, 1];

export default class BookScreen extends BookScreenController {
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
        <View
          style={[
            styles.container,
            {opacity: this.state.cancelbookingmodel ? 0.1 : 1},
          ]}>
          <Text style={styles.headertxt}>My Booking</Text>
          <LinearGradient
            colors={['#B78428', '#252525']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            style={[GlobalStyle.grediant]}>
            <View style={[GlobalStyle.bordercontainer]}>
              <SelectDropdown
                defaultButtonText={this.state.selectedClub}
                data={this.state.clubList}
                onSelect={(selectedItem, index) => {}}
                buttonTextAfterSelection={(selectedItem, index) => {
                  if (selectedItem.id !== this.state.selectedClubId) {
                    // Update state and call functions
                    this.setState({selectedClubId: selectedItem.id});
                    this.getBookingList();
                  }
                  return selectedItem.club_name;
                }}
                rowTextForSelection={(item, index) => {
                  return item.club_name;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                  return (
                    <FaIcon
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color={'#444'}
                      size={14}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
              />
            </View>
          </LinearGradient>

          <View
            style={{
              flexDirection: 'row',
              padding: Scale(5),
              marginTop: Scale(10),
            }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({iscurrent: true}), this.getBookingList();
              }}
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
                    fontWeight: this.state.iscurrent ? '700' : '300',
                  },
                ]}>
                Current
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({iscurrent: false}), this.getBookingList();
              }}
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
                    fontWeight: this.state.iscurrent ? '300' : '700',
                    fontSize: Scale(16),
                  },
                ]}>
                Past
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginBottom: Scale(50)}}>
            <View style={{flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  padding: Scale(5),
                }}>
                <Text style={[styles.h1txt, {flex: 1}]}>Activities</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ActivityBookingsList', {
                      status: this.state.iscurrent ? 'current' : 'past',
                      selectedClubId: this.state.selectedClubId,
                    })
                  }>
                  <Text
                    style={[styles.h1txt, {fontWeight: '200', fontSize: 14}]}>
                    View All
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.activityBookingList.length > 0 ? (
                <FlatList
                  data={this.state.activityBookingList.slice(0, 2)}
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
                                    {
                                      item: item,
                                    },
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
                                  {
                                    paddingStart: Scale(10),
                                    paddingTop: Scale(5),
                                  },
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
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', padding: Scale(5)}}>
                <Text style={[styles.h1txt, {flex: 1}]}>Events</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('EventBookingsList', {
                      status: this.state.iscurrent ? 'current' : 'past',
                      selectedClubId: this.state.selectedClubId,
                    })
                  }>
                  <Text
                    style={[styles.h1txt, {fontWeight: '200', fontSize: 14}]}>
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              {this.state.eventBookingList.length > 0 ? (
                <FlatList
                  data={this.state.eventBookingList.slice(0, 2)}
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
                          <View style={styles.detailsContainer}>
                            {/* Avatar */}
                            <Image
                              resizeMode="contain"
                              source={{
                                uri: item.event_thumbnail,
                              }}
                              style={styles.avatar}
                            />
                            <View style={styles.infoContainer}>
                              <View style={{flexDirection: 'row'}}>
                                <Text
                                  style={[
                                    styles.boldText,
                                    {paddingStart: Scale(10), flex: 1},
                                  ]}>
                                  {item.event_name}
                                </Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignSelf: 'flex-end',
                                  }}>
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
                              <Text
                                style={[
                                  styles.normalText,
                                  {
                                    paddingStart: Scale(10),
                                    paddingTop: Scale(5),
                                    paddingBottom: Scale(5),
                                  },
                                ]}>
                                {' '}
                                - By {item.created_name}
                              </Text>

                              <Text
                                style={[
                                  styles.boldText,
                                  ,
                                  {paddingStart: Scale(10)},
                                ]}>
                                {getdate(item.slot_datetime)} |{' '}
                                <Text style={styles.normalText}>
                                  {' '}
                                  {getTimeHrs(item.start_date_time)}
                                  {' - '}
                                  {getTimeHrs(item.end_date_time)}
                                </Text>
                              </Text>
                            </View>
                          </View>

                          <View style={styles.playerContainer}>
                            <TouchableOpacity
                              style={[
                                GlobalStyle.txteditable,
                                {
                                  flex: 0.3,
                                  marginLeft: 10,
                                  marginTop: 0,
                                  marginStart: Scale(70),
                                  height: Scale(40),
                                  marginEnd: Scale(60),
                                },
                              ]}>
                              <Text style={{color: 'white'}}>
                                ₹ {item.total_amount}
                              </Text>
                            </TouchableOpacity>
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
    fontSize: Scale(18),
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
    // marginTop: Scale(0),
    // borderColor: color.yellow,
    // borderRadius: Scale(18),
    padding: Scale(10),
    // marginBottom: Scale(0),
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
    marginTop: Scale(10),
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
    width: 'auto',
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
