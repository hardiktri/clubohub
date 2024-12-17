/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import { AppRegistry, Text, TextInput } from 'react-native';
import App from './App';
import React from 'react';

import messaging from '@react-native-firebase/messaging';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

const Root = () => {
    return (
        <App />
    );
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
        // App has been launched in the background by iOS, ignore
        return null;
    }

    return <Root />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
