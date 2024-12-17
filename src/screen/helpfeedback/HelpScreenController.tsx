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
import { apiFunctions, getdata, launchGallary, showtoasterror, showtoastsucces } from '../../globalServices/utils';
import makeApiCall from '../../globalServices/api';

export interface Props {
  navigation?: any;
  id?: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  firstname: any;
  lastname: any;
  email: any;
  complain: any;
  suggestion: any;
  file: {
    uri: string | null,
    name: string | null,
    type: string | null,
  };
  prefix: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class HelpScreenController extends Component<
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
      firstname: '',
      lastname: '',
      email: '',
      complain: '',
      suggestion: '',
      file: { name: null, uri: "", type: "" },
      prefix: ''

      // Customizable Area End
    };

    // Customizable Area Start

    // Customizable Area End
  }


  // Customizable Area Start
  async componentDidMount() {
    const user = await getdata('userdetails');
    console.log("prefix", user)
    this.setState({ email: user.email, firstname: user.first_name, lastname: user.last_name, prefix: user.prefix })
  }
  imageupload = () => {
    launchGallary((response: string) => {
      const imageData = JSON.parse(response)
      this.setState({ file: { uri: imageData.assets[0].uri, name: imageData.assets[0].fileName, type: imageData.assets[0].type } })

      console.log("launchCamera response:::", imageData)
    })
  }

  add_helpfeedback = async () => {

    let role_id = await getdata('role');

    let data = new FormData();
    data.append('first_name', this.state.firstname);
    data.append('last_name', this.state.lastname);
    data.append('email', this.state.email);
    data.append('complain', this.state.complain);
    data.append('suggession_comment', this.state.suggestion);
    data.append('prefix', this.state.prefix);
    data.append("attchement", this.state.file.name == null ? '' : JSON.parse(JSON.stringify(this.state.file)))
    if (!this.state.complain || !this.state.suggestion) {
      return showtoasterror('Please enter all data.');
    }
    console.log('responseData:::--->', data);

    const responseData = await makeApiCall(apiFunctions.helpfeedback, 'POST', data);
    console.log('responseData:::--->', responseData);
    if (responseData.status == "success") {

      showtoastsucces('Feedback Successfully Added.')

      if (role_id == '4') {
        this.props.navigation.navigate('HomeAdminScreen');
      } else {
        this.props.navigation.navigate('HomeScreen')
      }

    }
    else {
      showtoasterror('Please Try again')

    }
  }

  // Customizable Area End
}
