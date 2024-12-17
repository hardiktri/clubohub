import {Component} from 'react';
import {apiFunctions} from '../../globalServices/utils';
import makeApiCall from '../../globalServices/api';
export interface Props {
  navigation?: any;
  id?: string;
}

interface S {
  isLoading: boolean;
  familylist: any;
}

interface SS {
  id: any;
}

export default class FamilyMemberScreenController extends Component<
  Props,
  S,
  SS
> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      familylist: [],
    };
  }
  async componentDidMount() {
    this.getfamily();
  }
  getfamily = async () => {
    const responseData = await makeApiCall(apiFunctions.getfamily, 'GET', null);
    console.log('responseData:::--->', responseData.data);
    if (responseData.data.length > 0) {
      let res = responseData.data;
      this.setState({
        familylist: res,
      });
    } else {
    }
  };
}
