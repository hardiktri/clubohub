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
  status: string;
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

export default class ActivityBookingsListController extends Component<
  Props,
  S,
  SS
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      needRetakeToken: true,
      token: '',
      pageIndex: 1,
      totalCount: 1,
      cancelbookingmodel: false,
      status: this.props.route.params.status,
      clubList: [],
      activityBookingList: [],
      eventBookingList: [],
      selectedClub: '',
      selectedClubId: this.props.route.params.selectedClubId,
      idForDelete: -1,
    };
  }
  async componentDidMount() {
    this.getBookingList();
  }
  async getBookingList() {
    let endpoint = apiFunctions.bookinglist;
    let userid = await getdata('id');
    let data = new FormData();
    data.append('user_id', userid);
    data.append('club_id', this.state.selectedClubId);
    data.append('type', 'activity');
    data.append('status', this.state.status);
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
