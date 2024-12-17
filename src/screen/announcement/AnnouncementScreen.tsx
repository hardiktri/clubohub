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

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Merge Engine - import assets - Start
// Merge Engine - import assets - End
// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// import dayjs from "dayjs";
// import ImageComponent from "./components/ImageComponent/ImageComponent";
import AnnouncementScreenController, {
  Props,
} from './AnnouncementScreenController';
import { CustomHeader } from '../../components/CustomHeader';
import Scale from '../../globalServices/Scale';
import { BackgroundImage } from '../../components/BackgroundImage';
import moment from 'moment';
// import { Button } from "react-native-elements";
// Customizable Area End
export default class AnnouncementScreen extends AnnouncementScreenController {
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
        <View style={{ flex: 1 }}>
          <CustomHeader
            title="Announcements"
            onBackPress={() => this.props.navigation.goBack()}></CustomHeader>
          <View style={styles.container}>
            <FlatList
              data={this.state.announcementlist}
              ItemSeparatorComponent={renderSeparator}
              renderItem={({ item, index }) => (
                <View style={styles.itemStyle} >
                  <TouchableOpacity activeOpacity={1} onPress={() => this.visiblefn(item.id)} style={{ flexDirection: 'row' }} >
                    <View>
                      <Image
                        source={require('../../images/ic_user.png')}
                        style={styles.avatar}
                      />
                    </View>

                    <View style={{ paddingStart: Scale(15), flex: 1 }}>
                      <Text style={styles.textname}>{item.title}</Text>
                      <Text numberOfLines={item.visible ? undefined : 1} style={styles.textdesc}>
                        {item.description}
                      </Text>

                      {item.visible && item.attachments != "" &&
                        <TouchableOpacity onPress={() => { this.Download(item.attachments) }} activeOpacity={1} style={{ paddingVertical: 10, paddingHorizontal: 0 }}>

                          {/* <MaterialCommunityIcons name="file-download" style={{ fontSize: Scale(30), color: color.yellow, }} /> */}

                          <Text style={{
                            color: color.yellow,
                            fontSize: Scale(15),
                          }}>Attachment
                          </Text>

                        </TouchableOpacity>}

                    </View>

                    <View>
                      <Text style={[styles.textname, { fontSize: Scale(12) }]}>
                        {moment(item.created_at).format('MMM DD')}
                      </Text>

                    </View>
                  </TouchableOpacity>
                  {/* 
                  {item.visible ?

                    <View style={{ margin: Scale(10) }}> */}
                  {/* <Text style={styles.textdesc}>
                        {item.announcement_description}
                      </Text> */}

                  {/* {item.attachments != "" &&
                        <TouchableOpacity onPress={() => { this.Download(item.attachments) }} activeOpacity={1} style={{ paddingVertical: 10, paddingHorizontal: 0 }}>

                          <MaterialCommunityIcons name="file-download" style={{ fontSize: Scale(30), color: color.yellow, }} />

                          <Text style={{
                            color: color.yellow,
                            fontSize: Scale(15),
                          }}>Attachment
                          </Text>

                        </TouchableOpacity>} */}

                  {/* </View> : null} */}
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
  textname: {
    color: color.white,
    fontSize: Scale(16),
    fontWeight: 'bold',
  },
  itemStyle: {
    paddingTop: Scale(10),
    paddingBottom: Scale(10),
    padding: Scale(16),
  },
  avatar: {
    width: Scale(55),
    height: Scale(55),
    borderRadius: 65,
    borderWidth: Scale(2),
    borderColor: color.yellow,
  },
  badge: {
    width: Scale(25),
    height: Scale(25),
    borderRadius: 20,
    marginTop: Scale(12),
    backgroundColor: color.yellow,

    justifyContent: 'center',
  },
  textdesc: {
    color: color.white,
    fontSize: Scale(15),
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
