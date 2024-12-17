import * as React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import color from '../../globalServices/color';
import GlobalStyle from '../../globalServices/globalStyle';
import SelectDropdown from 'react-native-select-dropdown';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import EventScreenController, {Props} from './EventScreenController';
import Scale from '../../globalServices/Scale';
import {getdate, getTime} from '../../globalServices/utils';
import {BackgroundImage} from '../../components/BackgroundImage';
import LinearGradient from 'react-native-linear-gradient';

const arr = [0, 1, 2, 5, 6];

export default class EventScreen extends EventScreenController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <BackgroundImage>
        <View style={styles.container}>
          <Text style={styles.headertxt}>Events</Text>

          <LinearGradient
            colors={['#B78428', '#252525']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            style={[GlobalStyle.grediant]}>
            <View style={[GlobalStyle.bordercontainer]}>
              <SelectDropdown
                defaultButtonText={this.state.selectedClub}
                data={this.state.clubList}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
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
                      color={'#444'}
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
          </LinearGradient>

          <View
            style={{flex: 1, marginBottom: Scale(50), marginTop: Scale(10)}}>
            <FlatList
              data={this.state.eventsList}
              renderItem={({item, index}) => (
                <LinearGradient
                  colors={['#B78428', '#252525']}
                  start={{x: 1, y: 0}}
                  end={{x: 0, y: 0}}
                  style={[GlobalStyle.grediant, {height: 'auto'}]}>
                  <View
                    style={[
                      GlobalStyle.bordercontainer,
                      {padding: Scale(0), height: 'auto'},
                    ]}>
                    <View style={styles.itemContainer}>
                      <View style={styles.detailsContainer}>
                        {/* Avatar */}
                        <Image
                          resizeMode="contain"
                          source={{
                            uri: item.event_thumbnail,
                          }}
                          style={styles.avatar}
                        />
                        <View style={styles.infoContainer}>
                          <Text
                            style={[
                              styles.boldText,
                              {paddingStart: Scale(10)},
                            ]}>
                            {item.event_name}
                          </Text>
                          <Text
                            style={[
                              styles.normalText,
                              {
                                paddingStart: Scale(10),
                                paddingTop: Scale(5),
                                paddingBottom: Scale(5),
                              },
                            ]}>
                            {' '}
                            - By {item.created_name}
                          </Text>

                          <Text
                            style={[
                              styles.boldText,
                              ,
                              {paddingStart: Scale(10)},
                            ]}>
                            {getdate(item.event_start)} |{' '}
                            <Text style={styles.normalText}>
                              {' '}
                              {getTime(item.event_start)} -{' '}
                              {getTime(item.event_end)}
                            </Text>
                          </Text>
                        </View>
                      </View>

                      <View style={styles.playerContainer}>
                        <TouchableOpacity
                          style={[
                            GlobalStyle.txteditable,
                            {
                              flex: 1,
                              marginLeft: 10,
                              marginTop: 0,
                              marginStart: Scale(30),
                              height: Scale(40),
                              marginEnd: Scale(60),
                            },
                          ]}>
                          <Text style={{color: 'white'}}>
                            ₹ {item.event_member_price}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate(
                              'EventDetailScreen',
                              {
                                club_id: item.club_id,
                                event_id: item.id,
                              },
                            )
                          }
                          style={[
                            GlobalStyle.buttonStyle,
                            {
                              flex: 1,
                              marginLeft: 10,
                              marginTop: 0,
                              marginStart: Scale(30),
                              height: Scale(40),
                              marginEnd: Scale(10),
                            },
                          ]}>
                          <Text style={{color: 'white'}}>BOOK</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </BackgroundImage>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Scale(16),
  },
  h1txt: {
    color: color.white,
    fontWeight: '600',
    fontSize: Scale(16),
  },
  text_color: {
    color: color.white,
  },
  badge: {
    width: Scale(25),
    height: Scale(25),
    borderRadius: 20,
    marginTop: Scale(12),
    marginHorizontal: Scale(10),
    backgroundColor: color.yellow,
    justifyContent: 'center',
  },
  avatar: {
    width: Scale(60),
    height: Scale(60),
    borderRadius: 15,
    borderColor: color.yellow,
  },
  headertxt: {
    textAlign: 'center',
    color: color.white,
    fontSize: Scale(18),
    fontWeight: '600',
    marginTop: Scale(10),
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textname: {
    color: color.white,
    fontSize: Scale(16),
    fontWeight: 'bold',
  },
  itemStyle: {
    flexDirection: 'row',
    paddingTop: Scale(10),
    paddingBottom: Scale(10),
    padding: Scale(0),
  },
  textdesc: {
    color: color.white,
    fontSize: Scale(12),
  },
  itemContainer: {
    // borderWidth: 0.5,
    marginTop: Scale(0),
    // borderColor: color.yellow,
    // borderRadius: Scale(18),
    padding: Scale(16),
    marginBottom: Scale(5),
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Scale(10),
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Scale(10),
  },
  infoContainer: {
    flex: 1,
  },
  bookingIdText: {
    marginBottom: Scale(10),
    textAlign: 'center',
    color: color.white,
  },
  playerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'red',
    marginTop: Scale(5),
    paddingStart: Scale(40),
  },
  boldText: {
    fontWeight: 'bold',
    color: color.white,
  },
  normalText: {
    fontWeight: '300',
    color: color.white,
  },
  dropdown1BtnStyle: {
    flex: 1,
    height: Scale(40),
    width: 'auto',
    backgroundColor: color.bgcolor,
  },
  dropdown1BtnTxtStyle: {color: '#FFF', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: color.bgcolor},
  dropdown1RowStyle: {
    backgroundColor: color.bgcolor,
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: {color: '#FFF', textAlign: 'left'},
});
