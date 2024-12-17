
import { Component } from 'react';
import makeApiCall from '../../globalServices/api';
import { apiFunctions, getdata, showtoasterror, showtoastsucces } from '../../globalServices/utils';

import RNFetchBlob from 'rn-fetch-blob'

export interface Props {
  navigation?: any;
  id?: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  announcementlist: any;
  SHowLoader: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AnnouncementScreenController extends Component<
  Props,
  S,
  SS
> {

  constructor(props: Props) {
    super(props);

    this.state = {
      announcementlist: [],
      SHowLoader: false,
      // Customizable Area End
    };

    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.getannouncementdetails();
  }
  getannouncementdetails = async () => {

    let id = await getdata('id')

    const responseData = await makeApiCall(
      apiFunctions.announcement + "/" + id,
      'GET',
      null,
    );
    console.log('responseData:::--->', responseData);
    if (responseData.status == 'success') {
      let res = responseData.data;
      // let list = res;
      let list = res.map((b: any) => {
        return { ...b, visible: false }
      });
      this.setState({ announcementlist: list });

      console.log('announcementlist =>', list);
    } else {
    }
  };
  visiblefn = (id: any) => {
    this.setState(prevState => ({
      announcementlist: prevState.announcementlist.map((item: { id: any; visible: any; }) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    }));

  };

  GetFilExtension = (url: String) => {
    const filename = url.substring(url.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();

    return filename;
  }

  Download = (attachment: any) => {

    // console.log(this.GetFilExtension(attachment))

    this.setState({ SHowLoader: true })

    let dirs = RNFetchBlob.fs.dirs;
    RNFetchBlob
      .config({
        // response data will be saved to this path if it has access right.
        path: dirs.DownloadDir + '/Club-O-Hub/' + this.GetFilExtension(attachment)
      })
      .fetch('GET', attachment, {
        //some headers ..
      })
      .then((res) => {
        this.setState({ SHowLoader: false })
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
        showtoastsucces('Attachment saved on Download/Club-O-Hub');
        console.log('The file saved to ', res.path())
      })
      .catch(error => {
        this.setState({ SHowLoader: false })
        showtoasterror('Please try again!');
        console.log('file saved error ', error)
      })

  }

  // Customizable Area End
}
