import * as React from 'react';
// Customizable Area Start
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import color from '../../../globalServices/color';
// import GlobalStyle from '../../globalServices/globalStyle';

import BookListScreenController, {Props} from './BookListScreenController';
import Scale from '../../../globalServices/Scale';
import {BackgroundImage} from '../../../components/BackgroundImage';
import {showToast} from '../../../globalServices/utils';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyle from '../../../globalServices/globalStyle';
// import GlobalStyle from '../../globalServices/globalStyle';

export default class BookListScreen extends BookListScreenController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <BackgroundImage>
        <View>
          <Text style={[styles.headertxt]}>Booking List</Text>
        </View>
        <View style={{padding: Scale(20)}}>
          <View style={{marginTop: Scale(12)}}>
            <Text style={[styles.titleText18Size]}>Select Activity</Text>
          </View>
          <FlatList
            data={this.state.activityList}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <LinearGradient
                colors={['#B78428', '#252525']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={[
                  GlobalStyle.grediant,
                  {height: 'auto', marginRight: 'auto', width: Scale(175)},
                ]}>
                <View
                  style={[
                    GlobalStyle.bordercontainer,
                    {padding: Scale(2), height: 'auto', width: 'auto'},
                  ]}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ActivityBookingScreen', {
                        item: item,
                      })
                    }
                    style={[styles.activityStyle]}>
                    <Image
                      style={{height: 30, width: 30, marginRight: Scale(10)}}
                      source={{uri: item.activity_icon}}
                    />
                    <Text style={[styles.nameText, {flex: 1}]}>
                      {item.activity_name}
                    </Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            )}
          />
        </View>
      </BackgroundImage>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    padding: Scale(20),
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
    margin: Scale(15),
    fontSize: Scale(18),
    fontWeight: '600',
  },
  headertxt: {
    textAlign: 'center',
    color: color.white,
    fontSize: Scale(16),
    fontWeight: '600',
    marginTop: Scale(10),
  },
  titleText18Size: {
    color: 'white',
    fontSize: Scale(16),
    fontWeight: '400',
  },
  nameText: {
    color: 'white',
    fontSize: Scale(15),
  },
  mainImage: {
    marginTop: Scale(10),
    height: 180,
    borderRadius: Scale(15),
  },
  bookStyle: {
    flexDirection: 'row',
    marginTop: Scale(20),
    alignItems: 'center',
  },
  selectClubBtn: {
    flex: 1.5,
    backgroundColor: color.btncolor,
    padding: Scale(10),
    borderRadius: Scale(10),
  },
  activityStyle: {
    flexDirection: 'row',
    // marginTop: Scale(22),
    marginRight: Scale(20),
    // marginStart:Scale(20),
    alignItems: 'center',
    // borderRadius: 10,
    // borderWidth: 1,
    // borderColor: '#B78428',
    backgroundColor: color.bgcolor,
    padding: Scale(12),
  },
});
// Customizable Area End
