import {Component} from 'react';
import makeApiCall from '../../globalServices/api';
import {apiFunctions, getdata} from '../../globalServices/utils';

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
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ActivityScreenController extends Component<Props, S, SS> {
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
      // Customizable Area End
    };
  }
  async componentDidMount() {
    this.getClubsList();
  }
  getClubsList = async () => {
    let id = await getdata('id');
    // let id = 6;
    let url = `${apiFunctions.getclubs}?user_id=${id}`;
    const responseData = await makeApiCall(url, 'GET', null);
    console.log('getClubsList responseData =>', responseData.data.data);
    if (responseData.status == 'success') {
      let res = responseData.data.data;
      this.setState({
        clubList: res,
        selectedClub: res[0].club_name,
        selectedClubDetails: res[0],
      });
      this.getActivities(res[0].id);
    } else {
    }
  };
  getActivities = async (club_id: any) => {
    let url = `${apiFunctions.getclubs}/${club_id}/activities`;
    const responseData = await makeApiCall(url, 'GET', null);
    console.log('getActivities responseData =>', responseData.data.data);
    if (responseData.status == 'success') {
      let res = responseData.data.data;
      this.setState({
        activityList: res,
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
