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
  iscurrent: boolean;
  cancelbookingmodel: boolean;
  memberlist:any;
  filtermemberlist:any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class MemberlistScreenController extends Component<
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
      memberlist:[],
      filtermemberlist:[]
      // Customizable Area End
    };

    // Customizable Area Start

    // Customizable Area End
  }


  // Customizable Area Start
  async componentDidMount() {
    this.getmemberList()
   
  }
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
        this.setState({memberlist:ClubMemberdetails,filtermemberlist:ClubMemberdetails})
    }
    else {
    }
  };
  filtermeber = async (searchTerm: string) =>
  {
    const filteredMembers = this.state.memberlist.filter(
      (member: { first_name: string; }) =>
        member.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({filtermemberlist:filteredMembers})

  }
  // Customizable Area End
}
