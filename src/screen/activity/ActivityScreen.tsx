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
import color from '../../globalServices/color';
import ActivityScreenController, {Props} from './ActivityScreenController';
import Scale from '../../globalServices/Scale';
import SelectDropdown from 'react-native-select-dropdown';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import {BackgroundImage} from '../../components/BackgroundImage';
import GlobalStyle from '../../globalServices/globalStyle';
import LinearGradient from 'react-native-linear-gradient';

export default class ActivityScreen extends ActivityScreenController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <BackgroundImage>
        <View style={styles.container}>
          <View>
            <Text style={[styles.titleText]}>Activities</Text>
          </View>
          <View>
            <Text style={[styles.titleText18Size]}>Overview</Text>
            <Image
              style={styles.mainImage}
              resizeMode="cover"
              source={{
                uri: this.state.selectedClubDetails.club_banner,
              }}
            />
          </View>
          <View style={[styles.bookStyle]}>
            <View style={{flex: 1}}>
              <Text style={[styles.titleText18Size]}>Book Activities</Text>
            </View>
            <View>
              <SelectDropdown
                defaultButtonText={this.state.selectedClub}
                data={this.state.clubList}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  if (selectedItem.id !== this.state.selectedClubDetails.id) {
                    // Update state and call functions
                    this.setState({selectedClubDetails: selectedItem});
                    this.getActivities(selectedItem.id);
                  }
                  return selectedItem.club_name;
                }}
                rowTextForSelection={(item, index) => {
                  return item.club_name;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                  return (
                    <FaIcon
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color={'#FFF'}
                      size={14}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
              />
            </View>
          </View>
          <FlatList
            data={this.state.activityList}
            numColumns={2}
            keyExtractor={item => item.name}
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
                      this.props.navigation.navigate('SlotsScreen', {
                        activityDetail: item,
                      })
                    }
                    style={[styles.activityStyle]}>
                    <Image
                      style={{height: 30, width: 30, marginRight: Scale(10)}}
                      source={{
                        uri: item.activity_icon,
                      }}
                    />
                    <Text style={[styles.nameText]}>{item.activity_name}</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            )}
          />
        </View>
      </BackgroundImage>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Scale(16),
    flex: 1,
  },
  titleText: {
    textAlign: 'center',
    color: color.white,
    fontSize: Scale(18),
    fontWeight: '600',
    marginTop: Scale(10),
  },
  titleText18Size: {
    color: 'white',
    fontSize: Scale(16),
    fontWeight: '700',
  },
  nameText: {
    flex: 1,
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

  //drop down styles
  dropdown1BtnStyle: {
    height: Scale(40),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: color.btncolor,
  },
  dropdown1BtnTxtStyle: {color: '#FFF', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: color.bgcolor},
  dropdown1RowStyle: {
    backgroundColor: color.bgcolor,
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: {color: '#FFF', textAlign: 'left'},
});
