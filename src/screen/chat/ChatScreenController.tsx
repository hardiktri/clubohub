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
import {apiFunctions, getdata} from '../../globalServices/utils';
import makeApiCall from '../../globalServices/api';
import {Pusher, PusherEvent} from '@pusher/pusher-websocket-react-native';
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
  clubList: any;
  eventsList: any;
  moreLoading: boolean;
  selectedClub: string;
  club_id: any;
  memberlist: any;
  filtermemberlist: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ChatScreenController extends Component<Props, S, SS> {
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
      clubList: [],
      eventsList: [],
      token: '',
      pageIndex: 1,
      totalCount: 1,
      totalPage: 1,
      moreLoading: false,
      selectedClub: 'Your club name',
      club_id: '',
      memberlist: [],
      filtermemberlist: [],
    };

    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.props.navigation.addListener('focus', async () => {
      this.getClubsList();
      const pusher = Pusher.getInstance();
      await pusher.init({
        apiKey: 'e62c2f2f26d5f7f56968',
        cluster: 'ap2',
      });
      let myChannel = await pusher.subscribe({
        channelName: 'chat-details',
        onEvent: (event: PusherEvent) => {
          console.log(`onEvent: ${event}`);
          const receivedData = JSON.parse(event.data);

          console.log('Original Data::', this.state.filtermemberlist);

          const indexOfItemToDelete = this.state.filtermemberlist.findIndex(
            item => item.chat_id == receivedData.chat_history.chat_id,
          );

          // Remove the item from the array
          console.log('indexOfItemToDelete', indexOfItemToDelete);
          if (indexOfItemToDelete !== -1) {
            this.state.filtermemberlist.splice(indexOfItemToDelete, 1);
            this.state.filtermemberlist.unshift(receivedData.chat_history);
            this.setState({filtermemberlist: this.state.filtermemberlist});
          }

          console.log('Modified Data::', this.state.filtermemberlist);
        },

        onSubscriptionError: (error: any) => {
          console.log('onSubscriptionError', error);
        },
      });
      await pusher.connect();

      const connectionState = pusher.connectionState;
      console.log(`Pusher connection state: ${connectionState}`);
    });
  }
  async componentWillUnmount() {
    console.log('test::::::');
    // const pusher = Pusher.getInstance();
    // await pusher.disconnect();
    // pusher.unsubscribe({
    //   channelName: 'chat-details',
    // });

    // Customizable Area End
  }

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
  getmemberList = async (club_id: any) => {
    let id = await getdata('id');
    let data = new FormData();
    data.append('club_id', club_id);
    data.append('user_id', id);
    const responseData = await makeApiCall(
      apiFunctions.chathistory,
      'POST',
      data,
    );
    console.log('responseData:::--->', responseData);
    if (responseData.status == 'success') {
      let ClubMemberdetails = responseData.data;
      this.setState({
        memberlist: ClubMemberdetails,
        filtermemberlist: ClubMemberdetails,
      });
    } else {
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
