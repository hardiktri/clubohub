import { Component } from 'react';
import { apiFunctions, getdata } from '../../globalServices/utils';
import makeApiCall from '../../globalServices/api';
const customData = require('./config.json');
import { sha256 } from 'js-sha256';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
export interface Props {
  navigation?: any;
  id?: string;
}

interface S {
  isLoading: boolean;
  needRetakeToken: boolean;
  token: string;
  totalCount: number;
  totalPage: number;
  pageIndex: number;
  moreLoading: boolean;
  paymentDetails: any;
  cancelbookingmodel: boolean;
  propsData: any;
  bookingId: number;
  selectedClubDetails: any;
}

interface SS {
  id: any;
}

export default class PaymentScreenController extends Component<Props, S, SS> {
  conf: {
    username: any; // Username
    password: any; // Password
    secret: any; // API key
    mercid: any; //Merchant ID
  };
  constructor(props: Props) {
    super(props);
    const { data } = this.props.route.params;
    console.log('Received data:::---> ', data);

    // Making the payment vals dynamic below
    this.conf = {
      'username': customData.username, // Username
      'password': customData.password, // Password
      'secret': customData.secret, // API key
      'mercid': customData.mercid //Merchant ID
    };

    this.state = {
      isLoading: false,
      needRetakeToken: true,
      cancelbookingmodel: false,
      token: '',
      pageIndex: 1,
      totalCount: 1,
      totalPage: 1,
      moreLoading: false,
      paymentDetails: [],
      propsData: data,
      bookingId: 0,
      selectedClubDetails: {}
    };
  }
  async componentDidMount() {
    this.getPaymentDetails();
    this.fetchSelectedClubDetails();
  }

  fetchSelectedClubDetails = async () => {
    try {
      let endpoint = `clubs/${this.state.propsData?.selectedClubId}`;
      const responseData = await makeApiCall(endpoint, 'GET', null);
      console.log("fetchSelectedClubDetails responseData <<<<<<<<<", responseData);
      if (responseData.status == 'success') {
        this.setState({ selectedClubDetails: responseData.data });
      } else {
        console.log("Unable to fetch selected club details <<<<<<<<<");
        this.props.navigation.navigate('SlotsScreen', {
          // activityDetail: item,
          // selectedClubId: this.state.selectedClubDetails.id, // Pass the selected club ID
        })
      }
    } catch (err: unknown) {
      console.error("fetchSelectedClubDetails error <<<<<<<<<", err);
    }

  }

  getPaymentDetails = async () => {
    let userid = await getdata('id');
    const user = await getdata('userdetails');
    const propsData = this.state.propsData;
    console.log("propsData <<<")
    console.log(propsData)
    let data = new FormData();
    data.append('user_id', userid);
    data.append('activity_id', propsData.activity_id);
    data.append('type', propsData.type);
    if (propsData.members_ids !== '') {
      data.append('members_ids', userid + ',' + propsData.members_ids);
    } else {
      data.append('members_ids', userid);
    }
    if (propsData.members_names !== '') {
      data.append(
        'members_names',
        user.first_name + ',' + propsData.members_names,
      );
    } else {
      data.append('members_names', user.first_name);
    }
    data.append('guest_names', propsData.guest_names);
    data.append('court_id', propsData.courtIndex);
    data.append('slot_id', propsData.slotIndex);
    data.append('date', propsData.todayDate);
    let endpoint = apiFunctions.getpaymentdetails;
    const responseData = await makeApiCall(endpoint, 'POST', data);
    console.log('responseData:::--->', responseData.data);
    if (responseData.status == 'success') {
      let res = responseData.data;
      this.setState({
        paymentDetails: res,
        bookingId: res.id,
      });
    } else {
    }
  };

