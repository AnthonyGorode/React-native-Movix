import React, {Component} from 'react';
import {View, Button} from 'react-native';
// import {test} from '../Config/API/api_IMDB';

class Test extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // test().then(result => console.log(result), error => console.log(error));
  }

  render() {
    return (
      <View>
        <Button
          title="Next Video"
          onPress={() => {
            if (this._youTubeRef.current) {
              this._youTubeRef.current.nextVideo();
            }
          }}
        />
      </View>
    );
  }
}

export default Test;
