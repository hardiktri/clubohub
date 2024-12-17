import React from "react";
import { Text, View } from 'react-native';

export default class Toast extends React.Component {

    constructor(props) {
        console.log(props);
        super(props);
        this.state = {

            isToast: false

        }

    }
    componentDidCatch() {
        this.setState({ isToast: this.props.isToast })

    }
    render() {
        return (
            < View >

                {this.state.isToast ? <View style={{ height: 40, width: "100%", position: "absolute", top: 0, justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ color: "white" }}>{this.props.errormsg}</Text>
                </View > : null}

            </View >
        )
    }
}
