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
import color from '../../globalServices/color';
import GlobalStyle from '../../globalServices/globalStyle';

// Merge Engine - import assets - Start
// Merge Engine - import assets - End
// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// import dayjs from "dayjs";
// import ImageComponent from "./components/ImageComponent/ImageComponent";
import Scale from '../../globalServices/Scale';
import {SafeAreaFrameContext} from 'react-native-safe-area-context';
import {CustomHeader} from '../../components/CustomHeader';
import { BackgroundImage } from '../../components/BackgroundImage';
import ClubDetailScreenController from './ClubDetailsScreenController';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
// import { Button } from "react-native-elements";
// Customizable Area End
const arr = [0, 1, 2, 5, 6,7,8,9];

export default class ClubDetailScreen extends ClubDetailScreenController {
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
    const renderplan = () =>
    {
      return(
        <FlatList
        data={this.state.planlist}
        ItemSeparatorComponent={renderSeparator}
        renderItem={({item, index}) => (
          <LinearGradient
          colors={['#B78428', '#252525']}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0}}
          style={[GlobalStyle.grediant,{height:'auto',}]}>
      
          <View
           style={[
            GlobalStyle.bordercontainer,
            { padding: Scale(0),
             height:'auto',
             marginLeft:2.2
            },
          ]}
       >

          <View style={styles.itemContainer}>
            <View></View>
            <View style={styles.detailsContainer}>
              <Image
                resizeMode="contain"
                source={require('../../images/ic_air.png')}
                style={styles.avatar}
              />
              <View style={styles.infoContainer}>
                <Text style={[styles.boldText, {paddingStart: Scale(15)}]}>
                  {item.activity_name}
                </Text>
                <Text
                  style={[styles.normalText, {paddingStart: Scale(15)}]}>
                  {item.club_name}
                </Text>
                <Text
                  style={[
                    styles.normalText,
                    {
                      paddingStart: Scale(15),
                      fontSize: Scale(12),
                      color: 'rgba(255, 255, 255, 0.46)',
                    },
                  ]}>
                  {moment(item.subscription_start).format('DD/MM/YYYY')}- {moment(item.subscription_end).format('DD/MM/YYYY')} 
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#5EB728',
                  padding: Scale(5),
                  borderRadius: Scale(8),
                }}>
                <Text
                  style={{
                    color: color.white,
                    fontSize: Scale(12),
                    paddingStart: Scale(5),
                    paddingEnd: Scale(5),
                  }}>
                  Active Plan
                </Text>
              </View>
            </View>
          </View>
          </View>
          </LinearGradient>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      )
    }
    const renderclub = () =>
    {
      return(
        <FlatList
        data={this.state.clublist}
        ItemSeparatorComponent={renderSeparator}
        renderItem={({item, index}) => (
          <LinearGradient
          colors={['#B78428', '#252525']}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0}}
          style={[GlobalStyle.grediant,{height:'auto',}]}>
      
          <View
           style={[
            GlobalStyle.bordercontainer,
            { padding: Scale(0),
             height:'auto',
             marginLeft:2.2

            },
          ]}
       >


          <View style={styles.itemContainer}>
            <View></View>
            <View style={styles.detailsContainer}>
              <Image
                // resizeMode="contain"
                source={{uri:item.club_banner}}
                style={styles.avatar}
              />
              <View style={styles.infoContainer}>
                <Text style={[styles.boldText, {paddingStart: Scale(15)}]}>
                  {item.club_name}
                </Text>
                <Text
                  style={[styles.normalText, {paddingStart: Scale(15)}]}>
                  Validity
                </Text>
                <Text
                  style={[
                    styles.normalText,
                    {
                      paddingStart: Scale(15),
                      fontSize: Scale(12),
                      color: 'rgba(255, 255, 255, 0.46)',
                    },
                  ]}>
                  {moment(item.subscription_start).format('DD/MM/YYYY')}- {moment(item.subscription_end).format('DD/MM/YYYY')} 
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#5EB728',
                  padding: Scale(5),
                  borderRadius: Scale(8),
                }}>
                <Text
                  style={{
                    color: color.white,
                    fontSize: Scale(12),
                    paddingStart: Scale(5),
                    paddingEnd: Scale(5),
                  }}>
                  Active Plan
                </Text>
              </View>
            </View>
          </View>
          </View>
          </LinearGradient>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      )
    }
    // Merge Engine - render - Start
    return (
      <BackgroundImage >
        <CustomHeader
          title="Club Details"
          onBackPress={() => this.props.navigation.goBack()}></CustomHeader>
        <View
          style={{  
            flexDirection: 'row',
            padding: Scale(15),
            marginTop: Scale(10),
            
          }}>
          <TouchableOpacity
            onPress={() => this.setState({iscurrent: true})}
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
              Subscription Plans
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({iscurrent: false})}
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
              Club
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1,padding:Scale(15)}}>
              {this.state.iscurrent?renderplan():renderclub()}
        </View>
      </BackgroundImage>

      // </View>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
  renderplan(): React.ReactNode {
    throw new Error('Method not implemented.');
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
    fontSize: Scale(16),
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
    width: Scale(35),
    height: Scale(35),
    borderRadius: 5,
    marginBottom: Scale(15),
    borderWidth: Scale(0.5),
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
    // borderColor: color.yellow,
    borderRadius: Scale(18),
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
  },
  infoContainer: {
    flex: 1,
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
