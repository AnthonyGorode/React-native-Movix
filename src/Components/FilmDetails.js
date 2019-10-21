import React, { Component } from 'react';
import { View, Share, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Loadable from './utils/Loadable';
import { 
    getFilmDetailFromApi,
    getFilmVideosFromApi,
    getFilmActorsFromApi,
    getFilmImagesFromApi,
    getFilmRecommandationsFromApi 
} from '../Config/API/apiMovies';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
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
            filmParam: this.props.navigation.getParam("idFilm"),
            video: undefined,
            actors: [],
            images: [],
            recommands: [],
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
            const date = moment(new Date(film.release_date)).format("YYYY");
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
                        <Text style={styles.content_header_details}>{film.vote_average}/10</Text>
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
                            onPress={ () => { 
                                    this._toggleFavorite() 
                                } 
                            } >
                            {this._displayFavoriteImage()}
                        </TouchableOpacity>
                        <View>
                            <View>
                                <Text style={styles.title_list}>CASTING</Text>
                            </View>
                            {this._listActors()}
                            <View style={ styles.title_companies_container }>
                                <Text style={styles.title_list}>PRODUCTIONS</Text>
                                <Text style={styles.budget}>{budget} $</Text>
                            </View>
                            {this._listCompanies()}
                            <View style={ styles.title_companies_container }>
                                <Text style={styles.title_list}>IMAGES</Text>
                            </View>
                            {this._listImages()}
                            <View style={ styles.title_companies_container }>
                                <Text style={styles.title_list}>RECOMMANDATIONS</Text>
                            </View>
                            {this._listRecommandations()}
                        </View>
                    </View>
                    {/* <View style={styles.details_container}>
                        <Text style={styles.details_container}>Sortie le {date}</Text>
                        <Text style={styles.details_container}>Note : {film.vote_average}/10</Text>
                        <Text style={styles.details_container}>Nombre de votes : {film.vote_count}</Text>
                        <Text style={styles.details_container}>Budget : {budget} $</Text>
                        <Text style={styles.details_container}>Note : {film.vote_average}/10</Text>
                        
                        <Text style={styles.genres}>Genres : {this._iterateDatasFilms(film.genres)}</Text>
                        <Text style={styles.genres}>Companies : {this._iterateDatasFilms(film.production_companies)}</Text>
                    </View> */}
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

    _displayFloatingPlayingButton = (mystyle = styles.play_touchable_floatingactionbutton) => {
        if(this.state.video)
            return (
                <TouchableOpacity
                    style={mystyle}
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

    _listActors = () => {
        if(this.state.actors)
            return (
                <FlatList 
                    horizontal={true}
                    data={this.state.actors}
                    keyExtractor={item => item.cast_id.toString()}
                    renderItem={({item}) => this._templateActors(item)}
                />
            )
    }
    _templateActors = (actor) => {
        if(actor.profile_path != null)
            url_img = {uri: 'https://image.tmdb.org/t/p/w500'+ actor.profile_path}
        else
            url_img = require('../assets/Images/no-image.jpg')
        return (
            <View style={styles.actor_container}>
                <Image
                    style={styles.actor_image}
                    source={url_img}
                />
                <View style={styles.names_container}>
                    <View style={styles.actor_name_container}>
                        <Text style={styles.actor_name}>{actor.name}</Text>
                    </View>
                    <View style={styles.character_name_container}>
                        <Text style={styles.actor_character}>{actor.character}</Text>
                    </View>
                </View>
            </View>
        )
    }

    _listCompanies = () => {
        if(this.state.film)
            return (
                <FlatList 
                    horizontal={true}
                    data={this.state.film.production_companies}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => this._templateCompanies(item)}
                />
            )
    }
    _templateCompanies = (company) => {
        if(company.logo_path != null)
            url_img = {uri: 'https://image.tmdb.org/t/p/w500'+ company.logo_path}
        else
            url_img = require('../assets/Images/no-image.jpg')
        return (
            <View style={styles.company_container}>
                {/* <Image
                    style={styles.company_image}
                    source={url_img}
                /> */}
                <View style={styles.names_container}>
                    <View style={styles.company_name_container}>
                        <Text style={styles.company_name}>{company.name}</Text>
                    </View>
                </View>
            </View>
        )
    }

    _listImages = () => {
        if(this.state.images)
            return (
                <FlatList 
                    horizontal={true}
                    data={this.state.images}
                    keyExtractor={item => item.file_path.toString()}
                    renderItem={({item}) => this._templateImages(item)}
                />
            )
    }
    _templateImages = (image) => {
        if(image.file_path != null)
            url_img = {uri: 'https://image.tmdb.org/t/p/w500'+ image.file_path}
        else
            url_img = require('../assets/Images/no-image.jpg')
        return (
            <View style={styles.image_container}>
                <Image
                    style={styles.image_image}
                    source={url_img}
                />
            </View>
        )
    }

    _listRecommandations = () => {
        if(this.state.recommands)
            return (
                <FlatList 
                    horizontal={true}
                    data={this.state.recommands}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => this._templateRecommandations(item)}
                />
            )
    }
    _templateRecommandations = (recommand) => {
        if(recommand.poster_path != null)
            url_img = {uri: 'https://image.tmdb.org/t/p/w500'+ recommand.poster_path}
        else
            url_img = require('../assets/Images/no-image.jpg')
        return (
            <TouchableOpacity 
                style={styles.image_container}
                // onPress={() => this._displayDetailsFilm(recommand)}
            >
                <Image
                    style={styles.recommand_image}
                    source={url_img}
                />
            </TouchableOpacity>
        )
    }

    
    _displayDetailsFilm = (film) => {
        this.setState({
            film,
            filmParam: film.id
        })
    }

    _apiMoviesRequest = () => {
        const { id } = this.state.film
        getFilmVideosFromApi(id).then(
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
        getFilmActorsFromApi(id).then(
            actors => {
                this.setState({
                    actors: actors.cast
                })
            }
        )
        getFilmImagesFromApi(id).then(
            images => {
                console.log(images)
                this.setState({
                    images: images.backdrops
                })
            }
        )
        getFilmRecommandationsFromApi(id).then(
            recommands => {
                this.setState({
                    recommands: recommands.results
                })
            }
        )
    }

    componentDidMount() {
        
        getFilmDetailFromApi(this.state.filmParam).then(
            film => {
                this.setState({
                    film,
                    isLoading: false
                })
            }
        ).then(
            () => {
                this._apiMoviesRequest()
            }
        )
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
    title: {
        color: "#b5b5b5",
        textAlign: "center",
        fontFamily: 'Bungee Inline',
        fontSize: 35,
        margin: 1
    },
    header_details_container: {
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    play_button_header: {

    },
    content_header_details: {
        fontSize: 30,
        fontFamily: "Luckiest Guy",
        color: "#b5b5b5"
    },  
    content_container: {
        alignItems: "stretch"
    },
    content: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 3,
        marginBottom: 12,
        fontSize: 16
    },
    title_list: {
        color: "#b5b5b5",
        fontFamily: 'Modak',
        fontSize: 28
    },
    actor_container: {
        flex: 1,
        backgroundColor: '#3f3d3f',
        margin: 5,
        borderRadius: 6,
    },
    actor_image: {
        width: 120,
        height: 180,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6
    },
    names_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    actor_name_container: {
        width: 120,
    },
    character_name_container: {
        width: 120,
    },
    actor_name: {
        flex: 1,
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        fontFamily: 'fantasy'
    },
    actor_character: {
        flex: 1,
        fontSize: 18,
        fontStyle: 'italic',
        textAlign: 'center',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        fontFamily: 'cursive'
    },
    company_container: {
        flex: 1,
        backgroundColor: '#3f3d3f',
        margin: 5,
        borderRadius: 6,
    },
    company_image: {
        width: 180,
        height: 180,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6
    },
    company_name_container: {
        padding: 10
    },
    company_name: {
        flex: 1,
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        fontFamily: 'fantasy'
    },
    title_companies_container: {
        marginTop: 15,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    budget: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#666666'
    },
    image_container: {
        flex: 1,
        backgroundColor: '#3f3d3f',
        margin: 5,
        borderRadius: 6,
    },
    image_image: {
        width: 350,
        height: 300,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6
    },
    recommand_image: {
        width: 120,
        height: 180,
        margin: 5,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6
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
        height: 36,
        marginBottom: 10
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