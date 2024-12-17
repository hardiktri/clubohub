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
import HelpScreenController, {Props} from './HelpScreenController';
import {CustomHeader} from '../../components/CustomHeader';
import Scale from '../../globalServices/Scale';
import {BackgroundImage} from '../../components/BackgroundImage';
import LinearGradient from 'react-native-linear-gradient';
// import { Button } from "react-native-elements";
// Customizable Area End
const arr = [0, 1, 2, 3, 4, 5, 6];
export default class HelpScreen extends HelpScreenController {
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
          title="Help-Feedback"
          onBackPress={() => this.props.navigation.goBack()}></CustomHeader>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="always">
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
            <View>
             
              <ScrollView
                contentContainerStyle={{flexGrow: 1, paddingBottom: Scale(50)}}
                keyboardShouldPersistTaps="handled">
                <View style={styles.container}>
                  <View>
                    <Text style={styles.textname}>First Name</Text>
                    <View >
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
                         value={this.state.firstname}
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                      />
                      </LinearGradient>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.textname}>Last Name</Text>
                    <View >
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
                        value={this.state.lastname}
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                      />
                      </LinearGradient>
                    </View>
                  </View>
                 
                  <View>
                    <Text style={styles.textname}>Email ID</Text>
                    <View >
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
                        value={this.state.email}
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                      />
                      </LinearGradient>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.textname}>Complain about the App</Text>
                    <View >
                    <LinearGradient
                      colors={['#B78428', '#252525']}
                      start={{x: 1, y: 0}}
                      end={{x: 0, y: 0}}
                      style={GlobalStyle.grediant}>
                      <TextInput
                        style={GlobalStyle.bordercontainer}
                        autoCapitalize="none"
                        returnKeyType="next"
                        value={this.state.complain}
                        placeholderTextColor="white"
                        onChangeText={(text) => { this.setState({ complain: text }) }}
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                      />
                      </LinearGradient>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.textname}>
                      Any Suggestion or Comment
                    </Text>
                    <View >
                    <LinearGradient
                      colors={['#B78428', '#252525']}
                      start={{x: 1, y: 0}}
                      end={{x: 0, y: 0}}
                      style={GlobalStyle.grediant}>
                      <TextInput
                        style={GlobalStyle.bordercontainer}
                        autoCapitalize="none"
                        returnKeyType="next"
                        value={this.state.suggestion}
                        onChangeText={(text) => { this.setState({ suggestion: text }) }}

                        placeholderTextColor="white"

                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                      />
                      </LinearGradient>
                    </View>
                  </View>
                  <View >
                  <Text style={styles.textname}>Attach file(JPG,PNG)</Text>

                  <LinearGradient
                    colors={['#B78428', '#252525']}
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 0}}
                    style={GlobalStyle.grediant}>
                    <TouchableOpacity
                      style={[
                        GlobalStyle.bordercontainer,
                        
                        {justifyContent: 'center'},
                      ]}
                      onPress={() => this.imageupload()}

                      >
                    <Text style={[{color: color.white}]}>{this.state.file.name==null ? "Choose File":this.state.file.name }</Text>

                    </TouchableOpacity>
                  </LinearGradient>
                </View>
                  <TouchableOpacity
                   style={[GlobalStyle.buttonStyle, {marginTop: Scale(20)}]}
             
                  onPress={() =>
                    this.add_helpfeedback()
                  }
                  >
                      <Text style={GlobalStyle.btntext}>Submit</Text>
                </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
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
    flex: 1,
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
