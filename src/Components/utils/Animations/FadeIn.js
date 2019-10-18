import React, { Component } from 'react'
import { Animated, Dimensions } from 'react-native'
import { NavigationEvents } from 'react-navigation'

let firstLoad = true;

class FadeIn extends Component {
    constructor(props){
        super(props)

        this.state = {
            positionLeft: new Animated.Value(Dimensions.get('window').width)
        }
    }

    onLoad = () => {
        Animated.spring(
            this.state.positionLeft,
            {
                toValue: 0,
                speed: 0.5,
                bounciness: 10
            }
        ).start()
    }

    componentDidMount = () => {
        if(firstLoad){
            this.onLoad()
            setTimeout(() => {
                firstLoad = false
            },8000)
        } 
    }

    componentDidUpdate = () => {
        if(this.props.searchFilm){
            this.onLoad()
            setTimeout(() => {
                firstLoad = false
            },8000)
        }   
    }

    // componentWillMount = () => {
    //     this.onLoad()
    // }
    // componentWillUnmount = () => {
    //     this.onLoad()
    // }

    render(){
        return (
            <>              
                <NavigationEvents onWillFocus={() => this.onLoad()} />
                <Animated.View 
                    style={{ left: this.state.positionLeft }}
                >
                    {this.props.children}
                </Animated.View>
            </>
        )
    }
}

export default FadeIn