import React from 'react';
import { View, Image, TouchableOpacity, Icon } from 'react-native';

const NavigationDrawerHeader = (props) => {
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
    };

    return (
        <View >
            <TouchableOpacity onPress={toggleDrawer}>
                <Image
                    source={require('../../images/drawer_icon.png')}
                    style={{ width: 20, height: 20, marginLeft: 10, alignItems: "flex-end" }}
                />
            </TouchableOpacity>
        </View>
    );
};
export default NavigationDrawerHeader;