import * as React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import color from '../../globalServices/color';
import GlobalStyle from '../../globalServices/globalStyle';
import SelectDropdown from 'react-native-select-dropdown';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import FriendRequestScreenController, {
  Props,
} from './FriendRequestScreenController';
import Scale from '../../globalServices/Scale';
import {CustomHeader} from '../../components/CustomHeader';
import {BackgroundImage} from '../../components/BackgroundImage';
import LinearGradient from 'react-native-linear-gradient';
const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export default class FriendRequestScreen extends FriendRequestScreenController {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const renderSeparator = () => {
      return (
        <View style={{height: 0.5, backgroundColor: color.dividercolor}} />
      );
    };
    return (
      <BackgroundImage>
        <CustomHeader
          title="Friend Request"
          onBackPress={() => this.props.navigation.goBack()}
        />
        <View
          style={[
            styles.container,
            {padding: Scale(16), paddingTop: Scale(0)},
          ]}>
          <View style={[GlobalStyle.txteditable, {padding: 10}]}>
            <SelectDropdown
              defaultButtonText={this.state.selectedClub}
              data={this.state.clubList}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
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
          <View
            style={{
              padding: Scale(8),
              flexDirection: 'row',
              marginTop: Scale(5),
              alignItems: 'center',
            }}>
            <Text style={[styles.h1txt, {flex: 1}]}>Request List</Text>
            <View
              style={{
                flexDirection: 'row',
                width: '55%',
                marginRight: Scale(10),
              }}>
              <LinearGradient
                colors={['#B78428', '#252525']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={[
                  GlobalStyle.grediant,
                  {
                    marginTop: Scale(0),
                    height: Scale(35),
                  },
                ]}>
                <View
                  style={[
                    GlobalStyle.bordercontainer,
                    {
                      flexDirection: 'row',
                      padding: Scale(0),
                      alignItems: 'center',
                      width: 'auto',
                    },
                  ]}>
                  <TextInput
                    style={{
                      flex: 1,
                      padding: Scale(0),
                      color: color.searchtxt,
                      marginLeft: 10,
                    }} // Add any additional styles
                    placeholder="Search here...."
                    autoCapitalize="none"
                    returnKeyType="next"
                    placeholderTextColor={color.searchtxt}
                    onChangeText={text => {
                      this.filterData(text);
                    }}
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                  />
                  <Image
                    style={{marginRight: 10}} // Adjust margin as needed
                    resizeMode={'contain'}
                    source={require('../../images/ic_search.png')}
                  />
                </View>
              </LinearGradient>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ChatScreen')}>
              <Image
                resizeMode={'contain'}
                source={require('../../images/ic_friendchat.png')}
                style={{
                  width: Scale(20),
                  height: Scale(20),
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('InviteFriendScreen')
              }>
              <Image
                resizeMode={'contain'}
                source={require('../../images/ic_useradd.png')}
                style={{marginStart: Scale(10)}}
              />
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={this.state.filterRequestList}
              ItemSeparatorComponent={renderSeparator}
              renderItem={({item, index}) => (
                <View style={styles.itemStyle}>
                  <View>
                    <Image
                      source={
                          item.profile_pic == ''
                            ? require('../../images/user-default.png')
                            : { uri: `${item.profile_pic}` }
                        }
                      style={styles.avatar}
                    />
                  </View>

                  <View
                    style={{
                      paddingStart: Scale(15),
                      flex: 1,
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.textname}>{item.name}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() =>
                        this.acceptRejectAPI(item.sender_id, 'Reject')
                      }
                      style={{paddingStart: Scale(5), paddingEnd: Scale(10)}}>
                      <Image source={require('../../images/ic_cancel.png')} />
                      <Text style={styles.rejecttxt}>REJECT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.acceptRejectAPI(item.sender_id, 'Accept')
                      }>
                      <Image source={require('../../images/ic_accept.png')} />
                      <Text style={styles.rejecttxt}>ACCEPT</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()} // Assign a unique key to each item
            />
          </View>
        </View>
      </BackgroundImage>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: color.bgcolor,
  },
  h1txt: {
    color: color.white,
    fontWeight: '600',
    fontSize: Scale(16),
  },
  rejecttxt: {
    color: color.white,
    fontSize: Scale(10),
    textAlign: 'center',
    paddingTop: Scale(5),
  },
  underline: {
    borderBottomColor: color.yellow, // Change the color as needed
    borderBottomWidth: 0.5,
    width: Scale(78), // Adjust the width as needed
    marginTop: 1,
    paddingEnd: Scale(10), // Adjust the spacing between text and underline as needed
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
  avatar: {
    width: Scale(50),
    height: Scale(50),
    borderRadius: 65,
    borderWidth: Scale(2),
    borderColor: '#B78428',
  },
  textdesc: {
    color: color.white,
    fontSize: Scale(12),
  },
  dropdown1BtnStyle: {
    flex: 1,
    height: Scale(40),
    backgroundColor: color.bgcolor,
  },
  dropdown1BtnTxtStyle: {color: '#FFF', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: color.bgcolor},
  dropdown1RowStyle: {
    backgroundColor: color.bgcolor,
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: {color: '#FFF', textAlign: 'left'},
});
// Customizable Area End
