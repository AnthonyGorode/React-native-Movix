import React, { useState, useEffect } from 'react'
import { getFilmActorsFromApi } from '../../../Config/API/apiMovies';

export const ActorsHook = props => {
    const [idFilm, setIdFilm] = useState(props.idFilm)
    var actors = []

    useEffect(() => {
        getFilmActorsFromApi(idFilm).then(
            actorsApi => {
                actors = actorsApi.cast
            }
        )
    })

    _listActors = () => {
        if(actors)
            return (
                <FlatList 
                    horizontal={true}
                    data={actors}
                    keyExtractor={item => item.cast_id.toString()}
                    renderItem={({item}) => _templateActors(item)}
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

    return (
        _listActors()
    )
}