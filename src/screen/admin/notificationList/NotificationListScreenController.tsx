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
import makeApiCall from '../../../globalServices/api';
import { apiFunctions, getdata } from '../../../globalServices/utils';

export interface Props {
  navigation?: any;
  id?: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  notificationlist: any;
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}


export default class NotificationListScreenController extends Component<
  Props,
  S,
  SS
> {

  constructor(props: Props) {
    super(props);


    this.state = {

      notificationlist: []
    };
  }


  async componentDidMount() {
    this.getnotification();

  }
  getnotification = async () => {

    let id = await getdata('id')
    // let data = new FormData();
    // data.append('user_id', id);

    const responseData = await makeApiCall(apiFunctions.getnotification + "?user_id=" + id, 'GET', null);
    console.log('responseData:::--->', responseData.data);
    if (responseData.data.length > 0) {
      let res = responseData.data;
      this.setState({
        notificationlist: res,
      });
      console.log("list::", this.state.notificationlist);

    } else {
    }
  };
  // Customizable Area End
}