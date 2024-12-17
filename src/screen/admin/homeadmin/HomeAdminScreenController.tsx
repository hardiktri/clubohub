
import { Component } from 'react';
import { apiFunctions, getdata, storeData } from '../../../globalServices/utils';
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
  totalPage: number;
  pageIndex: number;
  moreLoading: boolean;
  activityList: any;
  eventsList: any;
  selectedClub: string;
  selectedClubDetails: any;
  userprofile:any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class HomeAdminScreenController extends Component<
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
      isLoading: false,
      needRetakeToken: true,
      activityList: [],
      eventsList: [],
      token: '',
      pageIndex: 1,
      totalCount: 1,
      totalPage: 1,
      moreLoading: false,
      selectedClub: 'Your club name',
      selectedClubDetails: {},
      userprofile:''
      
      // Customizable Area End
    };

    // Customizable Area Start

    // Customizable Area End
  }


  async componentDidMount() {
    this.props.navigation.addListener("focus", async () => {
      this.getClubsList();
      const user = await getdata('userdetails')
      this.setState({userprofile:user.profile_pic})    });

  }
  getClubsList = async () => {
    let id = await getdata('id');
    let url = `${apiFunctions.getclubs}?user_id=${id}`;
    const responseData = await makeApiCall(url, 'GET', null);
    console.log('getClubsList Responsefdata =>', responseData);
    if (responseData.status == 'success') {
      let res = responseData.data.data;
      this.setState({
        selectedClub: res[0].club_name,
        selectedClubDetails: res[0],
      });
      storeData('club_id',res[0].id);
      this.getActivities(res[0].id);

    } else {
    }
  };
  getActivities = async (club_id: any) => {

    let id = await getdata('id');
    
    let url = `${apiFunctions.getclubs}/${club_id}/activities?user_id=` + id;
    const responseData = await makeApiCall(url, 'GET', null);
    console.log('responseData:::--->', responseData);
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
