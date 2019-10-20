import React, { Component } from 'react';
import { View, Share, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Loadable from './utils/Loadable';
import { getFilmDetailFromApi,getFilmVideosFromApi } from '../Config/API/apiMovies';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'react-redux';
import EnlargeShrink from './utils/Animations/EnlargeShrink'
import MainStyles from './styles/Styles'
import YouTube, { YouTubeStandaloneAndroid } from 'react-native-youtube'
import { NavigationEvents } from 'react-navigation'

class FilmDetails extends Component {

    constructor(props) {
        
        super(props);
        this.state = {
            film: undefined,
            video: undefined,
            isLoading: true,
            apiKey: "AIzaSyAiiDkfBkDa7vSO5ad8Ux4y2P7O8BEmtrg",
            fullscreen: false,
            isPlaying: true,
            isLooping: false,
        }

    }

    _toggleFavorite = () => {
        const action = { type: "TOOGLE_FAVORITE", value: this.state.film }
        this.props.dispatch(action); 
    }

    // async heart_beat() {
    //     try {
    //         await this.state.soundObject.loadAsync(require('../utils/sounds/heart-beat.mp3'));
    //         await this.state.soundObject.playAsync();
    //         // Your sound is playing!
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // async stop_heart_beat() {
    //     try {
    //         await this.state.soundObject.unloadAsync()
    //         // Your sound is playing!
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    _displayFavoriteImage = () => {
        let sourceImage = require("../assets/Images/ic_heart_border.png")
        let shouldLarge = false
        const checkFilmFavoris = this.props.favoritesFilm.findIndex(
            item => item.id == this.state.film.id
        )
        if(checkFilmFavoris !== -1){
            sourceImage = require("../assets/Images/ic_heart_full.png")
            shouldLarge = true
        }
        return (
            <EnlargeShrink
                shouldLarge={shouldLarge}
            >
                <Image 
                    source={sourceImage}
                    style={styles.favorite_image}
                />
            </EnlargeShrink>
        )
    }

    // _displayImageOrYoutube = (url_img) => {
    //     const { video } = this.state
    //     if(video === undefined){
    //         console.log("IMAGE")
    //         return (
    //             <TouchableOpacity
    //                 onPress={ () => {
    //                     this._launchYoutubeVideo()
    //                 } }
    //             >
    //                 <Image
    //                     style={styles.image}
    //                     source={{ uri: url_img }}
    //                 /> 
    //             </TouchableOpacity>
    //         )
    //     }          
    // }

    _displayFilm = () => {
        const { film } = this.state
        if(film !== undefined){
            const date = moment(new Date(film.release_date)).format("DD/MM/YYYY");
            const budget = numeral(film.budget).format('0,0');
            if(film.backdrop_path)
                url_img = 'https://image.tmdb.org/t/p/w500' + film.backdrop_path
            else
                url_img = '../assets/Images/fond.jpg'
            return (
                <ScrollView style={styles.scrollView_container,MainStyles.Content}>
                    
                    <Image
                        style={styles.image}
                        source={{ uri: url_img }}
                    /> 
                    <View style={styles.title_container}>
                        <Text style={styles.title} h1>{film.title}</Text>
                    </View>
                    <View style={styles.content_container}>
                        <Text style={styles.content}>{film.overview}</Text>
                        <TouchableOpacity 
                            style={styles.favorite_container}
                            onPress={ () => { 
                                    this._toggleFavorite() 
                                } 
                            } >
                            {this._displayFavoriteImage()}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.details_container}>
                        <Text style={styles.details_container}>Sortie le {date}</Text>
                        <Text style={styles.details_container}>Note : {film.vote_average}/10</Text>
                        <Text style={styles.details_container}>Nombre de votes : {film.vote_count}</Text>
                        <Text style={styles.details_container}>Budget : {budget} $</Text>
                        <Text style={styles.details_container}>Note : {film.vote_average}/10</Text>
                        
                        <Text style={styles.genres}>Genres : {this._iterateDatasFilms(film.genres)}</Text>
                        <Text style={styles.genres}>Companies : {this._iterateDatasFilms(film.production_companies)}</Text>
                    </View>
                </ScrollView>
            )
        }
    }

    _iterateDatasFilms = (datas) => {
        let result = "";
        for( i = 0; i < datas.length; i++){
            iteration = datas[i].name;
            if((i + 1) < datas.length) 
               iteration += " / "
            result += iteration
        }
        return result;
    }

    _shareFilms = () => {
        const { film } = this.state
        Share.share({title: film.title, message: film.overview})
    }

    _launchYoutubeVideo = () => {
        YouTubeStandaloneAndroid.playVideo({
            apiKey: this.state.apiKey, // Your YouTube Developer API Key
            videoId: this.state.video.key, // YouTube video ID
            autoplay: true, // Autoplay the video
            // startTime: 120, // Starting point of video (in seconds)
            lightboxMode: false
        })
        .then(() => console.log('Standalone Player Exited'))
        .catch(errorMessage => console.error(errorMessage));
    }

    _displayFloatingActionButton = () => {
        return (
            <TouchableOpacity
                style={styles.share_touchable_floatingactionbutton}
                onPress={() => {this._shareFilms()}}
            >
                <Image 
                    style={styles.share_image}
                    source={require('../assets/Images/share_white.png')}
                />
            </TouchableOpacity>
        )
    }

    _displayFloatingPlayingButton = () => {
        if(this.state.video)
            return (
                <TouchableOpacity
                    style={styles.play_touchable_floatingactionbutton}
                    onPress={ () => {
                        this._launchYoutubeVideo()
                    } }
                >
                    <Image 
                        style={styles.play_image}
                        source={require('../assets/Images/play.png')}
                    />
                </TouchableOpacity>
            )
    }

    _toggleYoutubeComponent = (bool = false) => {
        if(bool)
            this.setState({
                video: undefined
            })
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.getParam("idFilm")).then(
            film => {
                this.setState({
                    film,
                    isLoading: false
                })
            }
        ).then(
            () => {
                getFilmVideosFromApi(this.state.film.id).then(
                    videos => {
                        console.log(videos)
                        let video = undefined
                        let isYoutube = true
                        videos.results.map(item => {
                            if(isYoutube && item.site === 'YouTube'){
                                isYoutube = false
                                video = item
                            }                                         
                        })
                        this.setState({
                            video
                        })
                    }
                )
            }
        )
    }

    componentDidUpdate(){
        console.log(this.props.favoritesFilm);
    }

    render(){
        return (
            <View style={styles.main_container}> 
                {/* <NavigationEvents 
                    onWillFocus={() => this._toggleYoutubeComponent()}
                    onWillBlur={() => this._toggleYoutubeComponent(true)}
                /> */}
                {this._displayFilm() }
                <Loadable
                    styles={styles.loadable}
                    isLoading={this.state.isLoading}
                />
                {this._displayFloatingActionButton()}
                {this._displayFloatingPlayingButton()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: 'row',
        height: 190
    },
    image: {
        height: 170,
        margin: 2
    },
    title_container: {
        
    },
    title: {
        textAlign: "center",
        fontFamily: 'Modak',
        fontSize: 35,
        margin: 6
    },
    content_container: {
        alignItems: "stretch"
    },
    content: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 3,
        fontSize: 16
    },
    genres: {
        flexDirection: "row",
        color: '#A3A3A3',
    },
    details_container: {
        marginTop: 6,
        color: '#A3A3A3',
    },
    details: {
        margin: 3
    },
    loadable: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    scrollView_container: {
        flex: 1
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_image: {
        width: 40,
        height: 36
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
        alignItems: 'center'
    },
    play_touchable_floatingactionbutton: {
        position: 'absolute',
        right: 10,
        top: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    play_image: {
        width: 105,
        height: 50
    },
    share_image: {
        width: 30,
        height: 30
    }
})
const mapStateToProps = state => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm,
        youtubeComponent: state.setYoutubeComponent.youtubeComponent
    }
}
export default connect(mapStateToProps)(FilmDetails)