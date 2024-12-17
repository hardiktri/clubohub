
import { Component } from 'react';
import makeApiCall from '../../globalServices/api';
import { apiFunctions } from '../../globalServices/utils';

export interface Props {
  navigation?: any;
  id?: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  isLoading: boolean;
  needRetakeToken: boolean;
//   leaderboard: LeaderboardItem[];
  token: string;
  totalCount: number;
  totalPage: number;
  pageIndex: number;
  moreLoading: boolean;
  contact: {
    email: any;
    phone: any;
    address: any;
},
faqlist:any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ContactusScreenController extends Component<
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
      isLoading: false,
      needRetakeToken: true,
    //   leaderboard: [],
      token: "",
      pageIndex: 1,
      totalCount: 1,
      totalPage: 1,
      moreLoading: false,
      contact: {
        email: '',
        phone: '',
        address: '',
    },
    faqlist:[]
      // Customizable Area End
    };

    // Customizable Area Start

    // Customizable Area End
  }


  // Customizable Area Start
  async componentDidMount() {
   
    this.getfaqdetails()
  }
  getfaqdetails = async () => {
    const responseData = await makeApiCall(
      apiFunctions.faqcontactus,
      'GET',
      null,
    );
    console.log('responseData:::--->', responseData);
    if (responseData.status == 'success') {
      let contactres = responseData.contact;
      let faqlist = responseData.faq;
      console.log('responseDatacontactres:::', contactres);
      faqlist.forEach((b: any) => {
        b.visible = false;
      });
      this.setState({faqlist: faqlist});
      this.setState({contact:{
        email: contactres.email,
        phone: contactres.phone,
        address: contactres.address
      }})

    } else {
    }
  };
  visiblefn = (index: number) => {
    this.setState(prevState => ({
      faqlist: prevState.faqlist.map((item: { visible: any; }, i: number) => 
        i === index ? { ...item, visible: !item.visible } : item
      )
    }));
  };
  // Customizable Area End
}
