import {Component} from 'react';
import {
  apiFunctions,
  showtoasterror,
  showtoastsucces,
} from '../../globalServices/utils';
import makeApiCall from '../../globalServices/api';
import moment from 'moment';

export interface Props {
  navigation?: any;
  id?: string;
  route?: any;
}

interface S {
  bookdetails: any;
  slotsDatalist: any;
  courtdatalist: any;
  court_id: any;
  slot_id: any;
  selectedcourt: any;
  selectedslot: any;
}

interface SS {
  id: any;
}

export default class EditBookScreenController extends Component<Props, S, SS> {
  constructor(props: Props) {
    super(props);

    this.state = {
      bookdetails: {},
      courtdatalist: [],
      slotsDatalist: [],
      court_id: this.props.route.params.item.court_id,
      slot_id: this.props.route.params.item.slot_id,
      selectedcourt: '',
      selectedslot: '',
    };
  }

  async componentDidMount() {
    this.getTimeSlots();
    console.log("dataaa::::",this.props.route.params.item.total_amount)
  }
  getCommaSeparatedMemberNames = (type: any) => {
    let bookingdetails = this.props.route.params.item.booking_details;
    const memberNames = bookingdetails
      .filter((detail: {member_type: string}) => detail.member_type == type)
      .map((detail: {member_name: any}) => detail.member_name);
    if (memberNames.length > 0) {
      return memberNames.join(',');
    } else {
      return '';
    }
  };
  getCommaSeparatedMemberid = () => {
    let bookingdetails = this.props.route.params.item.booking_details;
    const memberNames = bookingdetails
      .filter((detail: {member_type: string}) => detail.member_type == 'member')
      .map((detail: {member_id: any}) => detail.member_id);
    if (memberNames.length > 0) {
      return memberNames.join(',');
    } else {
      return '';
    }
  };

  async getTimeSlots() {
    let endpoint = apiFunctions.getslots;
    let data = new FormData();
    data.append('activity_id', this.props.route.params.item.event_activity_id);
    data.append('activity_date', moment().format('YYYY-MM-DD'));
    const responseData = await makeApiCall(endpoint, 'POST', data);
    console.log('responseData:slots::--->', responseData.data);
    if (responseData.status == 'success') {
      let res = responseData.data;
      this.setState({
        courtdatalist: res,
      });
      let court = res.find(
        (court: {court_id: any}) => court.court_id == this.state.court_id,
      );
      const slot = court.slots.find(slot => slot.id == this.state.slot_id);

      console.log('court', court);
      this.setState({selectedcourt: court.court_title});
      this.setState({
        selectedslot: moment(slot.activity_slot_start_time, 'HH:mm:ss').format(
          'HH:mm A',
        ),
      });
      this.getSlots(this.state.court_id);
    } else {
    }
  }

  getSlots = (selectedCourtId: number) => {
    const selectedCourt = this.state.courtdatalist.find(
      (court: {court_id: any}) => court.court_id === selectedCourtId,
    );
    console.log('selectedCourt', selectedCourt);
    if (selectedCourt.slots.length > 0) {
      this.setState({slotsDatalist: []}, () =>
        this.setState({slotsDatalist: selectedCourt.slots}),
      );
    } else {
      this.setState({slotsDatalist: [], selectedslot: '', slot_id: ''});

      alert('Timeslot not available.');
    }
    this.setState({court_id: selectedCourtId});
  };
  updatebooking = async () => {
    // let club_id = await getdata('club_id')
    // let id = await getdata('id')
    var user_id = this.props.route.params.item.user_id;
    var activity_id = this.props.route.params.item.event_activity_id;
    var member = this.getCommaSeparatedMemberNames('member');
    var guest_names = this.getCommaSeparatedMemberNames('guest');

    var member_id = this.getCommaSeparatedMemberid();

    var date = this.props.route.params.item.slot_datetime;
    if (!this.state.slot_id || !this.state.court_id) {
      return showtoasterror('Please enter all data.');
    }
    var formdata = new FormData();
    formdata.append('user_id', user_id);
    formdata.append('activity_id', activity_id);
    formdata.append('type', 'activity');
    formdata.append('members_ids', member_id);
    formdata.append('members_names', member);
    formdata.append('guest_names', guest_names);
    formdata.append('court_id', this.state.court_id);
    formdata.append('slot_id', this.state.slot_id);
    formdata.append('date', moment(date).format('YYYY-MM-DD'));
    formdata.append(
      'booking_id',
      JSON.stringify(this.props.route.params.item.id),
    );

    console.log('formdata::', formdata);
    const responseData = await makeApiCall(
      apiFunctions.getpaymentdetails,
      'POST',
      formdata,
    );
    console.log('responseData:::--->', responseData);
    if (responseData.status == 'success') {
      showtoastsucces('Activity Successfully Updated.');
      this.props.navigation.goBack();
    } else {
    }
  };
}
