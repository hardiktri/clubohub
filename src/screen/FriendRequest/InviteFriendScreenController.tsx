// import { IBlock } from "../../../framework/src/IBlock";
// import { Message } from "../../../framework/src/Message";
// import { BlockComponent } from "../../../framework/src/BlockComponent";
// import MessageEnum, {
//   getName,
// } from "../../../framework/src/Messages/MessageEnum";
// import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// import { LeaderboardItem, LeaderboardItemResponse } from "./types";
// Customizable Area End

// export const configJSON = require("./config");
import {Component} from 'react';
import {
  apiFunctions,
  getdata,
  showtoasterror,
  showtoastsucces,
} from '../../globalServices/utils';
import makeApiCall from '../../globalServices/api';

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
  memberlist: any;
  filtermemberlist: any;
  clubList: any;
  selectedClub: any;
  club_id: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class InviteFriendScreenController extends Component<
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
      token: '',
      pageIndex: 1,
      totalCount: 1,
      totalPage: 1,
      moreLoading: false,
      memberlist: [],
      filtermemberlist: [],
      clubList: [],
      selectedClub: 'Your club name',
      club_id: '',
      // Customizable Area End
    };

    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.getClubsList();
  }
  getmemberList = async (club_id: any) => {
    let id = await getdata('id');
    let data = new FormData();
    data.append('club_id', club_id);
    data.append('user_id', id);
    const responseData = await makeApiCall(
      apiFunctions.getmemberlistbyclub,
      'POST',
      data,
    );
    console.log('responseData:::--->', responseData);
    if (responseData.status == 'success') {
      let ClubMemberdetails = responseData.ClubMemberdetails;
      this.setState({
        memberlist: ClubMemberdetails,
        filtermemberlist: ClubMemberdetails,
      });
    } else {
    }
  };
  sendrequest = async (receiver_id: any, friend_flag: any) => {
    if (friend_flag == 1) {
      return showtoasterror('Request Already Sent.');
    }
    let id = await getdata('id');
    let data = new FormData();
    data.append('club_id', this.state.club_id);
    data.append('sender_id', id);
    data.append('receiver_id', receiver_id);
    console.log('data::', data);
    const responseData = await makeApiCall(
      apiFunctions.sendrequest,
      'POST',
      data,
    );
    console.log('responseData:::--->', responseData);
    if (responseData.status == 'success') {
      this.getmemberList(this.state.club_id);
      showtoastsucces('Request Successfully Sent.');
      // let ClubMemberdetails = responseData.ClubMemberdetails;
      //   this.setState({memberlist:ClubMemberdetails,filtermemberlist:ClubMemberdetails})
    } else {
    }
  };
  getClubsList = async () => {
    let id = await getdata('id');
    let url = `${apiFunctions.getclubs}?user_id=${id}`;
    const responseData = await makeApiCall(url, 'GET', null);
    console.log('responseData:::--->', responseData.data.data);
    if (responseData.status == 'success') {
      let res = responseData.data.data;
      this.setState({
        clubList: res,
        selectedClub: res[0].club_name,
        club_id: res[0].id,
      });
      this.getmemberList(res[0].id);
    } else {
    }
  };
  getfriendstatus = (status: any) => {
    if (status == 0) {
      return 'Send Request';
    } else if (status == 1) {
      return 'Friend Request Sent';
    } else {
      return '';
    }
  };
  filterData = async (searchTerm: string) => {
    const filteredData = this.state.memberlist.filter(
      (member: {first_name: string}) =>
        member.first_name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    this.setState({filtermemberlist: filteredData});
  };

  // Customizable Area End
}
