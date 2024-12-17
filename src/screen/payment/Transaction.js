import React, {useRef}  from 'react';
import { View,ScrollView, Button, TextInput,Text, StyleSheet, NativeModules, TouchableOpacity  } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { sha256 } from 'js-sha256';
import axios, {isCancel, AxiosError} from 'axios';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { EncryData} from './helper';
const customData = require('./config.json');

class Transaction extends React.Component {

  constructor(props) {
    super(props);
    this.btnref = React.createRef();
    this.conf = {
      'username': customData.username, // Username
      'password': customData.password, // Password
      'secret': customData.secret, // API key
      'mercid': customData.mercid //Merchant ID
    };
    this.state = {
      formStatus : true,
      buyerEmail: 'test@gmail.com',
      buyerPhone: '9898989800',
      buyerFirstName:'test',
      buyerLastName:'use1',
      buyerAddress:'',
      buyerCity:'',
      buyerState:'',
      buyerCountry:'',
      buyerPincode:'',
      orderid:'1001ORDER',
      amount:'1.00',
      customvar:'',
      chmod:'',
      wallet:'',
      upi_intent : 'Y',
      currency:'356',
      isocurrency:'INR',
      success_url: customData.success_url,
      errors:{}
};
  }
  _onFocus = () => {
    
    NativeModules.HideKeyboardExample.hideSoftKeyBoard();
  }
  getErrorMessages(){
    return this.err;
  }

  
 handleValidation()
 {

    const { buyerEmail,  buyerPhone,buyerFirstName,buyerLastName,buyerAddress,buyerCity,buyerState,buyerCountry,buyerPincode,orderid,amount,customvar,chmod,
        wallet, upi_intent, currency,isocurrency, formStatus} = this.state;
        let ferrors = {};
        let formIsValid = true;
        if (!buyerEmail || buyerEmail.trim().length === 0) {
              formIsValid = false;
              ferrors["buyerEmail"] = "Email Cannot be empty";
            }
        if (buyerEmail.trim().length !== 0) {
              let lastAtPos = buyerEmail.lastIndexOf("@");
              let lastDotPos = buyerEmail.lastIndexOf(".");

              if (
                !(
                  lastAtPos < lastDotPos &&
                  lastAtPos > 0 &&
                  buyerEmail.indexOf("@@") == -1 &&
                  lastDotPos > 2 &&
                  buyerEmail.length - lastDotPos > 2
                )
              ) {
                formIsValid = false;
                ferrors["buyerEmail"] = "Email is not valid";
              }
            }

            //firstName
                if (!buyerFirstName || buyerFirstName.trim().length === 0) {
                  formIsValid = false;
                  ferrors["buyerFirstName"] = "Cannot be empty";
                }

                if ( buyerFirstName.trim().length !== 0) {
                  if (!buyerFirstName.match(/^[a-zA-Z]+$/)) {
                    formIsValid = false;
                    ferrors["buyerFirstName"] = "Only letters";
                  }
                }
                //lastName
                if (!buyerLastName || buyerLastName.trim().length === 0) {
                  formIsValid = false;
                  ferrors["buyerLastName"] = "Last name cannot be empty";
                }

                if (buyerLastName.trim().length !== 0) {
                  if (!buyerLastName.match(/^[a-zA-Z]+$/)) {
                    formIsValid = false;
                    ferrors["buyerLastName"] = "Only letters";
                  }
                }

                 //phone
                if (!buyerPhone || buyerPhone.trim().length === 0) {
                  formIsValid = false;
                  ferrors["buyerPhone"] = "Mobile number cannot be empty";
                }

                if (buyerPhone.trim().length !== 0) {
                  if (!buyerPhone.match(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/)) {
                    formIsValid = false;
                    ferrors["buyerPhone"] = "Invalid mobile number";
                  }
                }
                //orderid
                if (!orderid || orderid.trim().length === 0) {
                  formIsValid = false;
                  ferrors["orderid"] = "Order id cannot be empty";
                }

                if ( orderid.trim().length !== 0) {
                  if (!orderid.match(/^[a-zA-Z0-9_]*$/)) {
                    formIsValid = false;
                    ferrors["orderid"] = "Invalid order id";
                  }
                }

                //amount
                if (!amount || amount.trim().length === 0) {
                  formIsValid = false;
                  ferrors["amount"] = "Amount cannot be empty";
                }

                if (amount.trim().length !== 0) {
                  if (!amount.match(/^(\d{1,6})(\.\d{2})$/)) {
                    formIsValid = false;
                    ferrors["amount"] = "Invalid Amount";
                  }
                }

                if (buyerAddress.trim().length !== 0) {
                  if (!buyerAddress.match(/^[A-Za-z0-9 ]+$/)) {
                    formIsValid = false;
                    ferrors["buyerAddress"] = "Invalid Address";
                  }
                }
                 if (buyerCity.trim().length !== 0) {
                  if (!buyerCity.match(/^[A-Za-z0-9 ]+$/)) {
                    formIsValid = false;
                    ferrors["buyerCity"] = "Invalid City";
                  }
                }
                 if ( buyerState.trim().length !== 0) {
                  if (!buyerState.match(/^[A-Za-z0-9 ]+$/)) {
                    formIsValid = false;
                    ferrors["buyerState"] = "Invalid state";
                  }
                }
                if ( buyerCountry.trim().length !== 0) {
                  if (!buyerCountry.match(/^[A-Za-z0-9 ]+$/)) {
                    formIsValid = false;
                    ferrors["buyerCountry"] = "Invalid country";
                  }
                }
                 if (buyerPincode.trim().length !== 0) {
                  if (!buyerPincode.match(/^[1-9][0-9]{5}$/)) {
                    formIsValid = false;
                    ferrors["buyerPincode"] = "Invalid pincode";
                  }
                }
                 if (customvar.trim().length !== 0) {
                  if (!customvar.match(/^[A-Za-z0-9 ]+$/)) {
                    formIsValid = false;
                    ferrors["customvar"] = "Invalid custom variable";
                  }
                }
                 if (chmod.trim().length !== 0) {
                  if (!chmod.match(/^[A-Za-z0-9 ]+$/)) {
                    formIsValid = false;
                    ferrors["chmod"] = "Invalid mode";
                  }
                }
                 if (wallet.trim().length !== 0) {
                  if (!wallet.match(/^[A-Za-z0-9 ]+$/)) {
                    formIsValid = false;
                    ferrors["wallet"] = "Invalid transactio wallet";
                  }
                }


                 //currency
                if (!currency || currency.trim().length === 0) {
                  formIsValid = false;
                  ferrors["currency"] = "Currency cannot be empty";
                }

                if (currency.trim().length !== 0) {
                  if (!currency.match(/^[A-Za-z0-9 ]+$/)) {
                    formIsValid = false;
                    ferrors["currency"] = "Invalid currency";
                  }
                }

                 //isocurrency
                if (!isocurrency || isocurrency.trim().length === 0) {
                  formIsValid = false;
                  ferrors["isocurrency"] = "Isocurrency cannot be empty";
                }

                if (isocurrency.trim().length !== 0) {
                  if (!isocurrency.match(/^[A-Za-z0-9 ]+$/)) {
                    formIsValid = false;
                    ferrors["isocurrency"] = "Invalid isocurrency";
                  }
                }
            this.setState({errors : ferrors})

            return formIsValid;
 }
 getHostName(u)
 {
  if((u!=''))
  {
    var regex = new RegExp('(https?://.*?\)/'); 
    var match = regex.exec(u)[1];
  
    return match;
  }
  else return '';
  
 }
  async  onPay()
  {
   
    let formData = new FormData();
    const { buyerEmail,  buyerPhone,buyerFirstName,buyerLastName,buyerAddress,buyerCity,buyerState,buyerCountry,buyerPincode,orderid,amount,customvar,chmod,
    wallet,upi_intent,currency,isocurrency, formStatus, success_url} = this.state;
//    if (this.handleValidation())
//    {
       let paramString = buyerEmail + buyerFirstName + buyerLastName + buyerAddress + buyerCity + buyerState + buyerCountry + amount + orderid;
        let date = new Date();
       
       
        let privateKey = await sha256(this.conf.secret + '@' + this.conf.username + ':|:' + this.conf.password);

        let alldata = '';
        alldata = paramString + date.toISOString().split('T')[0] + "";
       
        let key = await sha256(this.conf.username + "~:~" + this.conf.password);
        let checksum  = await sha256(key + "@" + alldata);
       
            const fdata = {
            'privatekey': privateKey,
            'buyerEmail': buyerEmail,
            'buyerPhone': buyerPhone,
            'buyerFirstName': buyerFirstName,
            'buyerLastName': buyerLastName,
            'buyerAddress': buyerAddress,
            'buyerCity': buyerCity,
            'buyerState': buyerState,
            'buyerCountry' :  buyerCountry,
            'buyerPinCode': buyerPincode,
            'orderid': orderid,
            'amount': amount,
            'customvar': customvar,
            'txnsubtype': '',
            'checksum': checksum,
            'mercid': this.conf.mercid,
            'currency':currency,
            'isocurrency':isocurrency,
            'chmod': chmod,
            'upi_intent': upi_intent,
            //'mer_dom' :  base64_encode('http://localhost'),
            'success_url': success_url!='' ? (success_url) : '',
            'mer_dom' : success_url!='' ? base64_encode(this.getHostName(success_url)):''
            
          };
        
        
            const params = fdata;
           
           
             this.props.navigation.navigate('webview',{params});
      // }



  }


