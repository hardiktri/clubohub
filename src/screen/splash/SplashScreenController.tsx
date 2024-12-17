import { Component } from 'react';
import { apiFunctions, storeData, getdata } from '../../globalServices/utils';
 
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
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class LoginScreenController extends Component<Props, S, SS> {
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
      // Customizable Area End
    };

    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
 
    let id = await getdata('id');
    let role_id = await getdata('role');

    if (!id || id == '' || id == null) {
      this.props.navigation.replace('LoginScreen');
    } else {
      console.log('id:::--->', role_id);

      if (role_id == '4') {
        this.props.navigation.replace('DrawerNavigatorAdmin');
      } else {
        this.props.navigation.replace('DrawerNavigator');
      }
    }
  }
 

  // Customizable Area End
}
