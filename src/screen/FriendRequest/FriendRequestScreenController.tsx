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
  totalPage: number;
  pageIndex: number;
  moreLoading: boolean;
  clubList: any;
  selectedClub: any;
  requestList: any;
  filterRequestList: any;
  selectedClubId: number;
}

interface SS {
  id: any;
}

export default class ChatScreenController extends Component<Props, S, SS> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      needRetakeToken: true,
      token: '',
      pageIndex: 1,
      totalCount: 1,
      totalPage: 1,
      moreLoading: false,
      clubList: [],
      selectedClub: '',
      requestList: [],
      filterRequestList: [],
      selectedClubId: 0,
    };
  }

  async componentDidMount() {
    this.getClubsList();
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
      this.getRequestList();
    } else {
    }
  };
  async getRequestList() {
    let id = await getdata('id');
    let data = new FormData();
    data.append('club_id', this.state.selectedClubId);
    data.append('user_id', id);
    const responseData = await makeApiCall(
      apiFunctions.getrequest,
      'POST',
      data,
    );
    console.log('responseData:::--->', responseData);
    if (responseData.status == 'success') {
      let res = responseData.data;
      this.setState({requestList: res, filterRequestList: res});
    } else {
      this.setState({requestList: [], filterRequestList: []});
    }
  }
  async acceptRejectAPI(memberId: any, actionType: string) {
    let id = await getdata('id');
    let data = new FormData();
    data.append('user_id', id);
    data.append('member_id', memberId);
    data.append('action', actionType);
    const responseData = await makeApiCall(
      apiFunctions.requestAction,
      'POST',
      data,
    );
    console.log('responseData:::--->', responseData);
    if (responseData.status == 'success') {
      setTimeout(() => {
        showtoastsucces(responseData.message);
      }, 300);
      this.getRequestList();
    } else {
    }
  }
  filterData = async (searchTerm: string) => {
    const filteredData = this.state.requestList.filter(
      (member: {first_name: string}) =>
        member.first_name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    this.setState({filterRequestList: filteredData});
  };
}
