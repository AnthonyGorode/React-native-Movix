import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loadable = (props) => {
    if(props.isLoading)
        return (
            <View style={props.styles}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    return <View></View>
}

export default Loadable;