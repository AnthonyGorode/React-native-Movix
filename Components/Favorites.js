import React, { Component } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import FilmList from './FilmList';
import Loadable from './utils/Loadable';


class Favorites extends Component {

    constructor(props){
        super(props)

        this.page = 0;
        this.totalPages = 0;

        this.state = {
            isLoading: true
        }
    }

    componentDidMount = () => {
        console.log(this.props)
        this.setState({
            isLoading: false
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <ScrollView
                    ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight)=>{        
                        this.scrollView.scrollToEnd({animated: true});
                    }}
                >
                    <FilmList
                        films={this.props.favoritesFilms} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
                        navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
                    />
                </ScrollView>
    
                <Loadable 
                    style={styles.loadable} 
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
    loadable: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    avatar_container: {
        alignItems: 'center'
    }
})

const mapStateToProps = state => {
    return {
        favoritesFilms: state.toggleFavorite.favoritesFilm
    }
}

export default connect(mapStateToProps)(Favorites)