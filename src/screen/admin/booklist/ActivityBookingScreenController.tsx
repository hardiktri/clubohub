import { Component } from 'react';
import { apiFunctions, getdata } from '../../../globalServices/utils';
import makeApiCall from '../../../globalServices/api';

export interface Props {
  navigation?: any;
  id?: string;
  route?:any;
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
  iscurrent: boolean;
  activity:any;
  filteractivity:any;

  cancelbookingmodel: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ActivityBookingScreenController extends Component<
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
      activity:[],
      filteractivity:[]

      // Customizable Area End
    };

    // Customizable Area Start

    // Customizable Area End
  }


  // Customizable Area Start
  async componentDidMount() {
    console.log("props::",this.props.route.params.item)
    this.props.navigation.addListener("focus", () => {
      this.getbooking_list('current')
      this.setState({iscurrent:true})
    });
   
  }
  getbooking_list = async (status:any) => {
    let club_id = await getdata('club_id')
    let id = await getdata('id')
    let data = new FormData();
    data.append('club_id', club_id);
    data.append('status', status);
    data.append('type', 'activity');
    data.append('event_activity_id', this.props.route.params.item.id);
    const responseData = await makeApiCall(apiFunctions.adminbookinglist, 'POST', data);
    console.log('responseData:::--->', responseData);
    if (responseData.status == "success") {
      let activity = responseData.activity;
        this.setState({activity:activity,filteractivity:activity})
    }
    else {
    }
  };
  filterbooking = async (searchTerm: string) =>
  {
    const filteredMembers = this.state.activity.filter(
      (member: { player_name: string; }) =>
        member.player_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({filteractivity:filteredMembers})

  }
  // Customizable Area End
}
