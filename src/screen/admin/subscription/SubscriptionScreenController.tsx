
import { Component } from 'react';
import { apiFunctions, getdata } from '../../../globalServices/utils';
import makeApiCall from '../../../globalServices/api';

export interface Props {
  navigation?: any;
  id?: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  isLoading: boolean;
  needRetakeToken: boolean;
//   leaderboard: LeaderboardItem[];
  token: string;
  totalCount: number;
  pageIndex: number;
  subscription_list:any
  filtersubscription_list:any;
  iscurrent: boolean;
  cancelbookingmodel: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SubscriptionScreenController extends Component<
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
      isLoading: false,
      needRetakeToken: true,
    //   leaderboard: [],
      token: "",
      pageIndex: 1,
      totalCount: 1,
      cancelbookingmodel: false,
      iscurrent: true,
      subscription_list:[],
      filtersubscription_list:[]

      // Customizable Area End
    };

    // Customizable Area Start

    // Customizable Area End
  }


  // Customizable Area Start
  async componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.getsubscription_list('current')
    });
   
  }
  getsubscription_list = async (status:any) => {
    let club_id = await getdata('club_id')
    let id = await getdata('id')
    let data = new FormData();
    data.append('club_id', club_id);
    data.append('status', status);
    const responseData = await makeApiCall(apiFunctions.adminsubscribedplans, 'POST', data);
    console.log('responseData:::--->', responseData);
    if (responseData.status == "success") {
      let subscribedplans = responseData.subscribedplans;
        this.setState({subscription_list:subscribedplans,filtersubscription_list:subscribedplans})
    }
    else {
    }
  };
  filtermeber = async (searchTerm: string) =>
  {
    const filteredMembers = this.state.subscription_list.filter(
      (member: { user_name: string; }) =>
        member.user_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({filtersubscription_list:filteredMembers})

  }
  // Customizable Area End
}
