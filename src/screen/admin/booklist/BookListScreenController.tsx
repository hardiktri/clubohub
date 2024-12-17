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
  totalPage: number;
  pageIndex: number;
  moreLoading: boolean;
  activityList: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class BookListScreenController extends Component<Props, S, SS> {
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
      token: '',
      pageIndex: 1,
      totalCount: 1,
      totalPage: 1,
      moreLoading: false,
      activityList: [
      ],
      // Customizable Area End
    };

    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    let club_id = await getdata('club_id')

    this.getActivities(club_id)
  }
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
