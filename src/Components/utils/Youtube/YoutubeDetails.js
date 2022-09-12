/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import YouTube from 'react-native-youtube';

class YoutubeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentComponent: undefined,
      apiKey: 'AIzaSyAiiDkfBkDa7vSO5ad8Ux4y2P7O8BEmtrg',
      fullscreen: false,
      isPlaying: true,
      isLooping: false,
      isReady: false,
      status: null,
      quality: null,
      error: null,
      duration: 0,
      currentTime: 0,
      playerWidth: Dimensions.get('window').width,
    };
  }

  render() {
    return (
      <YouTube
        // You must have an API Key for the player to load in Android
        apiKey={this.state.apiKey}
        videoId={this.props.id} // The YouTube video ID
        play={this.state.isPlaying} // control playback of video with true/false
        fullscreen={this.state.fullscreen} // control whether the video should play in fullscreen or inline
        loop={this.state.isLooping} // control whether the video should loop when ended
        onReady={e => this.setState({fullscreen: true})}
        style={{
          alignSelf: 'stretch',
          height: this.state.height,
          backgroundColor: 'black',
        }}
        onChangeState={e => this.setState({status: e.state})}
        onChangeQuality={e => this.setState({quality: e.quality})}
        onError={e => {
          if (e.error === 'UNAUTHORIZED_OVERLAY') {
            this.setState({fullscreen: true});
          }
          console.log(e.error);
        }}
      />
    );
  }
}

export const matchUrlYoutube = key => {
  const url = `https://www.youtube.com/watch?v=${key}`;
  fetch(url).then(response => response.ok, error => console.log(error));
};

export default YoutubeComponent;
