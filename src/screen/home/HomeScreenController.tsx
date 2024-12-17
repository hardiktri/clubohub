import { Component } from 'react';
import makeApiCall from '../../globalServices/api';
import { apiFunctions, getdata } from '../../globalServices/utils';

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
  clubList: any;
  activityList: any;
  eventsList: any;
  selectedClub: string;
  selectedClubDetails: any;
  userprofile: any;
  ShownotificationDot: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class HomeScreenController extends Component<Props, S, SS> {
  constructor(props: Props) {
    super(props);

    this.state = {
      // Customizable Area Start
      isLoading: false,
      needRetakeToken: true,
      clubList: [],
      activityList: [],
      eventsList: [],
      token: '',
      pageIndex: 1,
      totalCount: 1,
      totalPage: 1,
      moreLoading: false,
      selectedClub: 'Your club name',
      selectedClubDetails: {},
      userprofile: '',
      ShownotificationDot: false,
      // Customizable Area End
    };
  }
  async componentDidMount() {
    this.props.navigation.addListener('focus', async () => {
      this.getClubsList();
      this.getnotification();
      const user = await getdata('userdetails');
      this.setState({ userprofile: user.profile_pic });
    });
  }

  getnotification = async () => {
    let id = await getdata('id')
    // let data = new FormData();
    // data.append('user_id', id);

    const responseData = await makeApiCall(apiFunctions.getnotification + "?user_id=" + id, 'GET', null);
    console.log('getnotification =>', responseData.data);
    if (responseData.data.length > 0) {
      let res = responseData.data;

      let filter = responseData.data.filter((item: any) => item.is_read == 0);

      this.setState({
        ShownotificationDot: filter.length == 0 ? false : true,
      });
      // console.log("list::", this.state.notificationlist);

    } else {
      this.setState({
        ShownotificationDot: false,
      });
    }
  };


  getClubsList = async () => {
    let id = await getdata('id');
    // let id = 6;
    let url = `${apiFunctions.getclubs}?user_id=${id}`;
    const responseData = await makeApiCall(url, 'GET', null);
    console.log('responseData:::--->', responseData.data.data);
    if (responseData.status == 'success') {
      let res = responseData.data.data;
      this.setState({
        clubList: res,
        selectedClub: res[0].club_name,
        selectedClubDetails: res[0],
      });
      this.getActivities(res[0].id);
      this.getEvents(res[0].id);
    } else {
    }
  };
  getActivities = async (club_id: any) => {
    let url = `${apiFunctions.getclubs}/${club_id}/activities`;
    const responseData = await makeApiCall(url, 'GET', null);
    console.log('activityList responseData:::--->', responseData.data.data);
    if (responseData.status == 'success') {
      let res = responseData.data.data;
      this.setState({
        activityList: res,
      });
    } else {
    }
  };
  getEvents = async (club_id: any) => {
    let url = `${apiFunctions.getclubs}/${club_id}/events`;
    const responseData = await makeApiCall(url, 'GET', null);
    console.log(' eventsList responseData:::--->', responseData.data.data);
    if (responseData.status == 'success') {
      let res = responseData.data.data;
      this.setState({
        eventsList: res,
      });
    } else {
    }
  };
  goToClubViewScreen() {
    this.props.navigation.navigate('ClubViewScreen', {
      clubDetails: this.state.selectedClubDetails,
    });
  }
}
