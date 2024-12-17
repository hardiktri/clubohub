
import { Component } from 'react';
import { apiFunctions, getdata, showtoasterror, showtoastsucces } from '../../../globalServices/utils';
import makeApiCall from '../../../globalServices/api';

export interface Props {
  navigation?: any;
  id?: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  user_id:any;
  startdate:any;
  enddate:any;
  activity_id:any;
  price:any;
  receiptno:any;
  memberlist:any;
  activityList: any;
  dateopen:any;
  startdateopen:any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AddSubcriptionScreenController extends Component<
  Props,
  S,
  SS
> {
  // Customizable Area Start
//   unsubscribe: object;
//   loginApiCallId: string;
//   getLeaderboardDataApi: string;
//   getMoreLeaderboardDataApi: string;
//   pageSize: number;
  // Customizable Area End
  constructor(props: Props) {
    super(props);
   

    this.state = {
      // Customizable Area Start
      user_id:'',
      startdate:'',
      enddate:'',
      activity_id:'',
      price:'',
      receiptno:'',
      memberlist:[],
      activityList:[],
      dateopen:false,
      startdateopen:false,
      // Customizable Area End
    };

    // Customizable Area Start

    // Customizable Area End
  }


  // Customizable Area Start
  async componentDidMount() {
    this.getmemberList();
   
  }
  add_subscription = async () => {
    let club_id = await getdata('club_id')

    if (!this.state.user_id || !this.state.activity_id || !this.state.startdate ||  !this.state.enddate ||  !this.state.price ||  !this.state.receiptno   ) {
        return showtoasterror('Please enter all data.');
      }

    let data = new FormData();
    data.append('user_id', this.state.user_id);
    data.append('club_id', club_id);
    data.append('activity_id', this.state.activity_id);
    data.append('membership_id',  this.state.user_id);
    data.append('subscription_start',  this.state.startdate);
    data.append('subscription_end',  this.state.enddate);
    data.append('subscription_price',  this.state.price);
    data.append('activity_subscription_receipt_no',  this.state.receiptno);

    // data.append('user_id', id);
    const responseData = await makeApiCall(apiFunctions.addsubscribedplans, 'POST', data);
    console.log('responseData:::--->', responseData);
    if (responseData.status == "success") {
        showtoastsucces('Subscription Successfully Added.')
        this.props.navigation.goBack();
    }
    else {
    }
  };
  getmemberList = async () => {
    let club_id = await getdata('club_id')
    let id = await getdata('id')
    let data = new FormData();
    data.append('club_id', club_id);
    data.append('user_id', id);
    const responseData = await makeApiCall(apiFunctions.getmemberlistbyclub, 'POST', data);
    console.log('responseData:::--->', responseData);
    if (responseData.status == "success") {
      let ClubMemberdetails = responseData.ClubMemberdetails;
        this.setState({memberlist:ClubMemberdetails})
        this.getActivities(club_id);
    }
    else {
    }
  };
  getActivities = async (club_id: any) => {
    let id = await getdata('id');

    let url = `${apiFunctions.getclubs}/${club_id}/activities?user_id=` + id;
    const responseData = await makeApiCall(url, 'GET', null);
    console.log('responseData:::--->', responseData.data.data);
    if (responseData.status == 'success') {
      let res = responseData.data.data;
      this.setState({
        activityList: res,
      });
    } else {
    }
  };
  // Customizable Area End
}
