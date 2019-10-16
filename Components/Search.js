import React, { Component } from 'react';
import { StyleSheet,View, Button, TextInput } from 'react-native';

import FilmList from './FilmList';
import { searchMovieByQuery, moviesDiscover } from '../Config/API/apiMovies';
import Loadable from './utils/Loadable';
import { connect } from 'react-redux';

class Search extends Component {
    constructor(props){
        super(props);

        this.searchText = "";
        this.page = 0;
        this.totalPages = 0;

        this.state = {
            films : [],
            isLoading: true
        }

    }

    _searchFilms = () => {
        this.page = 0;
        this.totalPages = 0;

        this.setState({
            films : []
        }, () => {
            
            this._loadFilms();
        })
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
                console.log("Page : " + this.page + " TotalPages : " + this.totalPages + " Nombre de films : " + this.state.films.length);
            })
        }
    }

    /**
     * Search the movies by default
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
            films : [...this.state.films, ...data.results],
            isLoading: false
        })
    }

    _searchTextInputChanged = (searchText) => {
        this.searchText = searchText
    }

    _displayDetailsFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetails", { "idFilm": idFilm })
    }

    componentDidMount = () => {
        this._loadFilmsDiscover();
    }

    componentDidUpdate = () => {
        
    }

    render(){
        
        return (
            <View style={styles.container}>
                <TextInput 
                    onSubmitEditing={ () => this._searchFilms() } 
                    onChangeText={(text) => this._searchTextInputChanged(text) } 
                    style={styles.search}
                    placeholder="Titre du film"
                />
                <Button 
                    style={styles.button}
                    title="Rechercher"
                    onPress={ () => this._searchFilms() }
                />

                <FilmList
                    films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
                    navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
                    loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
                    page={this.page}
                    totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
                />
                                    
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
        flex: 1
    },
    search:{
        margin: 5,
        height: 50,
        borderWidth: 0.2,
        borderColor: "grey",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.60,

        elevation: 1,
        paddingLeft: 5
    },
    button: {
        height: 50
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

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(Search)