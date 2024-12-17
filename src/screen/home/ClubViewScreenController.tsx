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
  clubDetails: any;
  clubName: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ClubViewScreenController extends Component<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    console.log('idddd:::--->>>', props.route.params.clubDetails);
    this.state = {
      // Customizable Area Start
      isLoading: false,
      needRetakeToken: true,
      clubDetails: props.route.params.clubDetails,
      token: '',
      pageIndex: 1,
      totalCount: 1,
      totalPage: 1,
      moreLoading: false,
      clubName: '',
      // Customizable Area End
    };
  }
  async componentDidMount() {
    // this.getClubDetails();
  }
  getClubDetails = async () => {
    // let id = await getdata('id');
    let id = this.props.route.params.club_id;
    let url = `${apiFunctions.getclubs}/${id}`;
    const responseData = await makeApiCall(url, 'GET', null);
    console.log('responseData:::--->', responseData.data);
    if (responseData.status == 'success') {
      let res = responseData.data;
      this.setState({
        clubDetails: res,
        clubName: res.club_name,
      });
    } else {
    }
  };
}
