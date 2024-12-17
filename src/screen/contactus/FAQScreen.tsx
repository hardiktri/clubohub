import * as React from 'react';

// Customizable Area Start
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import color from '../../globalServices/color';
import GlobalStyle from '../../globalServices/globalStyle';

// Merge Engine - import assets - Start
// Merge Engine - import assets - End
// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// import dayjs from "dayjs";
// import ImageComponent from "./components/ImageComponent/ImageComponent";
import ContactusScreenController, {Props} from './ContactusScreenController';
import {CustomHeader} from '../../components/CustomHeader';
import Scale from '../../globalServices/Scale';
import { BackgroundImage } from '../../components/BackgroundImage';
// import { Button } from "react-native-elements";
// Customizable Area End
const arr = [0, 1, 2, 3, 4, 5, 6];
export default class FAQScreen extends ContactusScreenController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    const renderSeparator = () => {
      return <View style={{height: 1, backgroundColor: color.dividercolor}} />;
    };
    // Merge Engine - render - Start
    return (
      <BackgroundImage >
        <CustomHeader
          title="FAQ"
          onBackPress={() => this.props.navigation.goBack()}></CustomHeader>
          <View style={styles.container}>
            <FlatList
              data={this.state.faqlist}
              ItemSeparatorComponent={renderSeparator}
              renderItem={({item, index}) => (
                <View  style={styles.itemStyle}>
                <View style={{flexDirection:'row'}}>
            <Text style={styles.textname}>{item.question}</Text>
            <TouchableOpacity onPress={()=> this.visiblefn(index)}>
            <Image
              source={ item.visible ? require('../../images/ic_minus.png'):require('../../images/ic_plus.png')}
              style={styles.iconimg}
            />

            </TouchableOpacity>
          </View>
          {item.visible?
          <Text style={styles.textname}>{item.answer}</Text>:null}

          </View>
          
              )}
              keyExtractor={(item, index) => index.toString()} // Assign a unique key to each item
            />
          </View>
     
      </BackgroundImage>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    // backgroundColor: color.bgcolor,
    padding: Scale(16),
  },
  textname: {
    color: color.white,
    fontSize: Scale(15),
    flex: 1,
  },
  itemStyle: {
    paddingTop: Scale(10),
    paddingBottom: Scale(10),
    padding: Scale(16),
  },
  avatar: {
    width: Scale(55),
    height: Scale(55),
    borderRadius: 65,
    borderWidth: Scale(2),
    borderColor: '#B78428',
    justifyContent: 'center',
  },
  iconimg: {
    width: Scale(30),
    height: Scale(30),
    alignSelf: 'center',
  },
  textdesc: {
    color: color.white,
    fontSize: Scale(12),
  },

  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  flatList: {
    height: '100%',
  },
  listHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstPlaceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    width: '100%',
    maxWidth: 280,
  },
  listPlaceContainer: {},
  firstPlaceProfile: {
    width: 80,
    height: 80,
    borderRadius: 80,
    borderWidth: 1,
  },
  firstPlacePosition: {
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: 50,
    width: 20,
    height: 20,
    bottom: -8,
    left: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstPlaceProfileContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  firstPlaceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 230,
    width: '100%',
  },
  leaderboardItem: {},
  otherPlaceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
  },
  otherPlaceProfile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
  },
  otherPlacePosition: {
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: 50,
    width: 20,
    height: 20,
    bottom: -8,
    left: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainerStyle: {
    paddingBottom: '20%',
  },
  textBold: {
    fontWeight: '700',
  },
  textWhite: {
    color: 'white',
  },
  emptyUserContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
  },
  emptyUserLabel: {
    fontSize: 18,
  },
  buttonLoadMore: {
    height: 100,
    marginTop: 16,
  },
  paginationStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
});
// Customizable Area End
