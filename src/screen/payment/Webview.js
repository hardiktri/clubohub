import React, {Component, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import color from '../../globalServices/color';
import Scale from '../../globalServices/Scale';
import GlobalStyle from '../../globalServices/globalStyle';
import XMLParser from 'react-xml-parser';
const md5 = require('md5');
import moment from 'moment';

// const BackButton = ({navigation})=>{
// <TouchableOpacity onPress={()=>{navigation.goBack()}}>
//     <Text>Back</Text>
// </TouchableOpacity>
// }
const getParas = url => {
  var regexp = /[?&]([^=#]+)=([^&#]*)/g,
    params = {},
    check;

  while ((check = regexp.exec(url))) {
    params[check[1]] = check[2];
  }
  let qstr = params.data;
  let decodedVal = base64_decode(qstr);
  return JSON.parse(decodedVal);
};
const setFormContent = (fdata, postUrl) => {
  const content = `
<html>
  <body>
  

    <form id="myForm" method="post" action="${postUrl}">
    <input type="hidden" name="privatekey" value="${fdata.privatekey}">
    <input type="hidden" name="mercid" value="${fdata.mercid}">
    <input type="hidden" name="chmod" value="${fdata.chmod}">					
    <input type="hidden" name="buyerEmail" value="${fdata.buyerEmail}">
    <input type="hidden" name="buyerPhone" value="${fdata.buyerPhone}">
    <input type="hidden" name="buyerFirstName" value="${fdata.buyerFirstName}">
    <input type="hidden" name="buyerLastName" value="${fdata.buyerLastName}">
    <input type="hidden" name="buyerAddress" value="${fdata.buyerAddress}">
    <input type="hidden" name="buyerCity" value="${fdata.buyerCity}">
    <input type="hidden" name="buyerState" value="${fdata.buyerState}">
    <input type="hidden" name="buyerCountry" value="${fdata.buyerCountry}">
    <input type="hidden" name="buyerPinCode" value="${fdata.buyerPinCode}">
    <input type="hidden" name="orderid" value="${fdata.orderid}">
    <input type="hidden" name="amount" value="${fdata.amount}">
    <input type="hidden" name="customvar" value="${fdata.customvar}">
    <input type="hidden" name="currency" value="${fdata.currency}">
    <input type="hidden" name="isocurrency" value="${fdata.isocurrency}">
    <input type="hidden" name="txnsubtype" value="${fdata.txnsubtype}">
    <input type="hidden" name="upi_intent" value="${fdata.upi_intent}">
    <input type="hidden" name="checksum" value="${fdata.checksum}">
    <input type="hidden" name="arpyVer" value="3">
    <input type="hidden" name="mer_dom" value="${fdata.mer_dom}">
    </form>
    <div>
    <table width="100%" style="top:50%">
      <tr>
        <td align="center" valign="middle" style="font-size:20px">Do Not Refresh or Press Back <br/> Redirecting to Airpay</td>
      </tr>
    </table>
  </center>
    <script>
      document.getElementById("myForm").submit();
    </script>
  </body>
</html>
`;
  console.log(content);
  return content;
};
const injectJavaScript = `
    (function() {

    })()`;
export default function Webview({route}) {
  const navigation = useNavigation();
  const webViewRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [cancelbookingmodel, setcancelbookingmodel] = useState(false);
  const [webUrl, setWebUrl] = useState(route.params.url);
  const [upiparams, setParams] = useState(route.params.params);
  const [htmlContent, setHtmlContent] = useState(
    setFormContent(
      route.params.params,
      'https://payments.airpay.co.in/pay/index.php',
    ),
  );

  const closeWebView = () => {
    if (webViewRef.current) {
      webViewRef.current.stopLoading(); // Stop loading any ongoing requests
      webViewRef.current.injectJavaScript('window.close()'); // Execute JavaScript to close the WebView
    }
  };
  const isJsonString = str => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const handleWebViewMessage = event => {
    console.log('current event1111', event);
    const resDataJson = event.nativeEvent.data;
    //if(event.nativeEvent.data=='close the webview')

    if (event.nativeEvent.data == 'close the webview') {
      // navigation.navigate('transaction');
      setShowModal(true);

    }
    // else
    // {
    //     const  params = upiparams;
    //     const data = JSON.parse(event.nativeEvent.data);
    //       if (data.type === 'upi_intent')
    //       {
    //            navigation.navigate(data.link,{params});
    //       }

    // }
  };

  const handleWebNavigation = event => {
    console.log('current event', event);
    let dec_success_url = decodeURIComponent(upiparams.success_url);
    var regex = new RegExp('(https?://.*?)/');
    var hostname = regex.exec(dec_success_url)[1]; // getting the hostname from success url.
    console.log('current url', event.url);
    if (event.url == 'about:blank') return true;
    else if (event.url.includes('payments.airpay.co.in/pay/index.php')) {
      if (
        (event.url.includes('payments.airpay.co.in/pay/index.php') ||
          event.url.includes('#tab-UPI')) &&
        upiparams.chmod == 'upi'
      ) {
        let params = {
          privatekey: upiparams.privatekey,
          orderid: upiparams.orderid,
          mercid: upiparams.mercid,
          activity_id: upiparams.activity_id,
          type: upiparams.type,
          chmod : 'upi'
        };
        navigation.navigate("payresponse", {params});
      } else return true;
    } 
    
    else {
      console.log('else current url', event.url);
              
      if (event.url.includes('payments.airpay.co.in/pay/v2/cancelTxn.php')) {
      
            webViewRef.current.stopLoading();
            // getPayStatus();
            setShowModal(true);

          //  navigation.navigate("payresponse", {params});
         return;
      } else {
        if (event.url.includes('sandbox/simulator')) return true;
        else if (upiparams.success_url != '' && event.url.includes(hostname)) {
          console.log('resp');
          webViewRef.current.stopLoading();
          let params = {
            privatekey: upiparams.privatekey,
            orderid: upiparams.orderid,
            mercid: upiparams.mercid,
            activity_id: upiparams.activity_id,
            type: upiparams.type,

          };
          // getPayStatus(upiparams.privatekey,upiparams.orderid,upiparams.mercid);
          // if (upiparams.TRANSACTIONREASON == 'Success') {
          //   setcancelbookingmodel(true);
          // }

          navigation.navigate("payresponse", {params});
        }
        //                       else return true;
      }
    }
  };
  const getPayStatus = async () => {
    /********checksum login***********/
    let tDate = moment().format('DD/MM/YYYY HH:mm:ss');

    let subStr = tDate.substring(6);
    let oid = 'Orderasd11';
    //let checksum = payParams.params.privatekey + oid + payParams.params.mercid + subStr;
    let checksum =
    upiparams.privatekey +
    upiparams.orderid +
    upiparams.mercid +
      subStr;
    let finalChecksum = md5(checksum);
    /********checksum login***********/
    const fdata = {
      privatekey: upiparams.privatekey,
      orderid: upiparams.orderid,
      mercid: upiparams.mercid,
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
            makeBookingAPI(xmlBody.MERCHANTTRANSACTIONID)
          }
          else
          {
            setShowModal(true);          }
        }
      })
      .catch(error => {
        console.error(error);
      });
  };


  const PopupModal = () => {
    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={showModal}
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
  return (
    <SafeAreaView style={styles.viewWrapper}>
      <WebView
        ref={webViewRef}
        style={styles.webviewStyle}
        source={{html: htmlContent}}
        onNavigationStateChange={event => handleWebNavigation(event)}
        onMessage={event => handleWebViewMessage(event)}
        injectedJavaScript={injectJavaScript}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
      {PopupModal()}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    height: '90%',
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  viewWrapper: {
    height: '100%',
  },

  webviewStyle: {
    width: '100%',

    flex: 1,
  },
});
