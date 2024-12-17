import {Component} from 'react';
import {
  apiFunctions,
  getdata,
  showtoastsucces,
} from '../../globalServices/utils';
import makeApiCall from '../../globalServices/api';
export interface Props {
  navigation?: any;
  id?: string;
}

interface S {
  isLoading: boolean;
  needRetakeToken: boolean;
  token: string;
  totalCount: number;
  pageIndex: number;
  iscurrent: boolean;
  cancelbookingmodel: boolean;
  clubList: any;
  activityBookingList: any;
  eventBookingList: any;
  selectedClub: string;
  selectedClubId: number;
  idForDelete: number;
}
interface SS {
  id: any;
}

export default class BookScreenController extends Component<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      needRetakeToken: true,
      token: '',
      pageIndex: 1,
      totalCount: 1,
      cancelbookingmodel: false,
      iscurrent: true,
      clubList: [],
      activityBookingList: [],
      eventBookingList: [],
      selectedClub: '',
      selectedClubId: 0,
      idForDelete: -1,
    };
  }
  async componentDidMount() {
    this.getClubsList();
    this.props.navigation.addListener('focus', () => {
      this.getBookingList();
      this.setState({iscurrent: true});
    });
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
        selectedClubId: res[0].id,
      });
      this.getBookingList();
    } else {
    }
  };
  async getBookingList() {
    let endpoint = apiFunctions.bookinglist;
    let userid = await getdata('id');
    let data = new FormData();
    data.append('user_id', userid);
    data.append('club_id', this.state.selectedClubId);
    data.append('type', '');
    data.append('status', this.state.iscurrent ? 'current' : 'past');
    const responseData = await makeApiCall(endpoint, 'POST', data);
    console.log('responseData:getBookingList::--->', responseData);
    if (responseData.status == 'success') {
      let res = responseData;
      this.setState({
        activityBookingList: res.activity,
        eventBookingList: res.events,
      });
    } else {
    }
  }
  async cancelBookingAPI() {
    let endpoint = apiFunctions.cancelbooking;
    let data = new FormData();
    data.append('booking_id', this.state.idForDelete);
    const responseData = await makeApiCall(endpoint, 'POST', data);
    console.log('responseData:getBookingList::--->', responseData);
    if (responseData.status == 'success') {
      showtoastsucces('Booking Cancelled Successfully');
      this.getBookingList();
    } else {
    }
  }
}
