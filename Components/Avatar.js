import React, { Component } from 'react'
import { StyleSheet, Platform, Image, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'

const androidOptions = {
    title: 'Choisir un Avatar',
    takePhotoButtonTitle: 'Prendre une photo',
    chooseFromLibraryButtonTitle: 'choisir depuis la galerie',
    cancelButtonTitle: 'Quitter'
};

class Avatar extends Component {
    constructor(props){
        super(props)
    }

    _avatarClicked = () => {
        let options = {}
        if(Platform.OS === 'android' )
            options = androidOptions
            
        ImagePicker.showImagePicker(options,response => {
            if(response.didCancel)
                console.log("L'utilisateur a annulé !")
            else if(response.error)
                console.log('Erreur : '+response.error)
            else{
                console.log('Photo : '+response.uri)
                let requireSource = { uri: response.uri }
                const action = { type: 'SET_AVATAR', value: requireSource }
                this.props.dispatch(action)
            }

        })
    }

    render(){
        return(
            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => this._avatarClicked()}
            >
                <Image
                    style={styles.avatar}
                    source={this.props.avatar}
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    touchableOpacity: {
        margin: 5,
        width: 40,
        height: 40,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderColor: '#9B9B9B',
        borderWidth: 2
    }
})

const mapStateToProps = state => {
    return {
        avatar: state.setAvatar.avatar
    }
}

export default connect(mapStateToProps)(Avatar)