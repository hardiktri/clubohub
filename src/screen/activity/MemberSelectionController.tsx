import { Component } from 'react';
import makeApiCall from '../../globalServices/api';
import { apiFunctions, showtoasterror } from '../../globalServices/utils';

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
  familylist: any;
  seletedMemberCount: number;
  selectedGuestCount: number;
  selectedMemberId: number;
  selectedMemberIdArray: any;
  selectedMembersName: any;
  guestNames: any;
  propsData: any;
  maximum_number: any;
  minimum_number: any;
  is_guest_allowed: any;
  MemberCounts: [];
}

interface SS {
  id: any;
}
var countArray = [
  { count: 0 },
  { count: 1 },
  { count: 2 },
  { count: 3 },
  { count: 4 },
  { count: 5 },
  { count: 6 },
];
export default class MemberSelectionController extends Component<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    const { data } = this.props.route.params;

    const { maximum_number, minimum_number, is_guest_allowed } = this.props.route.params.activityDetail;

    // console.log('activityDetail => ', props.route.params.activityDetail.maximum_number);

    this.state = {
      isLoading: false,
      needRetakeToken: true,
      token: '',
      pageIndex: 1,
      totalCount: 1,
      totalPage: 1,
      moreLoading: false,
      familylist: [],
      selectedMemberId: -1,
      seletedMemberCount: 1,
      selectedGuestCount: 0,
      selectedMembersName: [],
      selectedMemberIdArray: [],
      guestNames: [],
      propsData: data,
      maximum_number: maximum_number - 1,
      minimum_number: minimum_number,
      is_guest_allowed: is_guest_allowed == 0 ? false : true,
      MemberCounts: [],
    };
  }
  async componentDidMount() {
    this.MemberCountCalculation();
    this.getfamily();
  }

  MemberCountCalculation = async () => {
    let array = [];
    for (let i = this.state.minimum_number; i <= this.state.maximum_number; i++) {
      // console.log({ count: i });
      array.push({ count: i });
    }
    this.setState({ MemberCounts: array });
    console.log(this.state.MemberCounts);
    // console.log("array => ", array);

  }

  getfamily = async () => {
    const responseData = await makeApiCall(apiFunctions.getfamily, 'GET', null);
    console.log('responseData getfamily =>', responseData);
    if (responseData.data.length > 0) {
      let res = responseData.data;
      const updatedFamilyList = res.map(familyMember => {
        return {
          ...familyMember,
          name: familyMember.family_member_name,
        };
      });

      this.setState({
        // familylist: updatedFamilyList,
        familylist: updatedFamilyList.concat(responseData.friend_details),
      });

      // console.log("updatedFamilyList => ", updatedFamilyList)

    } else {
    }
  };
  handleNameChange = (text: any, index: any) => {
    const newGuestNames = [...this.state.guestNames];
    newGuestNames[index] = text;
    this.setState({ guestNames: newGuestNames });
  };
  handleRemoveLast = () => {
    // Replace with your actual countArray data
    const extarr = countArray.slice(0, this.state.selectedGuestCount).length;
    const guestNames = this.state.guestNames.length;

    if (extarr === 0) {
      this.setState({ guestNames: [] }, () => {
        console.log('newGuestNames', this.state.guestNames.length);
      });
    } else if (extarr < guestNames) {
      this.setState(
        { guestNames: this.state.guestNames.slice(0, -guestNames + extarr) },
        () => {
          console.log('newGuestNames', this.state.guestNames);
        },
      );
    }
  };
  async goToPaymentScreen() {
    const guestMembersName = this.state.guestNames.join(',');
    const selectedMemberIdArray = this.state.selectedMemberIdArray.toString();
    const selectedNamesArray = this.state.selectedMembersName
      .map(item => item.name)
      .toString();

    // console.log("selectedMemberIdArray => ", selectedMemberIdArray)
    // console.log("selectedNamesArray => ", selectedNamesArray)

    if (this.state.minimum_number > 1 && (parseInt(this.state.selectedMembersName.length + this.state.guestNames.length) == 0)) {
      showtoasterror(
        `You should select ${parseInt(this.state.selectedMembersName.length + this.state.guestNames.length)} member or guest names`,
      );
      return;
    }

    // console.log(" selectedMembersName => ", this.state.selectedMembersName)
    // console.log(" selectedMembersName => ", this.state.selectedMembersName.length)
    // console.log(" guestMembersName => ", this.state.guestNames)
    // console.log(" guestMembersName => ", this.state.guestNames.length)

    if ((this.state.selectedMembersName.length + this.state.guestNames.length) > this.state.maximum_number) {
      showtoasterror(
        `You can't select more then ${this.state.maximum_number}`,
      );
      return;
    }

    const propsData = this.state.propsData;
    this.props.navigation.navigate('PaymentScreen', {
      data: {
        activity_id: propsData.activity_id,
        todayDate: propsData.todayDate,
        courtIndex: propsData.courtIndex,
        slotIndex: propsData.slotIndex,
        type: propsData.type,
        members_ids: selectedMemberIdArray,
        members_names: selectedNamesArray,
        guest_names: guestMembersName,
      },
    });
  }
}
