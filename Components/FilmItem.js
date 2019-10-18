import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FadeIn from '../Animations/FadeIn'
import OpacityHeartItem from '../Animations/OpacityHeartItem'
// import Animated from 'react-native-reanimated';

export default class FilmItem extends Component {
    constructor(props) {
        super(props)
    }

    _displayFavoriteImage = () => {
        if(this.props.isFavoriteFilm){
            return (
                <OpacityHeartItem
                    source={require("../assets/Images/ic_heart_full.png")}
                    style={this.props.isHorizontal ? styles.favorite_image_is_horizontal : styles.favorite_image}
                />
            )
        }
    }

    render() {
        const { film, displayDetailsFilm } = this.props

        const url_img = 'https://image.tmdb.org/t/p/w500'+ film.poster_path
        const date = new Date(film.release_date);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return (
            <FadeIn searchFilm={this.props.searchFilm}>
                <TouchableOpacity 
                    style={styles.main_container}
                    onPress={ () => displayDetailsFilm(film.id) }
                >
                    <Image
                        style={styles.image}
                        source={{ uri: url_img }}
                    />
                    {this.props.isHorizontal ? (
                        this._displayFavoriteImage()
                    ) : (
                        <View style={styles.content_container}>
                            <View style={styles.header_container}>
                                {this._displayFavoriteImage()}
                                <Text style={styles.title_text}>{ film.title }</Text>
                                <Text style={styles.vote_text}>{ film.vote_average }/10</Text>
                            </View>
                            <View style={styles.description_container}>
                                <Text style={styles.description_text} numberOfLines={6}>{film.overview }</Text>
                            </View>
                            <View style={styles.date_container}>
                                <Text style={styles.date_text}>Sorti le {`${day}/${month}/${year}`}</Text>
                            </View>
                        </View>
                    )}
                </TouchableOpacity>
            </FadeIn>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        height: 190
    },
    image: {
        width: 120,
        height: 180,
        margin: 5
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    description_container: {
        flex: 7
    },
    date_container: {
        flex: 1
    },
    title_text: {
        flex: 1,
        fontSize: 20,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#666666'
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    },
    favorite_image: {
        width: 27,
        height: 25
    },
    favorite_image_is_horizontal: {
        width: 27,
        height: 25,
        position: 'absolute',
        left: 8,
        right: 0,
        top: 10,
        bottom: 0,
    }
})