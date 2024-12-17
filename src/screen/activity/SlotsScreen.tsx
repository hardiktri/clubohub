import * as React from 'react';
// Customizable Area Start
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import color from '../../globalServices/color';

import Scale from '../../globalServices/Scale';
import SlotsScreenController, { Props } from './SlotsScreenController';
import GlobalStyle from '../../globalServices/globalStyle';
import { CustomHeader } from '../../components/CustomHeader';
import { BackgroundImage } from '../../components/BackgroundImage';
import LinearGradient from 'react-native-linear-gradient';

export default class SlotsScreen extends SlotsScreenController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <BackgroundImage>
        <CustomHeader
          title={this.state.activity_name}
          onBackPress={() => this.props.navigation.goBack()}
        />
        <View style={[styles.container]}>
          <View>
            <FlatList
              data={this.state.dateArray}
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.name}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ dayIndex: index, todayDate: item.fullDate }),
                      setTimeout(() => {
                        this.getTimeSlots();
                      }, 100);
                  }}
                  style={[
                    styles.dateStyle,
                    index === this.state.dayIndex
                      ? { backgroundColor: '#B78428' }
                      : null,
                  ]}>
                  <Text style={[styles.nameText]}>{item.day}</Text>
                  <Text style={[styles.nameText, { fontWeight: '800' }]}>
                    {item.date}
                  </Text>
                  <Text style={[styles.nameText]}>{item.month}</Text>
                </TouchableOpacity>
              )}
            />
            {this.state.slotsData.length > 0 ? (
              <FlatList
                style={{ marginBottom: Scale(140), marginTop: Scale(10) }}
                data={this.state.slotsData}
                keyExtractor={(item, index) => item.court_id}
                renderItem={(
                  { item: parentItem, index }, // Destructure the parent item
                ) => (
                  <>
                    <View style={{ padding: Scale(5), marginTop: Scale(15) }}>
                      <Text style={[styles.titleText18Size]}>
                        {parentItem.court_title} {index + 1} 
                        <Text style={[styles.titleTextSmall]}>
                          {' '}
                          ({parentItem.court_hrs} min slots)
                        </Text>
                      </Text>
                    </View>
                    <FlatList
                      data={parentItem.slots}
                      numColumns={3}
                      ListEmptyComponent={
                        <View
                          style={[
                            styles.noDataContainer,
                            { marginTop: Scale(10), height: Scale(60) },
                          ]}>
                          <Text style={styles.noDataText}>
                            No slots available
                          </Text>
                        </View>
                      }
                      nestedScrollEnabled
                      keyExtractor={childItem => childItem.id}
                      renderItem={(
                        { item: childItem, index }, // Destructure the child item
                      ) => (
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({
                              slotIndex: childItem.id,
                              courtIndex: parentItem.court_id,
                            })
                          }
                          style={[{ width: '30%', marginEnd: '4%' }]}>
                          <LinearGradient
                            colors={['#B78428', '#252525']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}
                            style={GlobalStyle.grediant}>
                            <Text
                              style={[
                                GlobalStyle.bordercontainer,
                                {
                                  fontSize: Scale(16),
                                  color: 'white',
                                  width: 'auto',
                                  textAlign: 'center',
                                },
                                childItem.id === this.state.slotIndex
                                  ? {
                                    backgroundColor: '#B78428',
                                    fontWeight: '700',
                                  }
                                  : null,
                              ]}>
                              {childItem.activity_slot_start_time}
                            </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      )}
                    />
                  </>
                )}
              />
            ) : (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No slots available</Text>
              </View>
            )}
          </View>
          <View style={{ marginTop: 'auto' }}>
            <TouchableOpacity
              disabled={this.state.slotIndex !== -1 ? false : true}
              onPress={() => {
                this.state.slotIndex !== -1 ? this.goToMemberScreen() : null;
              }}
              style={[
                GlobalStyle.buttonStyle,
                {
                  backgroundColor:
                    this.state.slotIndex !== -1 ? '#B78428' : 'grey',
                },
              ]}>
              <Text style={GlobalStyle.btntext}>Confirm Time Slot</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BackgroundImage>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Scale(12),
    flex: 1,
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
    margin: Scale(15),
    fontSize: Scale(25),
    fontWeight: '600',
  },
  titleText18Size: {
    color: 'white',
    fontSize: Scale(18),
    fontWeight: '700',
  },
  titleTextSmall: {
    fontSize: Scale(14),
    fontWeight: '300',
  },
  nameText: {
    color: 'white',
    fontSize: Scale(14),
  },
  dateStyle: {
    margin: Scale(3),
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: color.bgcolor,
    width: Scale(50),
    padding: Scale(5),
    paddingBottom: Scale(5),
  },
  noDataContainer: {
    height: Scale(150),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    marginTop: '50%',
    borderColor: color.yellow,
    borderRadius: Scale(10),
    padding: Scale(16),
    marginBottom: Scale(10),
  },
  noDataText: {
    fontSize: 18,
    color: 'gray',
  },
});