  onPay = async () => {
    try {
      await this.fetchSelectedClubDetails();
      var amount = this.state.paymentDetails.total_amount;
      var orderid = this.state.bookingId
      if (amount == 0) {
        let params = {
          privatekey: '',
          orderid: orderid,
          mercid: '',
          amount: 0,
          activity_id: this.state.propsData.activity_id,
          type: this.state.propsData.type
        };
        this.props.navigation.navigate("payresponse", { params });
      } else {

        //     let formData = new FormData();
        //     const { buyerEmail,  buyerPhone,buyerFirstName,buyerLastName,buyerAddress,buyerCity,buyerState,buyerCountry,buyerPincode,orderid,amount,customvar,chmod,
        //     wallet,upi_intent,currency,isocurrency, formStatus, success_url} = this.state;
        // //    if (this.handleValidation())
        // //    {
        const user = await getdata('userdetails')

        const buyerEmail = user.email;
        const buyerFirstName = user.first_name;
        const buyerLastName = user.last_name;
        const buyerPhone = user.mobile_no;
        var amount = this.state.paymentDetails.total_amount;
        var orderid = this.state.bookingId
        var success_url = customData.success_url
        let paramString = buyerEmail + buyerFirstName + buyerLastName + amount + orderid;
        let date = new Date();


        let privateKey = await sha256(this.state.selectedClubDetails?.api_key + '@' + this.state.selectedClubDetails?.user_name + ':|:' + this.state.selectedClubDetails?.password);

        let alldata = '';
        alldata = paramString + date.toISOString().split('T')[0] + "";

        let key = await sha256(this.state.selectedClubDetails?.user_name + "~:~" + this.state.selectedClubDetails?.password);
        let checksum = await sha256(key + "@" + alldata);

        const fdata = {
          'privatekey': privateKey,
          'buyerEmail': buyerEmail,
          'buyerPhone': buyerPhone,
          'buyerFirstName': buyerFirstName,
          'buyerLastName': buyerLastName,
          'buyerAddress': '',
          'buyerCity': '',
          'buyerState': '',
          'buyerCountry': '',
          'buyerPinCode': '',
          'orderid': orderid,
          'amount': amount,
          'customvar': '',
          'txnsubtype': '',
          'checksum': checksum,
          'mercid': this.state.selectedClubDetails?.merchant_id,
          'currency': '356',
          'isocurrency': 'INR',
          'chmod': '',
          'upi_intent': "Y",
          //'mer_dom' :  base64_encode('http://localhost'),
          'success_url': success_url != '' ? (success_url) : '',
          'mer_dom': success_url != '' ? base64_encode(this.getHostName(success_url)) : '',
          'activity_id': this.state.propsData.activity_id,
          'type': this.state.propsData.type

        };


        const params = fdata;

        console.log("final pay params <<<<<<<", params)
        // console.log("params::",params)
        // const params={
        //   "amount": "1.00",
        //   "buyerAddress": "",
        //   "buyerCity": "",
        //   "buyerCountry": "",
        //   "buyerEmail": "test@gmail.com",
        //   "buyerFirstName": "test",
        //   "buyerLastName": "use1",
        //   "buyerPhone": "9898989800",
        //   "buyerPinCode": "",
        //   "buyerState": "",
        //   "checksum": "15eea784424a57fdaa3939a564a93ce7ebba3dd7a5e3c385ca2817e43711bf36",
        //   "chmod": "",
        //   "currency": "356",
        //   "customvar": "",
        //   "isocurrency": "INR",
        //   "mer_dom": "aHR0cDovL2xvY2FsaG9zdA==",
        //   "mercid": "270462",
        //   "orderid": "1001ORDER",
        //   "privatekey": "2e0f4112815d60f064a823c4272c8c590cc1139dbd87f28099034db3b7c81bdc",
        //   "success_url": "http://localhost/airpay_php/responsefromairpay.php",
        //   "txnsubtype": "",
        //   "upi_intent": "Y"
        // }

        if (this.state.selectedClubDetails?.merchant_id && this.state.selectedClubDetails?.user_name && this.state.selectedClubDetails?.password && this.state.selectedClubDetails?.api_key) 
          this.props.navigation.navigate('webview', { params });
          // }

        }
      } catch (err: unknown) {
        console.error(err)
      }

    }
    getHostName(u: any): any {
      if ((u != '')) {
        var regex = new RegExp('(https?://.*?\)/');
        var match = regex.exec(u)[1];

        return match;
      }
      else return '';
    }
  async makeBookingAPI() {
      let data = new FormData();
      data.append('booking_id', this.state.bookingId);
      let endpoint = apiFunctions.makeBooking;
      const responseData = await makeApiCall(endpoint, 'POST', data);
      if (responseData.status == 'success') {
        this.setState({ cancelbookingmodel: true });
      } else {
      }
    }
  }
