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
import makeApiCall from '../../globalServices/api';
import { apiFunctions } from '../../globalServices/utils';

export interface Props {
  navigation?: any;
  id?: string;
  route?:any
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
  url:any;
  title:any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class NotificationScreenController extends Component<
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
      totalPage: 1,
      moreLoading: false,
      url:'',
      title:''
      // Customizable Area End
    };

    // Customizable Area Start

    // Customizable Area End
  }


  // Customizable Area Start
  async componentDidMount() {
    console.log("Props:::",this.props.route.params.type)
    var type =this.props.route.params.type;
    if(type=='privacy')
    {
     this.setState({title:'Privacy Policy'})
    }
    else if(type=='refund')
    {
     this.setState({title:'Refund Policy'})
    }
    else
    {
      this.setState({title:'Terms and Conditions'})

    }
   this.getpolicydetails()
  }
  getpolicydetails = async () => {

    const responseData = await makeApiCall(apiFunctions.policylist, 'GET', null);
    console.log('responseData:::--->', responseData);
    if (responseData.status == "Success") {
      let res = responseData.data;
      var type =this.props.route.params.type;

      if(type=='privacy')
      {
       this.setState({url:res.privaypolicy})
      }
      else if(type=='refund')
      {
        this.setState({url:res.refundpolicy})
      }
      else
      {
        this.setState({url:res.termconditions})
  
      }
    }
    else {
    }
  }

  // Customizable Area End
}
