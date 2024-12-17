import * as React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import color from '../../globalServices/color';
import GlobalStyle from '../../globalServices/globalStyle';
import SelectDropdown from 'react-native-select-dropdown';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import ChatScreenController, {Props} from './ChatScreenController';
import Scale from '../../globalServices/Scale';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {BackgroundImage} from '../../components/BackgroundImage';
const arr = [0, 1, 2, 3, 4, 5, 6];

export default class ChatScreen extends ChatScreenController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const renderSeparator = () => {
      return (
        <View style={{height: 0.5, backgroundColor: color.dividercolor}} />
      );
    };
    return (
      <BackgroundImage>
        <View style={styles.container}>
          <Text style={styles.headertxt}>Chat</Text>
          <LinearGradient
            colors={['#B78428', '#252525']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            style={[GlobalStyle.grediant]}>
            <View style={[GlobalStyle.bordercontainer]}>
              <SelectDropdown
                defaultButtonText={this.state.selectedClub}
                data={this.state.clubList}
                onSelect={(selectedItem, index) => {}}
                buttonTextAfterSelection={(selectedItem, index) => {
                  if (selectedItem.id !== this.state.club_id) {
                    // Update state and call functions
                    this.setState({club_id: selectedItem.id});
                    this.getmemberList(selectedItem.id);
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
            style={{
              padding: Scale(8),
              flexDirection: 'row',
              marginTop: Scale(5),
              alignItems: 'center',
            }}>
            <Text style={[styles.h1txt, {flex: 1}]}>Members</Text>
            <View
              style={{
                flexDirection: 'row',
                width: '60%',
                marginRight: Scale(10),
              }}>
              <LinearGradient
                colors={['#B78428', '#252525']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={[
                  GlobalStyle.grediant,
                  {
                    marginTop: Scale(0),
                    height: Scale(35),
                  },
                ]}>
                <View
                  style={[
                    GlobalStyle.bordercontainer,
                    {
                      flexDirection: 'row',
                      padding: Scale(0),
                      alignItems: 'center',
                      width: 'auto',
                    },
                  ]}>
                  <TextInput
                    style={{
                      flex: 1,
                      padding: Scale(0),
                      color: color.searchtxt,
                      marginLeft: 10,
                    }} // Add any additional styles
                    placeholder="Search here...."
                    autoCapitalize="none"
                    returnKeyType="next"
                    placeholderTextColor={color.searchtxt}
                    onChangeText={text => {
                      this.filterData(text);
                    }}
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                  />
                  <Image
                    style={{marginRight: 10}} // Adjust margin as needed
                    resizeMode={'contain'}
                    source={require('../../images/ic_search.png')}
                  />
                </View>
              </LinearGradient>
            </View>
            <TouchableOpacity
              onPress={() =>
                // this.trigger()
                this.props.navigation.navigate('FriendRequestScreen')
              }>
              <Image
                resizeMode={'contain'}
                source={require('../../images/ic_friend.png')}
                style={{
                  width: Scale(20),
                  height: Scale(20),
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('InviteFriendScreen')
              }>
              <Image
                resizeMode={'contain'}
                source={require('../../images/ic_useradd.png')}
                style={{marginStart: Scale(10)}}
              />
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={this.state.filtermemberlist}
              ItemSeparatorComponent={renderSeparator}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ChatDetailScreen', {
                      item: item,
                      club_id: this.state.club_id,
                    })
                  }>
                  <View style={styles.itemStyle}>
                    <View>
                      <Image
                        source={
                          item.profile_pic == ''
                            ? require('../../images/user-default.png')
                            : { uri: `${item.profile_pic}` }
                        }
                        style={styles.avatar}
                      />
                    </View>

                    <View style={{paddingStart: Scale(15), flex: 1}}>
                      <Text style={styles.textname}>
                        {item.first_name} {item.last_name}
                      </Text>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={styles.textdesc}>
                        {item.last_message}
                      </Text>
                    </View>
                    <View>
                      <Text style={[styles.textname, {fontSize: Scale(12)}]}>
                        {moment(item.created_at).format('MMM DD')}
                      </Text>
                      {item.un_read_count != 0 ? (
                        <View style={styles.badge}>
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: Scale(12),
                              color: color.white,
                              fontWeight: '600',
                            }}>
                            {item.un_read_count}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()} // Assign a unique key to each item
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
  badge: {
    width: Scale(25),
    height: Scale(25),
    borderRadius: 20,
    marginTop: Scale(12),
    marginHorizontal: Scale(10),
    backgroundColor: color.yellow,
    justifyContent: 'center',
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
  avatar: {
    width: Scale(50),
    height: Scale(50),
    borderRadius: 65,
    borderWidth: Scale(2),
    borderColor: '#B78428',
  },
  textdesc: {
    color: color.white,
    fontSize: Scale(12),
  },

  //drop down styles
  dropdown1BtnStyle: {
    flex: 1,
    width: 'auto',
    height: Scale(50),
    backgroundColor: 'transperent',
  },
  dropdown1BtnTxtStyle: {color: '#FFF', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: color.bgcolor},
  dropdown1RowStyle: {
    backgroundColor: color.bgcolor,
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: {color: '#FFF', textAlign: 'left'},
});
