import React, { Component } from 'react';
import { StyleSheet,View,Text, ScrollView } from 'react-native';

import FilmList from './FilmList';
import { moviesPlayingNow, moviesTrending, moviesPopular, moviesDrama, moviesScifi } from '../Config/API/apiMovies';
import Loadable from './utils/Loadable';
import MainStyles from './styles/Styles'

class Home extends Component {
    constructor(props){
        super(props);

        this.page = 0;
        this.totalPages = 0;

        this.state = {
            filmsPlayingNow : false,
            filmsTrending: false,
            filmsPopular: false,
            filmsDrama: false,
            filmsScifi: false,
            isLoading: true,
            isHorizontal: true
        }

    }

    /**
     * Search the movies concerning a data sent
     */
    _loadFilms = () => {
        if(this.searchText.length > 0){
            this.setState({
                isLoading: true
            })
            searchMovieByQuery(this.searchText,this.page + 1).then((data) => {
                this._debugOnlyKeyApiMovie(data);
            })
        }
    }

    /**
     * Search the movies by default
     * DEPRECATED
     */
    _loadFilmsDiscover = () => {
        this.setState({
            isLoading: true
        })
        moviesDiscover().then((data) => {

            this.setState({
                films : [...data.results],
                isLoading: false
            })
            console.log("Page : " + this.page + " TotalPages : " + this.totalPages + " Nombre de films : " + this.state.films.length);
        }).catch((error) => {
            console.log(error)
        })
    }

    /**
     * Search the movies playing now
     */
    _loadFilmsPlayingNow = () => {
        moviesPlayingNow().then((data) => {
            console.log("test");
            this.setState({
                filmsPlayingNow : [...data.results]
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    /**
     * Search trending movies
     */
    _loadFilmsTrending = () => {
        moviesTrending().then((data) => {

            this.setState({
                filmsTrending : [...data.results]
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    /**
     * Search popular movies
     */
    _loadFilmsPopular = () => {
        moviesPopular().then((data) => {

            this.setState({
                filmsPopular : [...data.results]
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    /**
     * Search the movies by default
     */
    _loadFilmsDrama = () => {
        moviesDrama().then((data) => {

            this.setState({
                filmsDrama : [...data.results]
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    /**
     * Search the movies by default
     */
    _loadFilmsScifi = () => {
        moviesScifi().then((data) => {

            this.setState({
                filmsScifi: [...data.results]
            })
        }).catch((error) => {
            console.log(error)
        })
        this.setState({
            isLoading: false
        })
    }

    /**
     * this function resolve the problem concerning the same movie in two different pages
     */
    _debugOnlyKeyApiMovie = (data) => {
        this.page = data.page;
        this.totalPages = data.total_pages;

        let filmsState = [...this.state.films]
        let filmsApi = [...data.results]

        const lastFilm = filmsState.pop()
        const firstFilm = filmsApi.shift()
        
        if( lastFilm !== undefined && lastFilm.id === firstFilm.id){
            data.results.shift()
        }
        this.setState({
            films : [...this.state.films, ...data.results]
        })
    }

    _templateListMovies = () => {
        const { isLoading } = this.state

        if(!isLoading)
            return (
                <ScrollView>
                    <View style={styles.discover_container}>
                        <Text style={MainStyles.Title}>A l'affiche</Text>
                        <FilmList
                            films={this.state.filmsPlayingNow} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
                            navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
                            loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
                            page={this.page}
                            totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
                            isHorizontal={this.state.isHorizontal}
                            youtubeComponent="YoutubeHome"
                        />
                    </View>
    
                    <View style={styles.discover_container}>
                        <Text style={MainStyles.Title}>Tendances</Text>
                        <FilmList
                            films={this.state.filmsTrending} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
                            navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
                            loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
                            page={this.page}
                            totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
                            isHorizontal={this.state.isHorizontal}
                            youtubeComponent="YoutubeHome"
                        />
                    </View>
    
                    <View style={styles.discover_container}>
                        <Text style={MainStyles.Title}>Populaires</Text>
                        <FilmList
                            films={this.state.filmsPopular} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
                            navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
                            loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
                            page={this.page}
                            totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
                            isHorizontal={this.state.isHorizontal}
                            youtubeComponent="YoutubeHome"
                        />
                    </View>
    
                    <View style={styles.drama_container}>
                        <Text style={MainStyles.Title}>Best Dramas</Text>
                        <FilmList
                            films={this.state.filmsDrama} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
                            navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
                            loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
                            page={this.page}
                            totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
                            isHorizontal={this.state.isHorizontal}
                        />
                    </View>
    
                    <View style={styles.scifi_container}>
                        <Text style={MainStyles.Title}>Best Science Fiction</Text>
                        <FilmList
                            films={this.state.filmsScifi} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
                            navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
                            loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
                            page={this.page}
                            totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
                            isHorizontal={this.state.isHorizontal}
                        />
                    </View>
                </ScrollView>
            )
        
    }

    componentDidMount = () => {
        this._loadFilmsPlayingNow()
        this._loadFilmsTrending()
        this._loadFilmsPopular()
        this._loadFilmsDrama()
        this._loadFilmsScifi()
    }

    render(){
        
        return (
            <View style={styles.container,MainStyles.Content}>
                {this._templateListMovies()}                  
                <Loadable 
                    styles={styles.loadable} 
                    isLoading={ this.state.isLoading } 
                />
            </View>
        )
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    discover_container: {
        flex: 4,
    },
    drama_container: {
        flex: 4,
    },
    scifi_container: {
        flex: 4,
    },
    loadable: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Home