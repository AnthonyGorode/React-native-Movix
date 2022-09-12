import React, {Component} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {NavigationEvents} from 'react-navigation';

class OpacityHeartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  render() {
    return (
      <>
        <NavigationEvents onWillFocus={() => this.onLoad()} />
        <Animated.Image
          {...this.props}
          style={[
            {
              opacity: this.state.opacity,
              transform: [
                {
                  scale: this.state.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                  }),
                },
              ],
            },
            this.props.style,
          ]}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({});

export default OpacityHeartItem;
