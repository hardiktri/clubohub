import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Table,
  Row,
  Rows,
  BackHandler,
  ActivityIndicator,
  StatusBar,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {Link, useRoute, useNavigation} from '@react-navigation/native';
import {LOADERIMAGENAME} from './assets/Loading.gif';
import color from '../../globalServices/color';
import Scale from '../../globalServices/Scale';
import GlobalStyle from '../../globalServices/globalStyle';
import moment from 'moment';
import XMLParser from 'react-xml-parser';
import makeApiCall from '../../globalServices/api';
import { apiFunctions, getdata } from '../../globalServices/utils';
const md5 = require('md5');
const customData = require('./config.json');
export default function Payresponse({route}) {
  const [payRes, setPayRes] = useState([]);
  const [payParams, setPayParams] = useState(route.params); //
  const [tablData, setTable] = useState({});
  const [loader, setUpiLoader] = useState(true);
  const [errorMsg, seterrorMsg] = useState('');
  const [cancelbookingmodel, setcancelbookingmodel] = useState(false);
  const [failbookingmodel, setfailbookingmodel] = useState(false);
  const navigation = useNavigation();
  //get payment status
  const getPayStatus = async () => {
    /********checksum login***********/
    if(payParams.params.amount == 0) {
      makeBookingAPI(payParams.params.orderid,'Success',null);
    } else {
    let tDate = moment().format('DD/MM/YYYY HH:mm:ss');

    let subStr = tDate.substring(6);
    let oid = 'Orderasd11';
    //let checksum = payParams.params.privatekey + oid + payParams.params.mercid + subStr;
    let checksum =
      payParams.params.privatekey +
      payParams.params.orderid +
      payParams.params.mercid +
      subStr;
    let finalChecksum = md5(checksum);
    /********checksum login***********/
    const fdata = {
      privatekey: payParams.params.privatekey,
      orderid: payParams.params.orderid,
      mercid: payParams.params.mercid,
      checksum: finalChecksum,
      datetime: tDate,
    };

    var formBody = [];
    for (var property in fdata) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(fdata[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    await fetch('https://payments.airpay.co.in/sdk/a.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
      .then(response => {
        return response.text();
      })
      .then(xml => {
        var jsonDataFromXml = new XMLParser().parseFromString(xml);

        let vv = jsonDataFromXml.getElementsByTagName('RESPONSE');

        let responseXML = vv[0].children[0].getElementsByTagName('TRANSACTION');
        let childXML = responseXML[0].children;

        if (childXML) {
          var xmlBody = {};
          childXML.forEach(function (val) {
            if (val) {
              let v = val.value.replace(/>/g, '');
              xmlBody[val.name] = v.trim();
            }
          });
          if (xmlBody.STATUSMSG == 'Success') {
            makeBookingAPI(xmlBody.MERCHANTTRANSACTIONID,xmlBody.STATUSMSG,xmlBody)
          }
          else
          {
            makeBookingAPI(xmlBody.MERCHANTTRANSACTIONID,xmlBody.STATUSMSG,xmlBody)
          }
          //  setPayRes(xmlBody);
        }
      })
      .catch(error => {
        console.error(error);
      });
      }
  };

  const crc32 = str => {
    let crc = 0xffffffff; // Initialize with all 1 bits
    const len = str.length;

    for (let i = 0; i < len; i++) {
      let charCode = str.charCodeAt(i);
      for (let j = 0; j < 8; j++) {
        if ((crc ^ charCode) & 1) {
          crc = (crc >>> 1) ^ 0xedb88320; // Magic XOR value
        } else {
          crc >>>= 1;
        }
        charCode >>>= 1;
      }
    }

    return (crc ^ 0xffffffff) >>> 0; // XOR with all 1 bits and make sure it's an unsigned integer
  };
  const handleBackButtonClick = () => {
    // navigation.goBack('transaction');
    //navigation.push('transaction');
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  useEffect(() => {
    if (payParams && payParams.params.TRANSACTIONSTATUS) {
      console.log("response::",payParams.params)
      setPayRes(payParams.params);
    } else {
      getPayStatus();
    }
  }, [payParams]);
  useEffect(() => {
    console.log('payRes', payRes);
    if (
      payRes &&
      payRes.MERCHANTTRANSACTIONID &&
      payRes.TRANSACTIONID &&
      payRes.AP_SECUREHASH
    ) {
      let TRANSACTIONID = payRes.MERCHANTTRANSACTIONID;
      let APTRANSACTIONID = payRes.TRANSACTIONID;
      let AMOUNT = payRes.TRANSACTIONAMT;
      let TRANSACTIONSTATUS = payRes.TRANSACTIONSTATUS;
      let MESSAGE = payRes.STATUSMSG;
      let MERCID = customData.mercid;
      let USERNAME = customData.username;
      let CHMOD = payRes.CHMOD;
      let CUSTOMERVPA = payRes.CUSTOMERVPA;
      let AP_SECUREHASH = payRes.AP_SECUREHASH
        ? payRes.AP_SECUREHASH
        : payRes.ap_SecureHash
        ? payRes.ap_SecureHash
        : '';
      let Hash_data =
        TRANSACTIONID +
        ':' +
        APTRANSACTIONID +
        ':' +
        AMOUNT +
        ':' +
        TRANSACTIONSTATUS +
        ':' +
        MESSAGE +
        ':' +
        MERCID +
        ':' +
        USERNAME;

      if (CHMOD === 'upi') {
        Hash_data = Hash_data + ':' + CUSTOMERVPA;
      }

      let merchant_secure_hash = crc32(Hash_data).toString();

      if (AP_SECUREHASH !== '' && merchant_secure_hash === AP_SECUREHASH) {
        seterrorMsg('');
      } else {
        seterrorMsg('Secure Hash mismatch found');
      }
    } else {
      console.log(payRes.STATUS);
      seterrorMsg('No transaction found');
    }
  }, [payRes]);

 const  makeBookingAPI = async (booking_id,status,xmlBody)=> {
    let data = new FormData();
    let userid = await getdata('id');
     let BANKNAME = '';
     let TRANSACTIONAMT = 0;
     let TRANSACTIONID = '';
    if(xmlBody){
     BANKNAME = xmlBody.BANKNAME;
     TRANSACTIONAMT = xmlBody.TRANSACTIONAMT;
     TRANSACTIONID = xmlBody.TRANSACTIONID;
    }else {
      let bookingamnt = 0;
    }
    data.append('booking_id', booking_id);
    data.append('bank_name', BANKNAME);
    data.append('transaction_amount', TRANSACTIONAMT);
    data.append('transaction_id', TRANSACTIONID);
    data.append('transaction_status', status);
    data.append('user_id', userid);
    data.append('event_activity_id',  payParams.params.activity_id);
    data.append('date', moment().format('YYYY-MM-DD'));
    data.append('type',  payParams.params.type);

    console.log("data:::",data)
    let endpoint = apiFunctions.makeBooking;
    const responseData = await makeApiCall(endpoint, 'POST', data);
      console.log("APIres::",responseData)
    if (responseData.status == 'success') {
      if(status=='Success')
      {
        setcancelbookingmodel(true);
      }
      else
      {
        setcancelbookingmodel(true);
      }

    } else if(bookingamnt == 0) {
      
      setcancelbookingmodel(true);
    } else {
      setfailbookingmodel(true)
    }
  }
  const PopupModal = () => {
    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={cancelbookingmodel}
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
                  color:'white',

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
                  setcancelbookingmodel(false),
                    navigation.navigate('BookScreen');
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
  const failmodel = () => {
    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={failbookingmodel}
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
                source={require('../../images/ic_cancel.png')}
              />
            </View>
            <Text
              style={[
                styles.text_color,
                {
                  fontSize: Scale(20),
                  fontWeight: '700',
                  marginTop: Scale(15),
                  color:'white',
                  textAlign: 'center',
                },
              ]}>
              Transaction Cancelled
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
                  setfailbookingmodel(false),
                    navigation.navigate('BookScreen');
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
  return (
    <View style={styles.container}>
      {/* <Text style={styles.headingText}>Payment Response</Text>
      {
        // (payRes && payRes.MERCHANTTRANSACTIONID && payRes.TRANSACTIONID)
        payRes && payRes.STATUS ? (
          errorMsg === '' ? (
            <>
              <Text>TRANSACTIONID : {payRes.MERCHANTTRANSACTIONID}</Text>
              <Text>APTRANSACTIONID : {payRes.TRANSACTIONID}</Text>
              <Text>AMOUNT : {payRes.TRANSACTIONAMT}</Text>
              <Text>MESSAGE : {payRes.STATUSMSG}</Text>
              <Text>CUSTOMVAR : {payRes.CUSTOMVAR}</Text>
            </>
          ) : (
            <>
              <Text>Error : {errorMsg}</Text>
            </>
          )
        ) : (
          <Text>
            <ActivityIndicator size="large" />
          </Text>
        )
      } */}
      <StatusBar style="auto" />
      {/* <Link style={styles.underLineText} to={{screen: 'transaction'}}>
        Go to transaction
      </Link> */}
      {PopupModal()}
      {failmodel()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bgcolor,
    opacity:0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 10,
  },
  headingText: {
    top: '10%',
    position: 'absolute',
  },
  underLineText: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
