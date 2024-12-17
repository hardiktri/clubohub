import React, {Component} from 'react';
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
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import Scale from '../globalServices/Scale';
import {ScrollView} from 'react-native-gesture-handler';
import {clearData} from '../globalServices/utils';

class CustomSidebarMenu extends Component {
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
        style={{flex: 1, marginTop: -1}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{padding: Scale(20), paddingBottom: Scale(0.1)}}>
            <TouchableOpacity style={styles.avatar}>
              <Image
                source={{uri:this.props.data.profile_pic}}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <View style={{paddingTop: Scale(10), paddingBottom: Scale(10)}}>
              <Text style={[styles.textstyle, {fontWeight: '800'}]}>
                {this.props.data.name}
              </Text>
              <Text style={styles.textstyle}>Member</Text>
            </View>
            <View style={{backgroundColor: '#FFFFFFCC', height: Scale(0.4)}} />
          </View>

          <View style={[{padding: Scale(20), paddingTop: Scale(0)}]}>
            <ScrollView>
              <TouchableOpacity
                style={styles.mainview}
                onPress={() => this.navigation_fn('ProfileScreen')}>
                <Image
                  style={styles.imgstyle}
                  source={require('../images/s_user.png')}
                />
                <Text style={styles.textstyle}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mainview}
                onPress={() => {
                  this.navigation_fn('FamilyMemberScreen');
                }}>
                <Image
                  style={styles.imgstyle}
                  source={require('../images/s_users1.png')}
                />
                <Text style={styles.textstyle}>Family Member</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mainview}
                onPress={() => this.props.navigation.navigate('ChatScreen')}>
                <Image
                  style={styles.imgstyle}
                  source={require('../images/s_list.png')}
                />
                <Text style={styles.textstyle}>Friend list</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mainview}
                onPress={() => this.props.navigation.navigate('EventScreen')}>
                <Image
                  style={styles.imgstyle}
                  source={require('../images/s_event.png')}
                />
                <Text style={styles.textstyle}>Event</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mainview}
                onPress={() =>
                  this.props.navigation.navigate('ActivityScreen')
                }>
                <Image
                  style={styles.imgstyle}
                  source={require('../images/s_activity.png')}
                />
                <Text style={styles.textstyle}>Activities</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mainview}
                onPress={() => this.navigation_fn('AnnouncementScreen')}>
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
                onPress={() =>  {this.props.navigation.navigate('PrivacyPolicyScreen',{type:'privacy'}),
                this.props.navigation.toggleDrawer()}
              }>
                <Image
                  style={styles.imgstyle}
                  source={require('../images/s_privacy.png')}
                />
                <Text style={styles.textstyle}>Privacy Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mainview}
                onPress={() => this.navigation_fn('ContactusScreen')}>
                <Image
                  style={styles.imgstyle}
                  source={require('../images/s_contact.png')}
                />
                <Text style={styles.textstyle}>Contact us</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mainview}
                onPress={() =>  {this.props.navigation.navigate('PrivacyPolicyScreen',{type:'terms'}),
                this.props.navigation.toggleDrawer()}
              }>
                <Image
                  style={styles.imgstyle}
                  source={require('../images/s_terms.png')}
                />
                <Text style={styles.textstyle}>Terms and Condition</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mainview}
                onPress={() => this.navigation_fn('FAQScreen')}>
                <Image
                  style={styles.imgstyle}
                  source={require('../images/s_faq.png')}
                />
                <Text style={styles.textstyle}>FAQ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mainview}
                onPress={() =>  {this.props.navigation.navigate('PrivacyPolicyScreen',{type:'refund'}),
                this.props.navigation.toggleDrawer()}
              }>
                <Image
                  style={styles.imgstyle}
                  source={require('../images/s_refund.png')}
                />
                <Text style={styles.textstyle}>Refund Policy</Text>
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

export default CustomSidebarMenu;
