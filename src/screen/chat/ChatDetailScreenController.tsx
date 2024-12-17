import {Component} from 'react';
import {apiFunctions, getdata} from '../../globalServices/utils';
import makeApiCall from '../../globalServices/api';
import {Pusher, PusherEvent} from '@pusher/pusher-websocket-react-native';
export interface Props {
  navigation?: any;
  id?: string;
  route?: string;
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
  chatlist: any;
  filtermemberlist: any;
  name: any;
  user_id: any;
  chatmsg: any;

  // Customizable Area End
}

interface SS {
  id: any;

  // Customizable Area Start
  // Customizable Area End
}

export default class ChatDetailScreenController extends Component<
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
  flatListRef: any;
  constructor(props: Props) {
    super(props);
    this.flatListRef = null;
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
      chatlist: [],
      filtermemberlist: [],
      name: '',
      user_id: '',
      chatmsg: '',
    };

    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.flatListRef.scrollToEnd({animated: true});
  
    const pusher = Pusher.getInstance();
    // await pusher.disconnect();
    pusher.unsubscribe({
      channelName: 'chat-details',
    });
    // await pusher.connect();

    await pusher.init({
      apiKey: 'e62c2f2f26d5f7f56968',
      cluster: 'ap2',
    });

    let chat_id1 = this.props.route.params.item.chat_id;
    let myChannel = await pusher.subscribe({
      channelName: 'chat-details',
      onEvent: (event: PusherEvent) => {
        console.log(`onEvent page2: ${event}`);
        const receivedData = JSON.parse(event.data);
        console.log('receivedData:', receivedData.chat_details);

        let chatlistArray = this.state.chatlist;
        console.log('chatlist:', chatlistArray);

        if (chat_id1 == receivedData.chat_details.chat_id) {
          this.setState(
            {
              chatlist: [...chatlistArray, receivedData.chat_details],
            },
            () => {
              this.flatListRef.scrollToEnd({animated: true});
            },
          );
        }
      },
      onSubscriptionError: (error: any) => {
        console.log('onSubscriptionError', error);
      },
    });
    await pusher.connect();

    console.log('Pusher connection status:', pusher.connectionState);

    // console.log("props::",myChannel);
    // console.log("props::",this.props.route.params.item);
    let chat_id = this.props.route.params.item.chat_id;
    let name =
      this.props.route.params.item.first_name +
      ' ' +
      this.props.route.params.item.last_name;
    this.setState({name: name});
    this.getchatList(chat_id);
    this.clearchatcount()
  }
  async componentWillUnmount() {
    // const pusher = Pusher.getInstance();

    // await pusher.disconnect();
    // pusher.unsubscribe({
    //   channelName: 'chat-details',
    // });

    // Customizable Area End
  }

onbackfnc = () => {
  const pusher = Pusher.getInstance();
    // await pusher.disconnect();
    pusher.unsubscribe({
      channelName: 'chat-details',
    });
    this.clearchatcount();
  this.props.navigation.goBack();
};

  getchatList = async (chat_id: any) => {
    let id = await getdata('id');
    this.setState({user_id: id});
    let data = new FormData();
    data.append('chat_id', chat_id);
    data.append('user_id', id);
    const responseData = await makeApiCall(
      apiFunctions.chatlisting,
      'POST',
      data,
    );
     console.log('responseData:::--->', responseData);
    if (responseData.status == 'success') {
      this.setState({chatlist: responseData.data});
    } else {
    }
  };

  sendchat = async () => {
    let id = await getdata('id');
    let chat_id = this.props.route.params.item.chat_id;
    let receiver_id = this.props.route.params.item.sender_id;
    let club_id = this.props.route.params.club_id;

    this.setState({user_id: id});
    let data = new FormData();
    data.append('sender_id', id);
    data.append('receiver_id', receiver_id);
    data.append('club_id', club_id);
    data.append('content', this.state.chatmsg);
    data.append('chat_id', chat_id);
    const responseData = await makeApiCall(apiFunctions.chatsave, 'POST', data);
    // console.log('responseData:::--->', responseData);
    if (responseData.status == 'success') {
      this.setState({chatmsg: ''});

      // this.setState({chatlist:responseData.data})
    } else {
    }
  };

  clearchatcount = async () => {
    let id = await getdata('id');
    let chat_id = this.props.route.params.item.chat_id;
    
    this.setState({user_id: id});
    let data = new FormData();
    data.append('user_id', id);
    data.append('chat_id', chat_id);
    const responseData = await makeApiCall(apiFunctions.clearcount, 'POST', data);
    console.log('responseData:::--->', responseData);
    if (responseData.status == 'success') {
      // this.setState({chatmsg: ''});

      // this.setState({chatlist:responseData.data})
    } else {
    }
  };

  // Customizable Area End
}
