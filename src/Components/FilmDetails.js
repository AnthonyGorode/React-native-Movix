/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {
  View,
  Share,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  getFilmDetailFromApi,
  getFilmVideosFromApi,
} from '../Config/API/apiMovies';
import {
  ActorsHook,
  CompaniesHook,
  ImagesHook,
  RecommandationsHook,
} from './utils/Hooks/FilmDetailsHooks';
import Loadable from './utils/Loadable';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import numeral from 'numeral';
import {connect} from 'react-redux';
import EnlargeShrink from './utils/Animations/EnlargeShrink';
import MainStyles from './styles/Styles';
import {YouTubeStandaloneAndroid} from 'react-native-youtube';

class FilmDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      film: undefined,
      filmParam: this.props.navigation.getParam('idFilm'),
      video: undefined,
      isLoading: true,
    };
  }

  _toggleFavorite = () => {
    const action = {type: 'TOOGLE_FAVORITE', value: this.state.film};
    this.props.dispatch(action);
  };

  _displayFavoriteImage = () => {
    let sourceImage = require('../assets/Images/ic_heart_border.png');
    let shouldLarge = false;
    const checkFilmFavoris = this.props.favoritesFilm.findIndex(
      item => item.id === this.state.film.id,
    );
    if (checkFilmFavoris !== -1) {
      sourceImage = require('../assets/Images/ic_heart_full.png');
      shouldLarge = true;
    }
    return (
      <EnlargeShrink shouldLarge={shouldLarge}>
        <Image source={sourceImage} style={styles.favorite_image} />
      </EnlargeShrink>
    );
  };

  _displayFilm = () => {
    const {film} = this.state;
    if (film !== undefined) {
      const date = moment(new Date(film.release_date)).format('YYYY');
      const budget = numeral(film.budget).format('0,0');
      let url_img;
      if (film.backdrop_path) {
        url_img = 'https://image.tmdb.org/t/p/w500' + film.backdrop_path;
      } else {
        url_img = '../assets/Images/fond.jpg';
      }
      return (
        <ScrollView style={(styles.scrollView_container, MainStyles.Content)}>
          <Image style={styles.image} source={{uri: url_img}} />
          <View style={styles.title_container}>
            <Text style={styles.title}>{film.title}</Text>
          </View>
          <View
            style={{
              borderBottomColor: '#3f3d3f',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.header_details_container}>
            <Text style={styles.content_header_details}>{date}</Text>
            <Text style={styles.content_header_details}>
              {film.vote_average}/10
            </Text>
            {this._displayFloatingPlayingButton(styles.play_button_header)}
          </View>
          <View
            style={{
              borderBottomColor: '#3f3d3f',
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginBottom: 12,
            }}
          />
          <View style={styles.content_container}>
            <Text style={styles.content}>{film.overview}</Text>
            <TouchableOpacity
              style={styles.favorite_container}
              onPress={() => {
                this._toggleFavorite();
              }}>
              {this._displayFavoriteImage()}
            </TouchableOpacity>
            <View>
              <ActorsHook idFilm={film.id} />
              <CompaniesHook
                companies={film.production_companies}
                budget={budget}
              />
              <ImagesHook idFilm={film.id} />
              <RecommandationsHook idFilm={film.id} />
            </View>
          </View>
        </ScrollView>
      );
    }
  };

  _shareFilms = () => {
    const {film} = this.state;
    Share.share({title: film.title, message: film.overview});
  };

  _launchYoutubeVideo = () => {
    YouTubeStandaloneAndroid.playVideo({
      apiKey: 'AIzaSyAiiDkfBkDa7vSO5ad8Ux4y2P7O8BEmtrg', // Your YouTube Developer API Key
      videoId: this.state.video.key, // YouTube video ID
      autoplay: true, // Autoplay the video
      // startTime: 120, // Starting point of video (in seconds)
      lightboxMode: false,
    })
      .then(() => console.log('Standalone Player Exited'))
      .catch(errorMessage => console.error(errorMessage));
  };

  _displayFloatingActionButton = () => {
    return (
      <TouchableOpacity
        style={styles.share_touchable_floatingactionbutton}
        onPress={() => {
          this._shareFilms();
        }}>
        <Image
          style={styles.share_image}
          source={require('../assets/Images/share_white.png')}
        />
      </TouchableOpacity>
    );
  };

  _displayFloatingPlayingButton = (
    mystyle = styles.play_touchable_floatingactionbutton,
  ) => {
    if (this.state.video) {
      return (
        <TouchableOpacity
          style={mystyle}
          onPress={() => {
            this._launchYoutubeVideo();
          }}>
          <Image
            style={styles.play_image}
            source={require('../assets/Images/play.png')}
          />
        </TouchableOpacity>
      );
    }
  };

  _apiMoviesRequest = () => {
    getFilmDetailFromApi(this.state.filmParam).then(film => {
      getFilmVideosFromApi(film.id).then(videos => {
        console.log(videos);
        let video;
        let isYoutube = true;
        videos.results.map(item => {
          if (isYoutube && item.site === 'YouTube') {
            isYoutube = false;
            video = item;
          }
        });
        this.setState({
          video,
          film,
          isLoading: false,
        });
      });
    });
  };

  componentDidMount() {
    this._apiMoviesRequest();
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayFilm()}
        <Loadable styles={styles.loadable} isLoading={this.state.isLoading} />
        {this._displayFloatingActionButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'row',
    height: 190,
  },
  image: {
    height: 170,
    margin: 2,
  },
  title: {
    color: '#b5b5b5',
    textAlign: 'center',
    fontFamily: 'Bungee Inline',
    fontSize: 35,
    margin: 1,
  },
  header_details_container: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  play_button_header: {},
  content_header_details: {
    fontSize: 30,
    fontFamily: 'Luckiest Guy',
    color: '#b5b5b5',
  },
  content_container: {
    alignItems: 'stretch',
  },
  content: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 3,
    marginBottom: 12,
    fontSize: 16,
  },
  genres: {
    flexDirection: 'row',
    color: '#A3A3A3',
  },
  details_container: {
    marginTop: 6,
    color: '#A3A3A3',
  },
  details: {
    margin: 3,
  },
  loadable: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView_container: {
    flex: 1,
  },
  favorite_container: {
    alignItems: 'center',
  },
  favorite_image: {
    width: 40,
    height: 36,
    marginBottom: 10,
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#3f3d3f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  play_touchable_floatingactionbutton: {
    position: 'absolute',
    right: 10,
    top: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  play_image: {
    width: 105,
    height: 50,
  },
  share_image: {
    width: 30,
    height: 30,
  },
});
const mapStateToProps = state => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm,
    youtubeComponent: state.setYoutubeComponent.youtubeComponent,
  };
};
export default connect(mapStateToProps)(FilmDetails);
