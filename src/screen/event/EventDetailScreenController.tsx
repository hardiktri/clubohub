import { Component } from 'react';
import makeApiCall from '../../globalServices/api';
import { apiFunctions, getdata } from '../../globalServices/utils';
import moment from 'moment';

export interface Props {
  navigation?: any;
  id?: string;
  route?: any;
}

interface S {
  // Customizable Area Start
  isLoading: boolean;
  eventDetails: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class EventDetailScreenController extends Component<
  Props,
  S,
  SS
> {
  constructor(props: Props) {
    super(props);
    console.log('idddd:::--->>>', props.route.params.club_id);
    this.state = {
      isLoading: false,
      eventDetails: {},
    };
  }
  async componentDidMount() {
    this.getEventDetails();
  }
  goToMemberScreen() {
    // const {todayDate, courtIndex, slotIndex, activity_id} = this.state;
    const originalDate = this.state.eventDetails.event_start;
    this.props.navigation.navigate('MemberSelection', {
      data: {
        todayDate: moment(originalDate).format('YYYY-MM-DD'),
        courtIndex: '',
        slotIndex: '',
        activity_id: this.state.eventDetails.id,
        type: 'event',
      },
      activityDetail: {
        maximum_number: this.state.eventDetails.event_max_people_per_booking,
        minimum_number: 1,
        is_guest_allowed: this.state.eventDetails.event_is_guest_allowed
      },
      event_max_tickets: this.state.eventDetails.event_max_tickets,
    });
  }
  getEventDetails = async () => {
    let club_id = this.props.route.params.club_id;
    let event_id = this.props.route.params.event_id;

    let url = `${apiFunctions.getclubs}/${club_id}/events/${event_id}`;
    const responseData = await makeApiCall(url, 'GET', null);
    console.log('responseData:::--->', responseData.data);
    if (responseData.status == 'success') {
      let res = responseData.data;
      this.setState({
        eventDetails: res,
      });
    } else {
    }
  };
}
