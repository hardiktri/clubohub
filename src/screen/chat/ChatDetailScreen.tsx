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
import Scale from '../../globalServices/Scale';
import {CustomHeader} from '../../components/CustomHeader';
import {BackgroundImage} from '../../components/BackgroundImage';
import ChatDetailScreenController, {Props} from './ChatDetailScreenController';
import {getTime} from '../../globalServices/utils';
import LinearGradient from 'react-native-linear-gradient';
const arr = [0, 1, 2, 3, 4, 5, 6];

export default class ChatDetailScreen extends ChatDetailScreenController {
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
        <View style={{flex: 1}}>
          <CustomHeader
            title={this.state.name}
            onBackPress={() => this.onbackfnc()}
          />
          <View style={styles.container}>
            <FlatList
              data={this.state.chatlist}
              ref={ref => {
                this.flatListRef = ref;
              }}
              showsVerticalScrollIndicator={false}
              onLayout={() => {
                // Scroll to the end when the FlatList layout is complete
                this.flatListRef.scrollToEnd({animated: true});
              }}
              renderItem={({item, index}) => (
                <View>
                  <View
                    style={{
                      alignSelf:
                        this.state.user_id == item.sender_id
                          ? 'flex-end'
                          : 'flex-start',
                    }}>
                    <View
                      style={[
                        styles.memberstyle,
                        {
                          backgroundColor:
                            this.state.user_id == item.sender_id
                              ? color.yellow
                              : 'rgba(217, 217, 217, 0.20)',
                        },
                      ]}>
                      <Text style={{color: 'white', fontSize: Scale(15)}}>
                        {item.message_content}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.textdesc,
                        {
                          fontSize: Scale(10),
                          textAlign:
                            this.state.user_id == item.sender_id
                              ? 'right'
                              : 'left',
                        },
                      ]}>
                      {getTime(item.created_at)}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()} // Assign a unique key to each item
            />
            <View style={{marginTop: 'auto', flexDirection: 'row'}}>
              <LinearGradient
                colors={['#B78428', '#252525']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={[GlobalStyle.grediant, {flex: 2.5}]}>
                <TextInput
                  style={GlobalStyle.bordercontainer}
                  placeholder="Message"
                  autoCapitalize="none"
                  placeholderTextColor="white"
                  value={this.state.chatmsg}
                  onChangeText={text => {
                    this.setState({chatmsg: text});
                  }}
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </LinearGradient>
              <LinearGradient
                colors={['#B78428', '#252525']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={[
                  GlobalStyle.grediant,
                  {flex: 0.5, marginStart: Scale(10)},
                ]}>
                <TouchableOpacity
                  onPress={() => this.sendchat()}
                  style={[
                    GlobalStyle.bordercontainer,
                    {width: 'auto', alignItems: 'center'},
                  ]}>
                  <View>
                    <Image
                      style={{width: Scale(30), height: Scale(30)}}
                      resizeMode={'contain'}
                      source={require('../../images/ic_send.png')}
                    />
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </View>
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
  memberstyle: {
    color: color.white,
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    backgroundColor: color.yellow,
    height: 'auto',
    padding: Scale(10),
    borderWidth: 1,
    borderRadius: Scale(20),
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
    fontSize: Scale(16),
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
    flex: 1,
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
    paddingStart: Scale(12),
    paddingEnd: Scale(13),
    marginBottom: Scale(10),
  },
});
