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
import {CustomHeader} from '../../../components/CustomHeader';
import Scale from '../../../globalServices/Scale';
import {BackgroundImage} from '../../../components/BackgroundImage';
import EditBookScreenController, {Props}  from './EditBookScreenController';
import { getTime } from '../../../globalServices/utils';
import LinearGradient from 'react-native-linear-gradient';
export default class ViewBookingScreen extends EditBookScreenController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      <BackgroundImage>
        <CustomHeader
          title="View Booking"
          onBackPress={() => this.props.navigation.goBack()}></CustomHeader>
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
                  // onChangeText={(text) => { this.setState({ emailId: text }) }}
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
              <Text style={styles.textname}>Court No</Text>
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
                  value={this.props.route.params.item.court_title}

                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
                </LinearGradient>
              </View>
            </View>
            <View>
              <Text style={styles.textname}>Slot Time</Text>
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
                   value={getTime(this.props.route.params.item.start_date_time) +" - "+ getTime(this.props.route.params.item.end_date_time)}
                  // onChangeText={(text) => { this.setState({ emailId: text }) }}
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
                </LinearGradient>
              </View>
            </View>
            <View>
              <Text style={styles.textname}>Price</Text>
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
                  value={JSON.stringify(this.props.route.params.item.total_amount)}
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
                </LinearGradient>
              </View>
            </View>
            <View>
              <Text style={styles.textname}>Number Of Member</Text>
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
                  value={JSON.stringify(this.props.route.params.item.total_member)}
                  // onChangeText={(text) => { this.setState({ emailId: text }) }}
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
                </LinearGradient>
              </View>
            </View>
            <View>
              <Text style={styles.textname}>Number of Guest</Text>
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
                  value={JSON.stringify(this.props.route.params.item.total_guest)}
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
                </LinearGradient>
              </View>
            </View>
          
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
});
// Customizable Area End
