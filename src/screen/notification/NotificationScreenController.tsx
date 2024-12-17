
import { Component } from 'react';
import makeApiCall from '../../globalServices/api';
import { apiFunctions, getdata } from '../../globalServices/utils';

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

export default class NotificationScreenController extends Component<
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
    this.Readnotification();
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

  Readnotification = async () => {
    let id = await getdata('id')
    // let data = new FormData();
    // data.append('user_id', id);

    const responseData = await makeApiCall(apiFunctions.notification_read + "/" + id, 'GET', null);
    console.log('notification_read =>', responseData.data);
    // if (responseData.data.length > 0) {
    //   let res = responseData.data;
    //   this.setState({
    //     notificationlist: res,
    //   });
    //   console.log("list::", this.state.notificationlist);

    // } else {
    // }
  };
  // Customizable Area End
}