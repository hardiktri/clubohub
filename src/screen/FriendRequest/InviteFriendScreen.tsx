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
} from 'react-native';
import color from '../../globalServices/color';
import GlobalStyle from '../../globalServices/globalStyle';

// Merge Engine - import assets - Start
// Merge Engine - import assets - End
// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// import dayjs from "dayjs";
// import ImageComponent from "./components/ImageComponent/ImageComponent";
import InviteFriendScreenController, {
  Props,
} from './InviteFriendScreenController';
import Scale from '../../globalServices/Scale';
import {CustomHeader} from '../../components/CustomHeader';
import {BackgroundImage} from '../../components/BackgroundImage';
import SelectDropdown from 'react-native-select-dropdown';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
// Customizable Area End
const arr = [0, 1, 2, 3, 4, 5, 6];

export default class InviteFriendScreen extends InviteFriendScreenController {
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
          title="Invite Friend"
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
            <Text style={[styles.h1txt, {flex: 1}]}>Members</Text>
            <View
              style={{
                flexDirection: 'row',
                width: '75%',
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
          </View>
          <View>
            <FlatList
              data={this.state.filtermemberlist}
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
                    <Text style={styles.textname}>
                      {item.first_name} {item.last_name}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{justifyContent: 'center'}}
                    onPress={() =>
                      this.sendrequest(item.user_id, item.friend_flag)
                    }>
                    <Text
                      style={[
                        styles.textname,
                        {
                          fontSize: Scale(12),
                          color: color.btncolor,
                          textAlign: 'center',
                          fontWeight: '400',
                          paddingEnd: Scale(10),
                        },
                      ]}>
                      {this.getfriendstatus(item.friend_flag)}
                    </Text>
                    {/* <View style={styles.underline}></View> */}
                  </TouchableOpacity>
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
    flex: 1,
    // backgroundColor: color.bgcolor,
  },
  h1txt: {
    color: color.white,
    fontWeight: '600',
    fontSize: Scale(16),
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
