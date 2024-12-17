import { Component } from 'react';
import makeApiCall from '../../../globalServices/api';
import { apiFunctions, getdata, launchGallary, showtoasterror, showtoastsucces, storeData } from '../../../globalServices/utils';

export interface Props {
  navigation?: any;
  id?: string;
  // Customizable Area Start
  // Customizable Area End
}
interface S {
  firstname: any;
  lastname: any;
  firstnameheader: any;
  lastnameheader: any;
  emailid: any;
  dob: any;
  phonenumber: any;
  dateopen: any;
  user_id: any;
  isedit: any;
  prefix: any;
  profile_pic: any;
  file: {
    uri: string | null,
    name: string | null,
    type: string | null,
  };
  EmployeeId: any

  // Customizable Area End
}


interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ProfileAdminScreenController extends Component<
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
      firstnameheader: '',
      lastnameheader: '',
      firstname: '',
      lastname: '',
      emailid: '',
      dob: '',
      phonenumber: '',
      user_id: '',
      dateopen: false,
      isedit: false,
      prefix: 'Mr',
      profile_pic: '',
      file: { name: null, uri: "", type: "" },
      EmployeeId: ""
      // Customizable Area End
    };
  }

  // Customizable Area Start
  async componentDidMount() {
    this.getuserdetails()

  }
  getuserdetails = async () => {
    let id = await getdata('id')

    const responseData = await makeApiCall(apiFunctions.getprofile + "/" + id, 'GET', null);
    console.log('responseData:::--->', responseData);
    if (responseData.status == "success") {
      let res = responseData.data;
      this.setState({
        firstname: res.first_name,
        firstnameheader: res.first_name,
        lastnameheader: res.last_name,
        lastname: res.last_name,
        emailid: res.email,
        phonenumber: res.mobile_no,
        dob: res.date_of_birth,
        user_id: res.id,
        prefix: res.prefix,
        profile_pic: res.profile_pic,
        EmployeeId: res.employee_id
      })
    }
    else {
    }
  }
  updateuserdetails = async () => {
    let id = await getdata('id')

    let data = new FormData();
    data.append('first_name', this.state.firstname);
    data.append('last_name', this.state.lastname);
    data.append('email', this.state.emailid);
    data.append('date_of_birth', this.state.dob);
    data.append('mobile_no', this.state.phonenumber);
    data.append('prefix', this.state.prefix);
    data.append('_method', 'PUT');
    data.append('profile_pic', 'PUT');
    if (this.state.file.name != null) {
      data.append("profile_pic", JSON.parse(JSON.stringify(this.state.file)))
    }
    data.append('id', id);

    console.log('responseData:::--->', data);

    const responseData = await makeApiCall(apiFunctions.getprofile, 'POST', data);
    console.log('responseData:::--->', responseData);
    if (responseData.status == "success") {
      let res = responseData.data;

      this.setState({
        firstname: res.first_name,
        firstnameheader: res.first_name,
        lastnameheader: res.last_name,
        lastname: res.last_name,
        emailid: res.email,
        phonenumber: res.mobile_no,
        dob: res.date_of_birth,
        user_id: res.id,
        prefix: res.prefix,
        isedit: false,
        profile_pic: res.profile_pic,
        EmployeeId: res.employee_id
      })
      showtoastsucces('Profile Successfully Updated.')
      storeData("userdetails", res)

    }
    else {
      showtoasterror('Please Try again')

    }
  }
  imageupload = () => {
    launchGallary((response: string) => {
      const imageData = JSON.parse(response)
      this.setState({ file: { uri: imageData.assets[0].uri, name: imageData.assets[0].fileName, type: imageData.assets[0].type } })

      console.log("launchCamera response:::", imageData)
    })
  }
}