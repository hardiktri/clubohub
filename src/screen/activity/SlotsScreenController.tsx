import moment from 'moment';
import { Component } from 'react';
import { apiFunctions } from '../../globalServices/utils';
import makeApiCall from '../../globalServices/api';

export interface Props {
  navigation?: any;
  id?: string;
}

interface S {
  totalCount: number;
  slotIndex: number;
  courtIndex: number;
  dayIndex: number;
  moreLoading: boolean;
  dateArray: any;
  activity_id: number;
  activity_name: string;
  todayDate: any;
  slotsData: any;
  activityDetail: any;
}

interface SS {
  id: any;
}

export default class SlotsScreenController extends Component<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    console.log('idddd act:::--->>>', props.route.params.activityDetail);

    this.state = {
      dayIndex: 0,
      totalCount: 1,
      slotIndex: -1,
      courtIndex: 0,
      moreLoading: false,
      dateArray: [],
      todayDate: moment().format('YYYY-MM-DD'),
      activity_id: props.route.params.activityDetail.id,
      activity_name: props.route.params.activityDetail.activity_name,
      slotsData: [],
      activityDetail: props.route.params.activityDetail,
    };
  }

  async componentDidMount() {
    this.getNextDates();
    this.getTimeSlots();
  }
  goToMemberScreen() {
    const { todayDate, courtIndex, slotIndex, activity_id } = this.state;
    this.props.navigation.navigate('MemberSelection', {
      data: {
        todayDate,
        courtIndex,
        slotIndex,
        activity_id,
        type: 'activity',
      },

      activityDetail: this.state.activityDetail
    });
  }
  getNextDates() {
    // Set the start date
    const startDate = moment(this.state.todayDate, 'YYYY-MM-DD');

    // Create an array of 15 days
    const dateArray1 = Array.from({ length: 15 }, (_, index) => {
      const currentDate = startDate.clone().add(index, 'days');
      return {
        date: currentDate.format('DD'),
        day: currentDate.format('ddd').toUpperCase(),
        month: currentDate.format('MMM').toUpperCase(),
        year: currentDate.year(),
        fullDate: currentDate.format('YYYY-MM-DD'),
      };
    });
    this.setState({ dateArray: dateArray1 });
    setTimeout(() => {
      console.log(this.state.dateArray);
    }, 500);
  }
  async getTimeSlots() {
    let endpoint = apiFunctions.getslots;
    let data = new FormData();
    data.append('activity_id', this.state.activity_id);
    data.append('activity_date', this.state.todayDate);
    const responseData = await makeApiCall(endpoint, 'POST', data);
    console.log('responseData:slots::--->', responseData.data);
    if (responseData.status == 'success') {
      let res = responseData.data;
      this.setState({
        slotsData: res,
      });
    } else {
    }
  }
}
