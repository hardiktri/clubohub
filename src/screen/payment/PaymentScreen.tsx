import * as React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import color from '../../globalServices/color';

import Scale from '../../globalServices/Scale';
import PaymentScreenController from './PaymentScreenController';
import {CustomHeader} from '../../components/CustomHeader';
import GlobalStyle from '../../globalServices/globalStyle';
import {BackgroundImage} from '../../components/BackgroundImage';
import {getTime, getTimeHrs, getdate} from '../../globalServices/utils';
import LinearGradient from 'react-native-linear-gradient';

export default class PaymentScreen extends PaymentScreenController {
  constructor(props: Props) {
    super(props);
  }
  PopupModal = () => {
    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={this.state.cancelbookingmodel}
        onRequestClose={() => {}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: color.bgcolor,
              height: '25%',
              width: '92%',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: color.yellow,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'center',
              }}>
              <Image
                style={{height: Scale(50), width: Scale(50)}}
                source={require('../../images/ic_accept.png')}
              />
            </View>
            <Text
              style={[
                styles.text_color,
                {
                  fontSize: Scale(20),
                  fontWeight: '700',
                  marginTop: Scale(15),
                  textAlign: 'center',
                },
              ]}>
              Booking Confirmed
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: Scale(15),
                padding: Scale(10),
                marginBottom: Scale(25),
                width: '35%',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({cancelbookingmodel: false}),
                    this.props.navigation.navigate('BookScreen');
                }}
                style={[
                  GlobalStyle.buttonStyle,
                  {
                    flex: 1,
                    backgroundColor: color.bgcolor,
                    borderWidth: 1,
                    borderColor: color.yellow,
                  },
                ]}>
                <Text style={{color: 'white'}}>Okay!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <BackgroundImage>
        <CustomHeader
          title="Payment"
          onBackPress={() => this.props.navigation.goBack()}
        />
        <View
          style={[
            styles.container,
            {opacity: this.state.cancelbookingmodel ? 0.1 : 1},
          ]}>
          <View style={{flex: 1}}>
            <LinearGradient
              colors={['#B78428', '#252525']}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 0}}
              style={[
                GlobalStyle.grediant,
                {flexDirection: 'row', height: 'auto'},
              ]}>
              <View
                style={[GlobalStyle.bordercontainer, {flexDirection: 'row'}]}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    resizeMode="contain"
                    source={{
                      uri: this.state.paymentDetails.icon,
                    }}
                    style={styles.avatar}
                  />
                </View>
                <View style={{flex: 3, margin: Scale(10)}}>
                  <Text style={[styles.titleText18Size]}>
                    {this.state.paymentDetails.name}
                  </Text>
                  <Text
                    style={[
                      styles.titleTextSmall,
                      {marginTop: Scale(10), marginBottom: Scale(10)},
                    ]}>
                    {getdate(this.state.paymentDetails.slot_datetime)} |{' '}
                    {getTimeHrs(this.state.paymentDetails.start_date_time)}
                    {' - '}
                    {getTimeHrs(this.state.paymentDetails.end_date_time)}
                  </Text>
                  <Text style={[styles.titleTextSmall]}>
                    {this.state.paymentDetails.total_person} Members
                  </Text>
                </View>
              </View>
            </LinearGradient>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: Scale(10),
                marginTop: Scale(20),
              }}>
              <Text style={[styles.titleText18Size]}>
                Member Price
                <Text style={[styles.titleTextSmall]}>
                  {' '}
                  ({this.state.paymentDetails.total_member} Members)
                </Text>
              </Text>
              <Text style={[styles.titleText18Size]}>
                {this.state.paymentDetails.total_member_amount}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: Scale(10),
                marginTop: Scale(0),
              }}>
              <Text style={[styles.titleText18Size]}>
                Guest Price
                <Text style={[styles.titleTextSmall]}>
                  {' '}
                  ({this.state.paymentDetails.total_guest} Members)
                </Text>
              </Text>
              <Text style={[styles.titleText18Size]}>
                {this.state.paymentDetails.total_guest_amount}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: Scale(10),
                marginTop: Scale(15),
              }}>
              <Text style={[styles.titleText18Size]}>Total Amount</Text>
              <Text style={[styles.titleText18Size]}>
                {this.state.paymentDetails.total_amount}
              </Text>
            </View>
          </View>
          <View style={{marginTop: 'auto'}}>
            <TouchableOpacity
              onPress={() => this.onPay()}
              style={[
                GlobalStyle.buttonStyle,
                {
                  backgroundColor:
                    this.state.slotIndex !== -1 ? '#B78428' : 'grey',
                },
              ]}>
              <Text style={GlobalStyle.btntext}>
                Pay {this.state.paymentDetails.total_amount}
              </Text>
            </TouchableOpacity>
          </View>
          {this.PopupModal()}
        </View>
      </BackgroundImage>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Scale(12),
    flex: 1,
  },
  text_color: {
    color: color.white,
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
    margin: Scale(15),
    fontSize: Scale(25),
    fontWeight: '600',
  },
  titleText18Size: {
    color: 'white',
    fontSize: Scale(18),
    fontWeight: '700',
  },
  titleTextSmall: {
    color: 'white',
    fontSize: Scale(14),
    fontWeight: '300',
  },
  nameText: {
    color: 'white',
    fontSize: Scale(14),
  },
  mainImage: {
    marginTop: Scale(10),
    height: 180,
    borderRadius: Scale(15),
  },
  bookStyle: {
    flexDirection: 'row',
    marginTop: Scale(20),
    alignItems: 'center',
  },
  selectClubBtn: {
    flex: 1.5,
    backgroundColor: color.btncolor,
    padding: Scale(10),
    borderRadius: Scale(10),
  },
  dateStyle: {
    marginTop: Scale(10),
    marginLeft: 'auto',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: color.bgcolor,
    width: '13%',
    padding: Scale(5),
    height: 'auto',
  },
  avatar: {
    width: Scale(60),
    height: Scale(60),
    // borderRadius: 15,
    // borderWidth: Scale(1),
    // borderColor: color.yellow,
  },
});
