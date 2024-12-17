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

// Merge Engine - import assets - Start
// Merge Engine - import assets - End
// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// import dayjs from "dayjs";
// import ImageComponent from "./components/ImageComponent/ImageComponent";

import Scale from '../../../globalServices/Scale';
import color from '../../../globalServices/color';
import { CustomHeader } from '../../../components/CustomHeader';
import ProfileAdminScreenController, { Props } from './profileAdminController';
import GlobalStyle from '../../../globalServices/globalStyle';
import { BackgroundImage } from '../../../components/BackgroundImage';
import DatePicker from 'react-native-date-picker';
import SelectDropdown from 'react-native-select-dropdown';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
// import { Button } from "react-native-elements";
// Customizable Area End
const arr = ['Mr', 'Miss', 'Mrs'];
export default class ProfileAdminScreen extends ProfileAdminScreenController {
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
        <View style={{ height: 0.5, backgroundColor: color.dividercolor }} />
      );
    };
    // Merge Engine - render - Start
    return (
      <BackgroundImage>
        <CustomHeader
          title="Profile"
          onBackPress={() => this.props.navigation.goBack()}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: Scale(95) }}
            keyboardShouldPersistTaps="handled">
            <LinearGradient
              colors={['#B78428', '#252525']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={[GlobalStyle.grediant, { height: 'auto' }]}>
              <View
                style={[
                  GlobalStyle.bordercontainer,
                  {
                    padding: Scale(10),
                    marginLeft: 2,
                    marginRight: 2,

                    paddingStart: Scale(15),
                    flexDirection: 'column',
                  },
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: Scale(5),
                    marginTop: 'auto',
                  }}>
                  <TouchableOpacity
                    disabled={!this.state.isedit}
                    onPress={() => this.imageupload()}>
                    <Image
                      source={{ uri: this.state.profile_pic }}
                      style={styles.avatar}
                    />
                  </TouchableOpacity>
                  <View style={{ paddingStart: Scale(8), flex: 1 }}>
                    <Text style={[styles.textstyle, { fontWeight: '800' }]}>
                      {this.state.firstnameheader} {this.state.lastnameheader}
                    </Text>
                    <Text style={[styles.textstyle, { fontSize: Scale(11) }]}>
                      Activity Admin
                    </Text>
                    <Text style={[styles.textstyle, { fontSize: Scale(11) }]}>
                      27 Year Old
                    </Text>
                  </View>
                  <View style={styles.memberstyle}>
                    <Text style={{ color: color.white }}>
                      {this.state.user_id}
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    disabled={this.state.isedit}
                    style={{
                      opacity: this.state.isedit ? 0 : 1,
                      alignSelf: 'flex-end',
                      marginStart: Scale(50),
                    }}
                    onPress={() => this.setState({ isedit: true })}>
                    <Image
                      source={require('../../../images/ic_edit_gradient.png')}
                      style={{
                        height: 40,
                        width: 40,
                        marginTop: 'auto',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
            <View>
              <Text style={styles.textname}>First Name</Text>
              <LinearGradient
                colors={['#B78428', '#252525']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={[GlobalStyle.grediant, { flexDirection: 'row' }]}>
                <View
                  style={[
                    GlobalStyle.bordercontainer,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  ]}>
                  <SelectDropdown
                    disabled={!this.state.isedit}
                    defaultButtonText={this.state.prefix}
                    data={arr}
                    onSelect={(selectedItem, index) => {
                      this.setState({ prefix: selectedItem });
                      console.log(selectedItem, index);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
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
                  <View
                    style={{
                      height: '100%',
                      // Take up the full height of the container
                      width: 1, // Width of the vertical line
                      backgroundColor: '#FFFFFFCC',
                    }}
                  />

                  <TextInput
                    editable={this.state.isedit}
                    style={GlobalStyle.inputStyle}
                    autoCapitalize="none"
                    returnKeyType="next"
                    // onSubmitEditing={() =>
                    //     passwordInputRef.current &&
                    //     passwordInputRef.current.focus()
                    // }
                    placeholderTextColor="white"
                    value={this.state.firstname}
                    onChangeText={text => {
                      this.setState({ firstname: text });
                    }}
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                  />
                </View>
              </LinearGradient>
            </View>
            <View>
              <Text style={styles.textname}>Last Name</Text>
              <View>
                <LinearGradient
                  colors={['#B78428', '#252525']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 0 }}
                  style={GlobalStyle.grediant}>
                  <TextInput
                    editable={this.state.isedit}
                    style={GlobalStyle.bordercontainer}
                    autoCapitalize="none"
                    returnKeyType="next"
                    // onSubmitEditing={() =>
                    //     passwordInputRef.current &&
                    //     passwordInputRef.current.focus()
                    // }
                    placeholderTextColor="white"
                    value={this.state.lastname}
                    onChangeText={text => {
                      this.setState({ lastname: text });
                    }}
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                  />
                </LinearGradient>
              </View>
            </View>
            <View>
              {/* <Text style={styles.textname}>Date of Birth</Text> */}
              <Text style={styles.textname}>Employee Id</Text>
              <View>
                <LinearGradient
                  colors={['#B78428', '#252525']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 0 }}
                  style={GlobalStyle.grediant}>
                  <TouchableOpacity
                    // disabled={!this.state.isedit}
                    activeOpacity={1}
                    disabled={true}
                    style={[
                      GlobalStyle.bordercontainer,
                      {
                        justifyContent: 'center',
                        marginLeft: 2,
                        marginRight: 2,
                        padding: 10,
                      },
                    ]}
                  // onPress={() => this.setState({ dateopen: true })}
                  >
                    {/* <Text style={[{ color: color.white }]}>{this.state.dob}</Text> */}
                    <Text style={[{ color: color.white }]}>{this.state.EmployeeId}</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
              {/* <DatePicker
                modal
                open={this.state.dateopen}
                date={new Date()}
                mode="date"
                onConfirm={date => {
                  console.log('d', date);

                  // setOpen(false)
                  // setDate(date)
                  this.setState({
                    dob: moment(date).format('YYYY-MM-DD'),
                    dateopen: false,
                  });
                }}
                onCancel={() => {
                  this.setState({ dateopen: false });
                }}
              /> */}
            </View>
            <View>
              <Text style={styles.textname}>Email ID</Text>
              <View>
                <LinearGradient
                  colors={['#B78428', '#252525']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 0 }}
                  style={GlobalStyle.grediant}>
                  <TextInput
                    editable={this.state.isedit}
                    style={GlobalStyle.bordercontainer}
                    autoCapitalize="none"
                    returnKeyType="next"
                    // onSubmitEditing={() =>
                    //     passwordInputRef.current &&
                    //     passwordInputRef.current.focus()
                    // }
                    placeholderTextColor="white"
                    value={this.state.emailid}
                    onChangeText={text => {
                      this.setState({ emailid: text });
                    }}
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                  />
                </LinearGradient>
              </View>
            </View>
            <View>
              <Text style={styles.textname}>Phone Number</Text>
              <View>
                <LinearGradient
                  colors={['#B78428', '#252525']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 0 }}
                  style={GlobalStyle.grediant}>
                  <TextInput
                    editable={false}
                    style={GlobalStyle.bordercontainer}
                    autoCapitalize="none"
                    returnKeyType="next"
                    // onSubmitEditing={() =>
                    //     passwordInputRef.current &&
                    //     passwordInputRef.current.focus()
                    // }
                    placeholderTextColor="white"
                    value={this.state.phonenumber}
                    onChangeText={text => {
                      this.setState({ phonenumber: text });
                    }}
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                  />
                </LinearGradient>
              </View>
            </View>
            {this.state.isedit ? (
              <TouchableOpacity
                onPress={() => this.updateuserdetails()}
                style={[GlobalStyle.buttonStyle, { marginTop: Scale(20) }]}>
                <Text style={GlobalStyle.btntext}>Update</Text>
              </TouchableOpacity>
            ) : null}
          </ScrollView>
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
    // backgroundColor: color.bgcolor,
    padding: Scale(16),
    paddingStart: Scale(22),
  },
  textname: {
    color: color.white,
    fontSize: Scale(14),
    paddingTop: Scale(10),
    paddingStart: Scale(5),
  },
  itemStyle: {
    flexDirection: 'row',
    paddingTop: Scale(10),
    paddingBottom: Scale(10),
    padding: Scale(16),
  },
  memberstyle: {
    flex: 0.4,
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
  avatar: {
    width: Scale(55),
    height: Scale(55),
    borderRadius: 65,

    borderWidth: Scale(0.5),
    borderColor: '#B78428',
  },
  textstyle: {
    paddingStart: Scale(7),
    color: color.white,
  },
  textdesc: {
    color: color.white,
    fontSize: Scale(12),
  },

  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
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
  leaderboardItem: {},
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
  dropdown1BtnStyle: {
    flex: 0.25,
    height: Scale(30),

    backgroundColor: color.bgcolor,
  },
  dropdown1BtnTxtStyle: { color: '#FFF', textAlign: 'left', fontSize: Scale(16) },
  dropdown1DropdownStyle: { backgroundColor: color.bgcolor, fontSize: Scale(16) },
  dropdown1RowStyle: {
    backgroundColor: color.bgcolor,
    fontSize: Scale(12),
    height: Scale(40),
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: { color: '#FFF', textAlign: 'left', fontSize: Scale(12) },
});

// Customizable Area End
