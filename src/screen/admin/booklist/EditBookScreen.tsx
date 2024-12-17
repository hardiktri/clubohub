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
import color from '../../../globalServices/color';
import GlobalStyle from '../../../globalServices/globalStyle';
import FaIcon from 'react-native-vector-icons/FontAwesome5';

// Merge Engine - import assets - Start
// Merge Engine - import assets - End
// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// import dayjs from "dayjs";
// import ImageComponent from "./components/ImageComponent/ImageComponent";
import BookListScreenController, {Props} from './BookListScreenController';
import {CustomHeader} from '../../../components/CustomHeader';
import Scale from '../../../globalServices/Scale';
import {BackgroundImage} from '../../../components/BackgroundImage';
import EditBookScreenController from './EditBookScreenController';
import SelectDropdown from 'react-native-select-dropdown';
import {getTime} from '../../../globalServices/utils';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
// import { Button } from "react-native-elements";
// Customizable Area End
const arr = [0, 1, 2, 3, 4, 5, 6];
export default class EditBookScreen extends EditBookScreenController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start

    // Merge Engine - render - Start
    return (
      <BackgroundImage>
        <CustomHeader
          title="Edit Booking"
          onBackPress={() => this.props.navigation.goBack()}
        />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="always">
          <View style={styles.container}>
            <View>
              <Text style={styles.textname}>Booking ID</Text>
              <View>
                <LinearGradient
                  colors={['#B78428', '#252525']}
                  start={{x: 1, y: 0}}
                  end={{x: 0, y: 0}}
                  style={GlobalStyle.grediant}>
                  <TextInput
                    editable={false}
                    style={GlobalStyle.bordercontainer}
                    autoCapitalize="none"
                    returnKeyType="next"
                    placeholderTextColor="white"
                    value={JSON.stringify(this.props.route.params.item.id)}
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                  />
                </LinearGradient>
              </View>
            </View>
            <View>
              <Text style={styles.textname}>Member ID </Text>
              <View>
                <LinearGradient
                  colors={['#B78428', '#252525']}
                  start={{x: 1, y: 0}}
                  end={{x: 0, y: 0}}
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
                    value={JSON.stringify(this.props.route.params.item.user_id)}
                    // onChangeText={(text) => { this.setState({ emailId: text }) }}
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                  />
                </LinearGradient>
              </View>
            </View>
            <View>
              <Text style={styles.textname}>Member Name</Text>
              <View>
                <LinearGradient
                  colors={['#B78428', '#252525']}
                  start={{x: 1, y: 0}}
                  end={{x: 0, y: 0}}
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
                    value={this.props.route.params.item.player_name}
                    // onChangeText={(text) => { this.setState({ emailId: text }) }}
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                  />
                </LinearGradient>
              </View>
            </View>
            <View>
              <Text style={styles.textname}>Activities Name</Text>
              <View>
                <LinearGradient
                  colors={['#B78428', '#252525']}
                  start={{x: 1, y: 0}}
                  end={{x: 0, y: 0}}
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
                    value={this.props.route.params.item.activity_name}
                    // onChangeText={(text) => { this.setState({ emailId: text }) }}
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                  />
                </LinearGradient>
              </View>
            </View>
            <View>
              <Text style={[styles.textname]}>Court No </Text>
              <LinearGradient
                colors={['#B78428', '#252525']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={[GlobalStyle.grediant]}>
                <View style={[GlobalStyle.bordercontainer, {marginLeft: 1.2}]}>
                  <SelectDropdown
                    defaultButtonText={this.state.selectedcourt}
                    data={this.state.courtdatalist}
                    onSelect={(selectedItem, index) => {
                      this.getSlots(selectedItem.court_id);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.court_title;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.court_title;
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
                    disabled={true}
                  />
                </View>
              </LinearGradient>
            </View>
            <View>
              <Text style={[styles.textname]}>Slot Time </Text>
              <LinearGradient
                colors={['#B78428', '#252525']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={[GlobalStyle.grediant]}>
                <View style={[GlobalStyle.bordercontainer, {marginLeft: 1.2}]}>
                  <SelectDropdown
                    defaultButtonText={this.state.selectedslot}
                    data={this.state.slotsDatalist}
                    onSelect={(selectedItem, index) => {
                      this.setState({slot_id: JSON.parse(selectedItem.id)});
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return moment(
                        selectedItem.activity_slot_start_time,
                        'HH:mm:ss',
                      ).format('HH:mm A');
                    }}
                    rowTextForSelection={(item, index) => {
                      return moment(
                        item.activity_slot_start_time,
                        'HH:mm:ss',
                      ).format('HH:mm A');
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
            </View>
            <TouchableOpacity
              onPress={() => this.updatebooking()}
              style={[GlobalStyle.buttonStyle, {marginTop: Scale(20)}]}>
              <Text style={GlobalStyle.btntext}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </BackgroundImage>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
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
  avatar: {
    width: Scale(55),
    height: Scale(55),
    borderRadius: 65,
    borderWidth: Scale(2),
    borderColor: '#B78428',
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
  //drop down styles
  dropdown1BtnStyle: {
    flex: 1,
    width: 'auto',
    height: Scale(50),
    backgroundColor: 'transperent',
  },
  dropdown1BtnTxtStyle: {
    color: '#FFF',
    textAlign: 'left',
    fontSize: Scale(15),
    marginLeft: Scale(-8),
  },
  dropdown1DropdownStyle: {backgroundColor: color.bgcolor},
  dropdown1RowStyle: {
    backgroundColor: color.bgcolor,
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: {color: '#FFF', textAlign: 'left', fontSize: Scale(15)},
});
// Customizable Area End
