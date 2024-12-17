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
import color from '../../../globalServices/color';
import GlobalStyle from '../../../globalServices/globalStyle';

// Merge Engine - import assets - Start
// Merge Engine - import assets - End
// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// import dayjs from "dayjs";
// import ImageComponent from "./components/ImageComponent/ImageComponent";
import HomeAdminScreenController, { Props } from './HomeAdminScreenController';
import Scale from '../../../globalServices/Scale';
import { BackgroundImage } from '../../../components/BackgroundImage';
// import { Button } from "react-native-elements";
// Customizable Area End
const image_urls = [
  'https://s3-alpha-sig.figma.com/img/6a66/906b/94e7c3706d2ea52639cd4dc47927cfae?Expires=1699228800&Signature=bpf34zW008NAEq8MUg7K8j8c6ssEaAi7j6AjnJKvuBO38Qn1ZYDHqBVzi9yAcYvr9NFbGyvdr5ehifor0Z5JCwv5FJiHRJ5vk-5ywJbVoImqhynpv4GMNQwqY8vZxRvoakNCMt68EjjsRO3u2N9kr1T1OLJpeUf0V33U9-LMjgie9bScnYsM5wRXcBlCIRwCC5l9HM5i8M7Nkg3vDxdrbsRpEF0UXJhvKAbyE14pbz3a4xObUTTVb9XNVK6zs3C1FvkosDwmQyDlwnC0x4yOF4G651Z1b8Kh7AnLdf5ooWOZ3Z93gk7tE2Ttvh8nUnpyCGfspJkDc2Yt8c2xs923wg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  'https://s3-alpha-sig.figma.com/img/7da2/02de/9c1503d9cbdfb5d06231b15e73de0dcd?Expires=1699228800&Signature=e7~dWScivrQXQa-4VnMSXVxRvY2fNjhyYHiWPX-waWJXgbnE42putSXQzze445jjmpzPnEUoffq9K5UOdiW6n8eUQnJYsAep7MfMfrsgJXyFS0ibgs3bscvLVP-7JaqlTUW4QvN15Fvu9uYM3Gk~St1IBSFPQryU9qwA2cG66CRrYs5OkdICJaLN1vdmCDbMAUB3E2n7XqkSuzQvHSb1DjoqR3sj6tCGSdSdesEXrVHc4yB9TYXQr6ram2RgtrC4wJeLt9YU1kosjwJMu52gchwfFxQELZDK57rnS2NT33Gct-5TU33Y5jPYzgf-PCHVmd~M3i4AJt13JdvZs2dEjA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  'https://s3-alpha-sig.figma.com/img/8e16/3fd4/c5cb9124f2e3087558570aca41ab2ec1?Expires=1699228800&Signature=UJ4LiTCpS-96YE5OLhixBNN9kkxyKCpPdBWx-aU8fbk1whEOpEhp2bMjGyuXWy1ESjemN9rwbSo-RCxFjBmHHhN1JWpXnTSINzmPkGNdDB92RWXBW-EWCpilVonV4ZAnReTH8cfCzTtYMELUwNEaR2UJwhEWLyRNJ~cJvdnknTC5qvmcpJLjzwh~~pMmfMgWfSB3kDAjUxMSJrSDvDw75ie1yYVlju4TvS3O6CEJrjyFOlYnXMblfvoIB7oZNU~r0695nEItJOGUDnQekEoer-bP20qhWxR1hGqn~rSOvplaBNcVXRc3erc5NPgicNGN4XiQ83hytvA1xd05~4Zd1A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
];
const image_urls1 = [
  'https://s3-alpha-sig.figma.com/img/7a64/d70b/a03560a00a8b94d10a7f2c5607c75b55?Expires=1699228800&Signature=RlMAJruBBilzYwudk9NWVBPThzGpuK3RF~sAHCHmLtH-bHNetai1umAClviGBXY2PirtRaMgodR5ZwVaF9bRXunwYorvaoFdtmAJkQEibcGTdQr3B0XfzZXt~-0HFiiTcrETEm0TKepeAHQXU0QhTlkPHlfvzS46~GORXWc0QMmiP8GczqVqZyBGHm6juWMINPKHe9~cRaf2Xae2AtpUDtTKprNgfPcD2Tcywkb-k3VARAk-BLCGkrokfS6hb686Ub7mTQ5RIpNNGa5G062cqtjW7femWbnuuEvEVkaN1RWpV4A2s1kiqja2~1zyuHpAJhoRaeXUPgAZlabNzDxi-g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  'https://s3-alpha-sig.figma.com/img/4847/c288/8d2bf2869005f4ef48d9d0d6b7e88544?Expires=1699228800&Signature=EnhxLu4yjtGyzNa467HE5XXc4Smhoq8Q9BNOJ1wJpF6211yIIDD2dL41HWJEyUeL3DNq3j0xZNE04nkozFH9VVONwzs4y-ut1jTzWit2pYM03ar4POJyLzDi~SLV0mesP~l7IiymvGdFQgleM76jzq-IxaexGP5U51zRbwczg4i9RYapPm9RxskpgepYXHklWW9zRI07iWjTo96tO0-B-axmBYC~SCWUg8X4cFjsKOGE~DCMPxyFUr5NPq3eQLZIODhyeh7YIM3UrHCqkCZhSWNJSYtpr1eJSTD9DkGMwHBFAhR9JRfLUmOhiRpbpa2d4kPF5kUsVaOBfgToRLCN3w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  'https://s3-alpha-sig.figma.com/img/8e16/3fd4/c5cb9124f2e3087558570aca41ab2ec1?Expires=1699228800&Signature=UJ4LiTCpS-96YE5OLhixBNN9kkxyKCpPdBWx-aU8fbk1whEOpEhp2bMjGyuXWy1ESjemN9rwbSo-RCxFjBmHHhN1JWpXnTSINzmPkGNdDB92RWXBW-EWCpilVonV4ZAnReTH8cfCzTtYMELUwNEaR2UJwhEWLyRNJ~cJvdnknTC5qvmcpJLjzwh~~pMmfMgWfSB3kDAjUxMSJrSDvDw75ie1yYVlju4TvS3O6CEJrjyFOlYnXMblfvoIB7oZNU~r0695nEItJOGUDnQekEoer-bP20qhWxR1hGqn~rSOvplaBNcVXRc3erc5NPgicNGN4XiQ83hytvA1xd05~4Zd1A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
];
export default class HomeAdminScreen extends HomeAdminScreenController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start

    // Merge Engine - render - Start
    return (
      <BackgroundImage>
        <View style={{ padding: Scale(16) }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: Scale(16),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 8,
                // borderWidth: 1,
                // borderColor: '#444',
                paddingLeft: 10,
                paddingRight: 5,
                width: '60%',
              }}>
              <Image
                resizeMode={'contain'}
                source={require('../../../images/ic_location.png')}
              />
              <Text style={styles.clubview}>{this.state.selectedClub}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('NotificationListAdmin')
                }>
                <Image
                  resizeMode={'contain'}
                  source={require('../../../images/ic_bell.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity

                onPress={() => this.props.navigation.openDrawer()}>
                <Image
                  source={{ uri: this.state.userprofile }}
                  style={{
                    marginStart: Scale(15), width: Scale(58),
                    height: Scale(58),
                    borderRadius: 65,
                  }} />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            style={{ marginBottom: Scale(120) }}
            showsVerticalScrollIndicator={false}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                {/* <Text style={[styles.headtext, {flex: 1}]}>
                  Subscription Plan
                </Text> */}
                {/* <TouchableOpacity onPress={() => this.goToClubViewScreen()}>
                  <Text
                    style={[
                      styles.headtext,
                      {fontWeight: '200', fontSize: 14},
                    ]}>
                    View More
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>
            <View>
              <Image
                resizeMode="cover"
                source={{
                  uri:
                    this.state.selectedClubDetails.club_banner ||
                    'https://cdn.dribbble.com/users/4358240/screenshots/14660462/media/45a8935c98e3afdb215e9df9313467dd.gif',
                }}
                style={{
                  width: '100%',
                  height: 160,
                  marginTop: 10,
                  borderRadius: 10,
                }}
              />
            </View>
            <View>
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Text style={[styles.headtext, { flex: 1 }]}>Activities</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('BookListScreen')
                  }>
                  <Text
                    style={[
                      styles.headtext,
                      { fontWeight: '200', fontSize: 14 },
                    ]}>
                    View All
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={this.state.activityList}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() =>
                        this.props.navigation.navigate('ActivityBookingScreen', {
                          item: item,
                        })
                      } style={{ paddingEnd: 10 }}>
                      <Image
                        source={{
                          uri: item.activity_thumbnail,
                        }}
                        style={{
                          width: 130, // Set the width to the desired value
                          height: 180, // Set the height to the desired value
                          marginTop: 10,
                          borderRadius: 10,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString()} // Assign a unique key to each item
                />
              </View>
            </View>




          </ScrollView>
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
    // flex: 1,
    padding: Scale(16),
    // backgroundColor: color.bgcolor,
  },
  headtext: {
    color: color.white,
    fontSize: Scale(16),
    fontWeight: '600',
  },
  clubview: {
    color: color.white,
    textAlign: 'center',
    paddingStart: Scale(10),
    paddingEnd: Scale(10),
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
