import React, { Component } from 'react';
import { View, Share, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Loadable from './utils/Loadable';
import { getFilmDetailFromApi } from '../Config/API/apiMovies';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'react-redux';
import EnlargeShrink from '../Animations/EnlargeShrink'

class FilmDetails extends Component {

    constructor(props) {
        
        super(props);
        this.state = {
            film: undefined,
            isLoading: true
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

    _displayFilm = () => {
        const film = this.state.film;
        if(film !== undefined){
            const date = moment(new Date(film.release_date)).format("DD/MM/YYYY");
            const budget = numeral(film.budget).format('0,0');
            const url_img = 'https://image.tmdb.org/t/p/w500' + film.backdrop_path
            return (
                <ScrollView style={styles.scrollView_container}>
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

    _displayFloatingActionButton = () => {
        return (
            <TouchableOpacity
                style={styles.share_touchable_floatingactionbutton}
                onPress={() => {this._shareFilms()}}
            >
                <Image 
                    style={styles.share_image}
                    source={require('../assets/Images/ic_share.png')}
                />
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.getParam("idFilm")).then(
            film => {
                this.setState({
                    film,
                    isLoading: false
                })
            }
        )
    }

    componentDidUpdate(){
        console.log(this.props.favoritesFilm);
    }

    render(){
        // const { film } = this.state;
        
        // const date = new Date(film.release_date);
        // const day = date.getDate();
        // const month = date.getMonth();
        // const year = date.getFullYear();

        return (
            <View style={styles.main_container}> 
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
    title_container: {
        
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 28,
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
        flexDirection: "row"
    },
    details_container: {
        marginTop: 6
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
        width: 60,
        height: 53
    },
    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
      },
      share_image: {
        width: 30,
        height: 30
      }
})
const mapStateToProps = state => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}
export default connect(mapStateToProps)(FilmDetails)