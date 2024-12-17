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
import EventDetailScreenController, {
  Props,
} from './EventDetailScreenController';
import {CustomHeader} from '../../components/CustomHeader';
import {getdate, getTime} from '../../globalServices/utils';
import Scale from '../../globalServices/Scale';
// import { Button } from "react-native-elements";
// Customizable Area End
export default class EventDetailScreen extends EventDetailScreenController {
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
      <SafeAreaView style={{flex: 1, backgroundColor: color.bgcolor}}>
        <View style={{flex: 1}}>
          <CustomHeader
            title="Events Detail"
            onBackPress={() => this.props.navigation.goBack()}
          />
          <View style={styles.container}>
            <View>
              <Image
                style={styles.mainImage}
                resizeMode="contain"
                source={{
                  uri: this.state.eventDetails.event_thumbnail,
                }}
              />
              <Text
                style={[
                  styles.titleText18Size,
                  {padding: Scale(10), marginTop: Scale(10)},
                ]}>
                {this.state.eventDetails.event_name}
              </Text>
            </View>
            <View style={{padding: Scale(10)}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: Scale(10),
                }}>
                <Image
                  style={styles.icon_image}
                  resizeMode="contain"
                  source={require('../../images/icb_user.png')}
                />
                <Text style={[styles.textWhite, {fontWeight: '700'}]}>
                  By {this.state.eventDetails.created_name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: Scale(10),
                }}>
                <Image
                  style={styles.icon_image}
                  resizeMode="contain"
                  source={require('../../images/icb_date.png')}
                />
                <Text style={[styles.textWhite]}>
                  {getdate(this.state.eventDetails.event_start)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: Scale(0),
                }}>
                <Image
                  style={styles.icon_image}
                  resizeMode="contain"
                  source={require('../../images/ic_time.png')}
                />
                <Text style={[styles.textWhite]}>
                  {getTime(this.state.eventDetails.event_start)} TO{' '}
                  {getTime(this.state.eventDetails.event_end)}
                </Text>
              </View>
            </View>
            <Text style={[styles.textWhite, {fontSize: Scale(14)}]}>
              {this.state.eventDetails.event_description}
            </Text>
            <View style={{marginTop: 'auto'}}>
              <TouchableOpacity
                onPress={() => {
                  this.goToMemberScreen();
                }}
                style={[
                  GlobalStyle.buttonStyle,
                  {
                    backgroundColor: color.yellow,
                  },
                ]}>
                <Text style={GlobalStyle.btntext}>Book Event</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bgcolor,
    padding: Scale(16),
  },
  titleText18Size: {
    color: color.white,
    fontSize: Scale(16),
    fontWeight: '700',
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
    padding: Scale(16),
  },
  mainImage: {
    marginTop: Scale(10),
    height: Scale(150),
    borderRadius: Scale(15),
  },
  icon_image: {
    width: Scale(30),
    height: Scale(30),
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
    fontSize: Scale(16),
    paddingStart: Scale(10),
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
