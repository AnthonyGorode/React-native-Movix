// Components/FilmList.js

import React, { PureComponent } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

class FilmList extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      films: []
    }
  }

  _displayDetailsFilm = (idFilm) => {
    console.log("Display film " + idFilm)
    // On a récupéré les informations de la navigation, on peut afficher le détail du film
    this.props.navigation.navigate(
      "FilmDetails", 
      { 
          "idFilm": idFilm, 
          "youtubeComponent": this.props.youtubeComponent 
      }
    )
  }

  _renderItem = ({item}) => (
    <FilmItem
        key={item.id}
        film={item} 
        isFavoriteFilm={this.props.favoritesFilm.findIndex(
            film => film.id === item.id) !== -1 ? true : false
        }
        displayDetailsFilm={this._displayDetailsFilm}
        searchFilm={this.props.searchFilm}
        isHorizontal={this.props.isHorizontal}
    />
  )

  render = () => {
    return (
        <FlatList
          horizontal={this.props.isHorizontal}
          style={styles.list}
          data={this.props.films}
          extraData={this.props.favoritesFilm}
          keyExtractor={(item) => item.id.toString()}
          renderItem={this._renderItem}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          onEndReachedThreshold={0.5}
          onEndReached={ () => { 
            if(this.props.page < this.props.totalPages){
                this.props.loadFilms();
            }
         }
        }
        />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm
  }
}

export default connect(mapStateToProps)(FilmList)