import { Component } from 'react';
import { apiFunctions, getdata, launchGallary, showtoasterror, showtoastsucces, storeData } from '../../globalServices/utils';
import makeApiCall from '../../globalServices/api';

export interface Props {
  navigation?: any;
  id?: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
    planlist:any;
    clublist:any;
    iscurrent:any

  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ClubDetailScreenController extends Component<
  Props,
  S,
  SS
> {

  constructor(props: Props) {
    super(props);


    this.state = {
        planlist:[],
        clublist:[],
        iscurrent:true
      // Customizable Area End
    };

    // Customizable Area Start

    // Customizable Area End
  }


  // Customizable Area Start
  async componentDidMount() {
    this.getplandata()

  }
  getplandata = async () => {
    let id = await getdata('id')
    let data = new FormData();
    data.append('user_id', id);
    const responseData = await makeApiCall(apiFunctions.subscribedplans, 'POST', data);
    console.log('responseData:::--->', responseData);
    if (responseData.status == "success") {
      let subscribedplans = responseData.subscribedplans;
      let subscribedclubs = responseData.subscribedclubs;
        this.setState({planlist:subscribedplans,clublist:subscribedclubs})
    }
    else {
    }
  }
  // Customizable Area End
}