     Stack = createStackNavigator();
    render() {
    const { errors } = this.state;
 
        return (
          //
          <View style={styles.container}>
        <ScrollView>
          <TextInput

            value={this.state.buyerEmail}
            onChangeText={(buyerEmail) => this.setState({ buyerEmail })}
            placeholder={'Buyer Email'}
            style={styles.input}
            name={'buyerEmail'}
          />
          {errors.buyerEmail ? <Text style={styles.error}>{errors.buyerEmail}</Text> : null }
          <TextInput
            value={this.state.buyerPhone}
            onChangeText={(buyerPhone) => this.setState({ buyerPhone })}
            placeholder={'Buyer Phone'}
            style={styles.input}
          />
          {errors.buyerPhone ? <Text style={styles.error}>{errors.buyerPhone}</Text> : null }
          <TextInput
            value={this.state.buyerFirstName}
            onChangeText={(buyerFirstName) => this.setState({ buyerFirstName })}
            placeholder={'Buyer First Name'}
            style={styles.input}
          />
          {errors.buyerFirstName ? <Text style={styles.error}>{errors.buyerFirstName}</Text> : null }
          <TextInput
            value={this.state.buyerLastName}
            onChangeText={(buyerLastName) => this.setState({ buyerLastName })}
            placeholder={'Buyer Last Name'}
            style={styles.input}
          />
          {errors.buyerLastName ? <Text style={styles.error}>{errors.buyerLastName}</Text> : null }
          <TextInput
            value={this.state.buyerAddress}
            onChangeText={(buyerAddress) => this.setState({ buyerAddress })}
            placeholder={'Buyer buyerAddress'}
            style={styles.input}
          />
          {errors.buyerLastName ? <Text style={styles.error}>{errors.buyerLastName}</Text> : null }

          <TextInput
            value={this.state.buyerCity}
            onChangeText={(buyerCity) => this.setState({ buyerCity })}
            placeholder={'Buyer City'}
            style={styles.input}
          />
          {errors.buyerCity ? <Text style={styles.error}>{errors.buyerCity}</Text> : null }

          <TextInput
            value={this.state.buyerState}
            onChangeText={(buyerState) => this.setState({ buyerState })}
            placeholder={'Buyer State'}
            style={styles.input}
          />
          {errors.buyerState ? <Text style={styles.error}>{errors.buyerState}</Text> : null }

          <TextInput
            value={this.state.buyerCountry}
            onChangeText={(buyerCountry) => this.setState({ buyerCountry })}
            placeholder={'Buyer Country'}
            style={styles.input}
          />
          {errors.buyerCountry ? <Text style={styles.error}>{errors.buyerCountry}</Text> : null }

          <TextInput
            value={this.state.buyerPincode}
            onChangeText={(buyerPincode) => this.setState({ buyerPincode })}
            placeholder={'Buyer Pincode'}

            style={styles.input}
          />
          {errors.buyerPincode ? <Text style={styles.error}>{errors.buyerPincode}</Text> : null }

           <TextInput
            value={this.state.orderid}
            onChangeText={(orderid) => this.setState({ orderid })}
            placeholder={'Order ID'}

            style={styles.input}
          />
          {errors.orderid ? <Text style={styles.error}>{errors.orderid}</Text> : null }
           <TextInput
            value={this.state.amount}
            onChangeText={(amount) => this.setState({ amount })}
            placeholder={'Amount'}

            style={styles.input}
          />
          {errors.amount ? <Text style={styles.error}>{errors.amount}</Text> : null }
          <TextInput
            value={this.state.customvar}
            onChangeText={(customvar) => this.setState({ customvar })}
            placeholder={'Custom Field 1'}

            style={styles.input}
          />
          {errors.customvar ? <Text style={styles.error}>{errors.customvar}</Text> : null }
          <TextInput
            value={this.state.chmod}
            onChangeText={(chmod) => this.setState({ chmod })}
            placeholder={'Payment Mode'}

            style={styles.input}
          />
          {errors.chmod ? <Text style={styles.error}>{errors.chmod}</Text> : null }
          <TextInput
            value={this.state.wallet}
            onChangeText={(wallet) => this.setState({ wallet })}
            placeholder={'Transaction Wallet'}

            style={styles.input}
          />
          {errors.wallet ? <Text style={styles.error}>{errors.wallet}</Text> : null }
           <TextInput
            value={this.state.currency}
            onChangeText={(currency) => this.setState({ currency })}
            placeholder={'Currency'}

            style={styles.input}
          />
          {errors.currency ? <Text style={styles.error}>{errors.currency}</Text> : null }
           <TextInput
            value={this.state.isocurrency}
            onChangeText={(isocurrency) => this.setState({ isocurrency })}
            placeholder={'isoCurrency'}

            style={styles.input}
          />
          {errors.isocurrency ? <Text style={styles.error}>{errors.isocurrency}</Text> : null }
         
        <TouchableOpacity >
          <Button
            title={'Submit'}
            style={styles.input}
            onPress={this.onPay.bind(this)}
          />
          </TouchableOpacity>
          </ScrollView>
        </View>
        )
      }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
   
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  error : {
  color:'red'}
});
export default Transaction;



