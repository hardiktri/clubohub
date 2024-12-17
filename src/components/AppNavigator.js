import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {getdata} from '../globalServices/utils';

// Import your screens/components
import HomeScreen from '../screen/home/HomeScreen';
import HomeAdminScreen from '../screen/admin/homeadmin/HomeAdminScreen';
import CustomSidebarMenu from './CustomSideMenu';
import SplashScreen from '../screen/splash/SplashScreen';
import LoginScreen from '../screen/login/LoginScreen';
import EventScreen from '../screen/event/EventScreen';
import BookScreen from '../screen/book/BookScreen';
import ActivityScreen from '../screen/activity/ActivityScreen';
import ChatScreen from '../screen/chat/ChatScreen';
import {Image, SafeAreaView, StatusBar, View} from 'react-native';
import color from '../globalServices/color';
import VerifyOtpScreen from '../screen/login/VerifyOtpScreen';
import LinearGradient from 'react-native-linear-gradient';
import NotificationScreen from '../screen/notification/NotificationScreen';
import FamilyMemberScreen from '../screen/familymember/FamilyMemberScreen';
import AnnouncementScreen from '../screen/announcement/AnnouncementScreen';
import {TransitionPresets} from '@react-navigation/stack';
import PrivacyPolicyScreen from '../screen/policy/PrivacyPolicyScreen';
import TermsConditionScreen from '../screen/policy/TermsConditionScreen';
import RefundPolicyScreen from '../screen/policy/RefundPolicyScreen';
import ContactusScreen from '../screen/contactus/ContactusScreen';
import FAQScreen from '../screen/contactus/FAQScreen';
import HelpScreen from '../screen/helpfeedback/HelpScreen';
import FriendRequestScreen from '../screen/FriendRequest/FriendRequestScreen';
import InviteFriendScreen from '../screen/FriendRequest/InviteFriendScreen';
import EditBookScreen from '../screen/book/EditBookScreen';
import ProfileScreen from '../screen/profile/ProfileScreen';
import ClubDetailScreen from '../screen/profile/ClubDetailScreen';
import SlotsScreen from '../screen/activity/SlotsScreen';
import MemberSelection from '../screen/activity/MemberSelection';
import Scale from '../globalServices/Scale';
import EventDetailScreen from '../screen/event/EventDetailScreen';
import PaymentScreen from '../screen/payment/PaymentScreen';
import ChatDetailScreen from '../screen/chat/ChatDetailScreen';
import ClubViewScreen from '../screen/home/ClubViewScreen';
import BookListScreen from '../screen/admin/booklist/BookListScreen';
import AnnouncementScreenAdmin from '../screen/admin/announcement/AnnouncementScreen';
import CustomSidebarMenuAdmin from './CustomSideMenuAdmin';
import MemberlistScreen from '../screen/admin/memberlist/MemberlistScreen';
import EditBookAdminScreen from '../screen/admin/booklist/EditBookScreen';
import ActivityBookingScreen from '../screen/admin/booklist/ActivityBookingScreen';
import ViewBookingScreen from '../screen/admin/booklist/ViewBookingScreen';
import SubscriptionScreen from '../screen/admin/subscription/SubscriptionScreen';
import AddSubscriptionScreen from '../screen/admin/subscription/AddSubscriptionScreen';
import NotificationListScreen from '../screen/admin/notificationList/NotificationListScreen';
import ProfileAdminScreen from '../screen/admin/profile/profileAdmin';
import ActivityBookingsList from '../screen/book/ActivityBookingsList';
import EventBookingsList from '../screen/book/EventBookingsList';
import WebView from '../screen/payment/Webview';
import Custommessage from '../screen/payment/Custommessage';
import Payresponse from '../screen/payment/Payresponse';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <SafeAreaView style={{flex: 1, backgroundColor: color.bgcolor}}>
    <Tab.Navigator
      screenOptions={({route}) => ({
        // tabBarBadge: 1,
        // tabBarActiveBackgroundColor: "white",
        headerShown: false,
        unmountOnBlur: true,
        tabBarActiveTintColor: color.active_tab,
        tabBarInactiveTintColor: color.inactive_tab,
        // headerStyle: {
        //     elevation: 10, // remove shadow on Android
        //     shadowOpacity: 10, // remove shadow on iOS
        //     borderBottomWidth: 2, // Just in case.
        //     backgroundColor: 'white'
        // },
        tabBarStyle: {
          height: 60,
          paddingTop: 10,
          paddingBottom: 10,
          position: 'absolute',
          borderTopWidth: 0,
        },
        tabBarBackground: () => (
          <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#30303C', '#00001A']}
            style={{flex: 1}}
          />
        ),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '900',
          paddingTop: 1,
        },
      })}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          ...TransitionPresets.SlideFromRightIOS,
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                tintColor: focused ? color.active_tab : color.inactive_tab,
                height: Scale(18),
                width: Scale(18),
              }}
              source={require('../images/ic_home.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="EventScreen"
        component={EventScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Event',
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                tintColor: focused ? color.active_tab : color.inactive_tab,
                height: Scale(20),
                width: Scale(20),
              }}
              source={require('../images/ic_event.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="BookScreen"
        component={BookScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Book',
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                tintColor: focused ? color.active_tab : color.inactive_tab,
                height: Scale(20),
                width: Scale(20),
              }}
              source={require('../images/ic_book.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ActivityScreen"
        component={ActivityScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Activities',
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                tintColor: focused ? color.active_tab : color.inactive_tab,
                height: Scale(20),
                width: Scale(20),
              }}
              source={require('../images/ic_activity.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Chat',
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                tintColor: focused ? color.active_tab : color.inactive_tab,
                height: Scale(20),
                width: Scale(20),
              }}
              source={require('../images/ic_chat.png')}
            />
          ),
        }}
      />

      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  </SafeAreaView>
);
const TabNavigatorAdmin = () => (
  <SafeAreaView style={{flex: 1, backgroundColor: color.bgcolor}}>
    <Tab.Navigator
      screenOptions={({route}) => ({
        // tabBarBadge: 1,
        // tabBarActiveBackgroundColor: "white",
        headerShown: false,
        // unmountOnBlur: true,
        tabBarActiveTintColor: color.active_tab,
        tabBarInactiveTintColor: color.inactive_tab,
        // headerStyle: {
        //     elevation: 10, // remove shadow on Android
        //     shadowOpacity: 10, // remove shadow on iOS
        //     borderBottomWidth: 2, // Just in case.
        //     backgroundColor: 'white'
        // },
        tabBarStyle: {
          height: 60,
          paddingTop: 10,
          paddingBottom: 10,
          position: 'absolute',
          borderTopWidth: 0,
        },
        tabBarBackground: () => (
          <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#30303C', '#00001A']}
            style={{flex: 1}}
          />
        ),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '900',
          paddingTop: 1,
        },
      })}>
      <Tab.Screen
        name="HomeAdminScreen"
        component={HomeAdminScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          ...TransitionPresets.SlideFromRightIOS,
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                tintColor: focused ? color.active_tab : color.inactive_tab,
                height: Scale(18),
                width: Scale(18),
              }}
              source={require('../images/ic_home.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="BookListScreen"
        component={BookListScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Booking List',
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                tintColor: focused ? color.active_tab : color.inactive_tab,
                height: Scale(20),
                width: Scale(20),
              }}
              source={require('../images/ic_event.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MemberlistScreen"
        component={MemberlistScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Members',
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                tintColor: focused ? color.active_tab : color.inactive_tab,
                height: Scale(20),
                width: Scale(20),
              }}
              source={require('../images/ic_book.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SubscriptionScreen"
        component={SubscriptionScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Subscription',
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                tintColor: focused ? color.active_tab : color.inactive_tab,
                height: Scale(20),
                width: Scale(20),
              }}
              source={require('../images/ic_activity.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AnnouncementScreenAdmin"
        component={AnnouncementScreenAdmin}
        options={{
          headerShown: false,
          tabBarLabel: 'Announcement',
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                tintColor: focused ? color.active_tab : color.inactive_tab,
                height: Scale(20),
                width: Scale(20),
              }}
              source={require('../images/ic_speaker.png')}
            />
          ),
        }}
      />

      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  </SafeAreaView>
);
const AppNavigator = () => (
  <NavigationContainer>
    {/* <Drawer.Navigator drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen name="Main" component={TabNavigator}    options={{ headerShown: false }}
 />
    </Drawer.Navigator> */}
    <StatusBar backgroundColor={color.bgcolor} barStyle={'light-content'} />

    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="VerifyOtpScreen"
        component={VerifyOtpScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="FamilyMemberScreen"
        component={FamilyMemberScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="AnnouncementScreen"
        component={AnnouncementScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="TermsConditionScreen"
        component={TermsConditionScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="RefundPolicyScreen"
        component={RefundPolicyScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="ContactusScreen"
        component={ContactusScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="HelpScreen"
        component={HelpScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="FAQScreen"
        component={FAQScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="FriendRequestScreen"
        component={FriendRequestScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="EventDetailScreen"
        component={EventDetailScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="InviteFriendScreen"
        component={InviteFriendScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="EditBookScreen"
        component={EditBookScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
        <Stack.Screen name="webview" component={WebView}         options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
 />
            <Stack.Screen name="custommessage" component={Custommessage} options={{ gestureEnabled: false }}/>
             <Stack.Screen name="payresponse" component={Payresponse}    options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}} />
      
      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="DrawerNavigatorAdmin"
        component={DrawerNavigatorAdmin}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="ClubDetailScreen"
        component={ClubDetailScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="SlotsScreen"
        component={SlotsScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="MemberSelection"
        component={MemberSelection}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="ChatDetailScreen"
        component={ChatDetailScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="ClubViewScreen"
        component={ClubViewScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      {/* <Stack.Screen
        name="BookListScreen"
        component={BookListScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      /> */}
      <Stack.Screen
        name="ActivityBookingScreen"
        component={ActivityBookingScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="EditBookAdminScreen"
        component={EditBookAdminScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="ViewBookingScreen"
        component={ViewBookingScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="AddSubscriptionScreen"
        component={AddSubscriptionScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="NotificationListAdmin"
        component={NotificationListScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="ProfileAdmin"
        component={ProfileAdminScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="ActivityBookingsList"
        component={ActivityBookingsList}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      <Stack.Screen
        name="EventBookingsList"
        component={EventBookingsList}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
const DrawerNavigator = () => {
  const [username, setusername] = useState('');
  const [userprofile, setuserprofile] = useState('');

  (async () => {
    const user = await getdata('userdetails');
    // console.log("dasdasdasdsa",user)
    const username = user.first_name + ' ' + user.last_name;
    const userprofile = user.profile_pic;
    setuserprofile(userprofile);
    setusername(username);
  })();
  return (
    <Drawer.Navigator
      initialRouteName="CustomSideMenu"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => (
        <CustomSidebarMenu
          data={{
            name: username,
            profile_pic: userprofile,
          }}
          {...props}
        />
      )}>
      <Drawer.Screen
        name="Main"
        component={TabNavigator}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};
const DrawerNavigatorAdmin = () => {
  const [username, setusername] = useState('');
  const [userprofile, setuserprofile] = useState('');

  (async () => {
    const user = await getdata('userdetails');
    console.log('user => ', user);
    const username = user.first_name + ' ' + user.last_name;
    const userprofile = user.profile_pic;
    setuserprofile(userprofile);
    setusername(username);
  })();
  return (
    <Drawer.Navigator
      initialRouteName="CustomSidebarMenuAdmin"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => (
        <CustomSidebarMenuAdmin
          data={{
            name: username,
            profile_pic: userprofile,
          }}
          {...props}
        />
      )}>
      <Drawer.Screen
        name="Main"
        component={TabNavigatorAdmin}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};
export default AppNavigator;
