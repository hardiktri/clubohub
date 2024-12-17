import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  SafeAreaView,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import Scale from '../globalServices/Scale';
import { ScrollView } from 'react-native-gesture-handler';
import { clearData } from '../globalServices/utils';

class CustomSidebarMenuAdmin extends Component {
  constructor(props) {
    super(props);
  }

  navigation_fn = name => {
    this.props.navigation.toggleDrawer();
    this.props.navigation.navigate(name);
  };

  logout = () => {
    clearData();
    this.props.navigation.replace('LoginScreen');
  };

  render() {
    console.log('props::', this.props.data.profile_pic);
    return (
      <LinearGradient
        colors={['#30303C', '#13132D']}
        style={{ flex: 1, marginTop: -1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={{ padding: Scale(20), paddingBottom: Scale(0.1) }}>
              <TouchableOpacity style={styles.avatar}>
                <Image
                  source={{ uri: this.props.data.profile_pic }}
                  style={styles.avatar}
                />
              </TouchableOpacity>
              <View style={{ paddingTop: Scale(10), paddingBottom: Scale(10) }}>
                <Text style={[styles.textstyle, { fontWeight: '800' }]}>
                  {this.props.data.name}
                </Text>
                <Text style={styles.textstyle}>Activity Admin</Text>
              </View>
              <View style={{ backgroundColor: '#FFFFFFCC', height: Scale(0.4) }} />
            </View>

            <View style={[{ padding: Scale(20), paddingTop: Scale(0) }]}>
              <ScrollView>
                <TouchableOpacity
                  onPress={() => {
                    this.navigation_fn('ProfileAdmin')
                  }}
                  style={styles.mainview}>
                  <Image
                    style={styles.imgstyle}
                    source={require('../images/s_user.png')}
                  />
                  <Text style={styles.textstyle}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.mainview}
                  onPress={() => {
                    this.props.navigation.navigate('MemberlistScreen');
                  }}>
                  <Image
                    style={styles.imgstyle}
                    source={require('../images/s_users1.png')}
                  />
                  <Text style={styles.textstyle}>Member List</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.mainview}
                  onPress={() => this.props.navigation.navigate('BookListScreen')}>
                  <Image
                    style={styles.imgstyle}
                    source={require('../images/s_event.png')}
                  />
                  <Text style={styles.textstyle}>Booking List</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.mainview}
                  onPress={() => this.props.navigation.navigate('SubscriptionScreen')}>
                  <Image
                    style={styles.imgstyle}
                    source={require('../images/s_activity.png')}
                  />
                  <Text style={styles.textstyle}>Subscription</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.mainview}
                  onPress={() => this.props.navigation.navigate('AnnouncementScreenAdmin')}>
                  <Image
                    style={styles.imgstyle}
                    source={require('../images/s_announcement.png')}
                  />
                  <Text style={styles.textstyle}>Announcement</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.mainview}
                  onPress={() => this.navigation_fn('HelpScreen')}>
                  <Image
                    style={styles.imgstyle}
                    source={require('../images/s_help.png')}
                  />
                  <Text style={styles.textstyle}>Help/Feedback</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.mainview}
                  onPress={() => this.logout()}>
                  <Image
                    style={styles.imgstyle}
                    source={require('../images/s_logout.png')}
                  />
                  <Text style={styles.textstyle}>Logout</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Scale(12),
  },
  imgstyle: {
    width: Scale(30),
    height: Scale(30),
  },
  textstyle: {
    paddingStart: Scale(7),
    color: 'white',
  },
  avatar: {
    width: Scale(65),
    height: Scale(65),
    borderRadius: 65,
  },
});

export default CustomSidebarMenuAdmin;

