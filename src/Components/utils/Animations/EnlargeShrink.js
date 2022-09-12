import React, {Component} from 'react';
import {Animated} from 'react-native';

class EnlargeShrink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(1),
    };
  }

  componentDidUpdate = () => {
    Animated.sequence([
      Animated.timing(this.state.opacity, {
        toValue: 4,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  render() {
    return (
      <Animated.View
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
        ]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

export default EnlargeShrink;
