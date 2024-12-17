import * as React from 'react';

import {Image, StyleSheet, Text, View} from 'react-native';
import color from '../../globalServices/color';
import {CustomHeader} from '../../components/CustomHeader';
import Scale from '../../globalServices/Scale';
import ClubViewScreenController, {Props} from './ClubViewScreenController';
import {BackgroundImage} from '../../components/BackgroundImage';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
export default class ClubViewScreen extends ClubViewScreenController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <BackgroundImage>
        <View style={{flex: 1}}>
          <CustomHeader
            title={this.state.clubDetails.club_name}
            onBackPress={() => this.props.navigation.goBack()}
          />
          <View style={styles.container}>
            <View>
              <Image
                style={styles.mainImage}
                resizeMode="cover"
                source={{
                  uri: this.state.clubDetails.club_banner,
                }}
              />
              <Text
                style={[
                  styles.titleText18Size,
                  {padding: Scale(10), marginTop: Scale(10)},
                ]}>
                About us
              </Text>
            </View>
            <View style={styles.iconViewStyle}>
              <FaIcon
                name={'map-marker-alt'}
                color={color.btncolor}
                size={18}
              />
              <Text style={[styles.textWhite]}>
                {this.state.clubDetails.club_address},{' '}
                {this.state.clubDetails.club_city},{' '}
                {this.state.clubDetails.club_state},{' '}
                {this.state.clubDetails.club_pincode}
              </Text>
            </View>
            <View style={styles.iconViewStyle}>
              <FaIcon name={'at'} color={color.btncolor} size={18} />
              <Text style={[styles.textWhite]}>
                {this.state.clubDetails.club_email}
              </Text>
            </View>
            <View style={styles.iconViewStyle}>
              <FaIcon name={'globe-asia'} color={color.btncolor} size={18} />
              <Text style={[styles.textWhite]}>
                {this.state.clubDetails.club_website}
              </Text>
            </View>
            <View style={styles.iconViewStyle}>
              <FaIcon name={'phone-alt'} color={color.btncolor} size={18} />
              <Text style={[styles.textWhite]}>
                {this.state.clubDetails.club_phone}
              </Text>
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
  titleText18Size: {
    color: color.white,
    fontSize: Scale(16),
    fontWeight: '700',
  },
  mainImage: {
    marginTop: Scale(10),
    height: Scale(150),
    borderRadius: Scale(15),
  },
  textWhite: {
    color: 'white',
    fontSize: Scale(16),
    paddingStart: Scale(10),
  },
  iconViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: Scale(10),
  },
});
