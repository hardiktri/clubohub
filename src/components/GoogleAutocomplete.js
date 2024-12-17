import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GoogleAutocomplete = ({ navigation, route }) => {
    return (
        <SafeAreaView style={{ flex: 1, margin: 10 }}>
            <GooglePlacesAutocomplete

                placeholder="Search Location"
                // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed="auto" // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description}
                onPress={(data, details = null) => {
                    console.log('data', details);
                    console.log("test", data);
                    route.params.onReturn(details);
                    navigation.goBack();
                    //navigation.navigate('ProfileDetails2', { text: 'Hello from Screen 1' })
                    console.log('details', details.geometry.location);
                }}
                getDefaultValue={() => {
                    return ''; // text input default value
                }}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyDoXmhlXGuLXXnvp5f7SmEUCrMh17JH-4I',
                    language: 'en', // language of the results
                }}
                styles={{
                    description: {
                        fontWeight: 'bold',
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                }}
                //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                }}
                debounce={200}
            />
        </SafeAreaView>
    );

};
export default GoogleAutocomplete;
const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});