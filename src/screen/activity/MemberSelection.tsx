import * as React from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import color from '../../globalServices/color';
import Scale from '../../globalServices/Scale';
import MemberSelectionController, { Props } from './MemberSelectionController';
import GlobalStyle from '../../globalServices/globalStyle';
import { CustomHeader } from '../../components/CustomHeader';
import SelectDropdown from 'react-native-select-dropdown';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import { BackgroundImage } from '../../components/BackgroundImage';
import Select2 from 'react-native-select-two';
import LinearGradient from 'react-native-linear-gradient';

var countArray = [
  { count: 0 },
  { count: 1 },
  { count: 2 },
  { count: 3 },
  { count: 4 },
  { count: 5 },
  { count: 6 },
];

export default class MemberSelection extends MemberSelectionController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <BackgroundImage>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={Scale(50)}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <CustomHeader
            title=""
            onBackPress={() => this.props.navigation.goBack()}
          />
          <View style={{ flex: 1, margin: Scale(7) }}>
            <ScrollView>
              <View
                style={[
                  GlobalStyle.avatar,
                  {
                    height: 50,
                    width: 50,
                    borderColor: '#B78428',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <Image
                  style={{ height: 35, width: 35 }}
                  source={require('../../images/users.png')}
                />
              </View>
              <View>
                <Text style={[styles.titleText]}>Select Member</Text>
              </View>
              <View>
                <Text style={[styles.titleText18Size, { marginTop: Scale(15) }]}>
                  Select number of member (Including me)
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                {
                  this.state.MemberCounts.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({ seletedMemberCount: item.count })
                        }
                        style={[{ width: '13%', marginLeft: 'auto', marginRight: 4 }]}>
                        <LinearGradient
                          colors={['#B78428', '#252525']}
                          start={{ x: 1, y: 0 }}
                          end={{ x: 0, y: 0 }}
                          style={styles.grediant}>
                          <Text
                            style={[
                              GlobalStyle.bordercontainer,
                              {
                                fontSize: Scale(18),
                                color: 'white',
                                width: 'auto',
                                textAlign: 'center',
                              },
                              item.count === this.state.seletedMemberCount
                                ? { backgroundColor: '#B78428' }
                                : null,
                            ]}>
                            {item.count}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
              <Text style={[styles.titleText18Size, { marginTop: Scale(20) }]}>
                Member Name
              </Text>
              <View>
                <View style={[{ width: '80%', alignSelf: 'center' }]}>
                  <LinearGradient
                    colors={['#B78428', '#252525']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    style={[styles.grediant, { minHeight: 50 }]}>
                    <Select2
                      modalStyle={
                        Platform.OS === 'ios' ? { marginBottom: Scale(30) } : null
                      }
                      style={[GlobalStyle.bordercontainer, { borderWidth: 0 }]}
                      colorTheme={color.bgcolor}
                      searchPlaceHolderText={'search'}
                      popupTitle="Members List"
                      listEmptyTitle={'Empty list'}
                      title="Select Member Names"
                      data={this.state.familylist}
                      cancelButtonText="Cancel"
                      selectButtonText="Select"
                      onSelect={(data, datas) => {
                        this.setState({
                          selectedMemberIdArray: data,
                          selectedMembersName: datas,
                        });
                        console.log('add', data, datas);
                      }}
                      onRemoveItem={(data, datas) => {
                        this.setState({
                          selectedMemberIdArray: data,
                          selectedMembersName: datas,
                        });
                        console.log('remove', data);
                      }}
                    />
                  </LinearGradient>
                </View>
              </View>

              {
                this.state.is_guest_allowed &&
                <View>
                  <Text style={[styles.titleText18Size, { marginTop: Scale(15) }]}>
                    Is there any guest?
                  </Text>

                  {/* <View>
                    <FlatList
                      scrollEnabled={false}
                      data={countArray.slice(0, this.state.MemberCounts.length)}
                      numColumns={7}
                      contentContainerStyle={{
                        alignItems: 'center',
                        marginBottom: Scale(15),
                      }}
                      keyExtractor={item => item.count}
                      renderItem={({ item, index }) => ( */}

                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                    {
                      countArray.slice(0, this.state.MemberCounts.length + 1).map((item, index) => {

                        // if (condition) {

                        // }

                        return (
                          <TouchableOpacity
                            onPress={() =>
                              this.setState({ selectedGuestCount: item.count }, () =>
                                this.handleRemoveLast(),
                              )
                            }
                            style={[{ width: '13%', marginLeft: 'auto', marginRight: 4 }]}>
                            <LinearGradient
                              colors={['#B78428', '#252525']}
                              start={{ x: 1, y: 0 }}
                              end={{ x: 0, y: 0 }}
                              style={[styles.grediant, { height: 50, }]}>
                              <Text
                                style={[
                                  GlobalStyle.bordercontainer,
                                  {
                                    fontSize: Scale(18),
                                    color: 'white',
                                    width: 'auto',
                                    textAlign: 'center',
                                  },
                                  item.count === this.state.selectedGuestCount
                                    ? { backgroundColor: '#B78428' }
                                    : null,
                                ]}>
                                {item.count}
                              </Text>
                            </LinearGradient>
                          </TouchableOpacity>

                        )
                      })
                    }
                  </View>

                  {/* )}
                    />
                  </View> */}

                  <FlatList
                    data={countArray.slice(0, this.state.selectedGuestCount)}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    contentContainerStyle={{
                      flexGrow: 1,
                    }}
                    keyExtractor={item => item.count}
                    renderItem={({ item, index }) => (
                      <View style={{ marginTop: Scale(15) }}>
                        <Text style={styles.textname}>
                          Guest-{item.count + 1} Name*
                        </Text>
                        <View style={[{ marginTop: Scale(5) }]}>
                          <LinearGradient
                            colors={['#B78428', '#252525']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}
                            style={[styles.grediant, { height: 50, }]}>
                            <TextInput
                              style={GlobalStyle.bordercontainer}
                              autoCapitalize="none"
                              returnKeyType="next"
                              placeholderTextColor="grey"
                              placeholder="Enter Guest Name"
                              underlineColorAndroid="#f000"
                              blurOnSubmit={false}
                              value={this.state.guestNames[index]}
                              onChangeText={text =>
                                this.handleNameChange(text, index)
                              }
                            />
                          </LinearGradient>
                        </View>
                      </View>
                    )}
                  />
                </View>}
            </ScrollView>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 'auto',
                padding: Scale(15),
              }}>
              <TouchableOpacity
                onPress={() => this.setState({ cancelbookingmodel: false })}
                style={[
                  GlobalStyle.buttonStyle,
                  {
                    flex: 1,
                    marginRight: 10,
                    backgroundColor: color.bgcolor,
                    borderWidth: 1,
                    borderColor: color.yellow,
                  },
                ]}>
                <Text style={{ color: 'white' }}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.goToPaymentScreen();
                }}
                style={[GlobalStyle.buttonStyle, { flex: 1, marginLeft: 10 }]}>
                <Text style={{ color: 'white' }}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </BackgroundImage>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Scale(15),
    // paddingTop: Scale(0),
    flex: 1,
  },
  grediant: {
    marginTop: Scale(10),
    width: '100%', // Flexible width
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: Scale(12),
    overflow: 'hidden',
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
    margin: Scale(12),
    fontSize: Scale(25),
    fontWeight: '500',
  },
  titleText18Size: {
    color: 'white',
    fontSize: Scale(17),
    fontWeight: '400',
    textAlign: 'center',
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
  activityStyle: {
    flexDirection: 'row',
    marginTop: Scale(22),
    marginRight: Scale(15),
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B78428',
    backgroundColor: color.bgcolor,
    width: Scale(178),
    padding: Scale(12),
  },
  textname: {
    color: color.white,
    fontSize: Scale(14),
    paddingTop: Scale(10),
    paddingStart: Scale(5),
  },
  dateStyle: {
    marginTop: Scale(10),
    marginLeft: 'auto',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: color.bgcolor,
    width: '13%',
    padding: Scale(5),
    height: 'auto',
    borderWidth: 1,
    borderColor: '#B78428',
  },
  selectMemberBtn: {
    borderWidth: 1,
    borderColor: '#B78428',
    borderRadius: Scale(10),
    marginTop: Scale(10),
    width: '85%',
    padding: Scale(10),
    alignSelf: 'center',
  },

  //drop down styles
  dropdown1BtnStyle: {
    flex: 1,
    height: Scale(50),
    backgroundColor: 'transperent',
  },
  dropdown1BtnTxtStyle: { color: '#FFF', textAlign: 'left' },
  dropdown1DropdownStyle: { backgroundColor: color.bgcolor },
  dropdown1RowStyle: {
    backgroundColor: color.bgcolor,
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: { color: '#FFF', textAlign: 'left' },
});
