import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import FaIcon from "react-native-vector-icons/FontAwesome5";
import GlobalStyle from '../globalServices/globalStyle';
import color from '../globalServices/color';
import { EventRegister } from 'react-native-event-listeners'

import { useNavigation } from '@react-navigation/native';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.notificationButtonClick = props.notificationButtonClick
        this.addButtonClick = props.addButtonClick
        this.filterButtonClick = props.filterButtonClick
        this.dialButtonClick = props.dialButtonClick
        this.calanderButtonClick = props.calanderButtonClick
        this.state = {
            title: props.name,
            filterIsVisible: props.filterIsVisible,
            addButtonIsVisible: props.addButtonIsVisible,
            dialButtonIsVisible: props.dialButtonIsVisible,
            locationFilterIsVisible: props.locationFilterIsVisible,
            notificationIsVisible: props.notificationIsVisible,
            calanderIsVisible: props.calanderIsVisible,
            shiftView: 'Day'
        };
    }
    componentDidMount() {
        this.listener = EventRegister.addEventListener('shiftView', (data) => {
            this.setState({ shiftView: data })
        })
    }
    render() {
        return (
            <View style={GlobalStyle.header}>
                <View
                    style={{
                        ...GlobalStyle.headerNeo, ...GlobalStyle.seconderyBgColor,
                    }}>
                    <DrawerButton drawerButtonClick={this.props} />
                    {/* <OpenDrawer></OpenDrawer> */}

                    <Text style={GlobalStyle.textCss}>
                        {this.state.title}
                    </Text>

                    {this.state.filterIsVisible ?
                        <FilterButton filterButtonClick={this.filterButtonClick} /> :
                        null}

                    {this.state.addButtonIsVisible ?
                        <AddButton addButtonClick={this.addButtonClick} /> :
                        null}
                    {this.state.locationFilterIsVisible ?
                        <FilterButton filterButtonClick={this.filterButtonClick} locationFilterIsVisible={true} /> :
                        null}

                    {this.state.dialButtonIsVisible ?
                        <DialButton dialButtonClick={this.dialButtonClick} /> :
                        null}


                    {this.state.locationFilterIsVisible ?
                        <FilterButton filterButtonClick={this.filterButtonClick} locationFilterIsVisible={true} /> :
                        null}

                    {this.state.dialButtonIsVisible ?
                        <DialButton dialButtonClick={this.dialButtonClick} /> :
                        null}

                    {this.state.calanderIsVisible ?
                        <CalanderButton calanderName={this.state.shiftView} calanderButtonClick={this.calanderButtonClick} /> :
                        null}

                    {this.state.notificationIsVisible ?
                        <NotificationButton notificationButtonClick={this.notificationButtonClick} /> :
                        null}
                </View>
            </View>
        )
    }

}

const DrawerButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={{ ...GlobalStyle.headerButtonLeft }} onPress={() => navigation.openDrawer()}>
            <View
                style={{ ...GlobalStyle.deleteIconbg, ...GlobalStyle.seconderyBgColor, ...GlobalStyle.setShadow }}>
                <FaIcon name={'bars'} style={GlobalStyle.iconStyle} />
            </View>
        </TouchableOpacity>
    )
}

const FilterButton = ({
    filterButtonClick, locationFilterIsVisible
}) => {
    return (
        <TouchableOpacity onPress={filterButtonClick} style={{ ...GlobalStyle.headerButtonRight, paddingRight: 35 }}>
            <View
                style={{ ...GlobalStyle.seconderyBgColor, ...GlobalStyle.setShadow }}>
                {locationFilterIsVisible ?
                    <FaIcon name={'map-marker-alt'} style={GlobalStyle.iconStyle} />
                    :
                    <FaIcon name={'filter'} style={GlobalStyle.iconStyle} />
                }
            </View>
        </TouchableOpacity>
    )
}

const DialButton = ({
    dialButtonClick
}) => {
    return (
        <TouchableOpacity onPress={dialButtonClick} style={{ ...GlobalStyle.headerButtonRight, paddingRight: 35 }}>
            <View
                style={{ ...GlobalStyle.seconderyBgColor, ...GlobalStyle.setShadow }}>
                <FaIcon name={'phone-square-alt'} style={GlobalStyle.iconStyle} />
            </View>
        </TouchableOpacity>
    )
}

const AddButton = ({
    addButtonClick
}) => {
    return (
        <TouchableOpacity onPress={addButtonClick} style={{ ...GlobalStyle.headerButtonRight, paddingRight: 70 }}>
            <View
                style={{ ...GlobalStyle.seconderyBgColor, ...GlobalStyle.setShadow }}>
                <FaIcon name={'plus-circle'} style={GlobalStyle.iconStyle} />
            </View>
        </TouchableOpacity>
    )
}

const NotificationButton = ({
    notificationButtonClick, calanderName
}) => {
    return (
        <TouchableOpacity style={{ ...GlobalStyle.headerButtonRight }} onPress={notificationButtonClick}>
            <View
                style={{ ...GlobalStyle.deleteIconbg, ...GlobalStyle.seconderyBgColor, ...GlobalStyle.setShadow, }}>
                <FaIcon name={'bell'} style={GlobalStyle.iconStyle} />
            </View>
        </TouchableOpacity>
    )
}

const CalanderButton = ({
    calanderButtonClick, calanderName
}) => {
    return (
        <TouchableOpacity style={{ ...GlobalStyle.headerButtonRight }} onPress={calanderButtonClick}>
            <View
                style={{ ...GlobalStyle.seconderyBgColor, ...GlobalStyle.setShadow, }}>
                <FaIcon
                    name={calanderName == "Day" ? 'calendar-alt' : "calendar-day"}
                    style={GlobalStyle.iconStyle} />
            </View>
        </TouchableOpacity>
    )
}