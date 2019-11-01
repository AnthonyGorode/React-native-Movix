import React, { useState, useEffect } from 'react'
import { FlatList, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { getFilmActorsFromApi, getFilmImagesFromApi, getFilmRecommandationsFromApi } from '../../../Config/API/apiMovies';

export const ActorsHook = props => {
    const [actors, setActors] = useState("")
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const abortController = new AbortController();
        // signal should be given an to header of fetch method
        // const signal = abortController.signal;
        (async function() {
          setIsError(false);
          try {
            getFilmActorsFromApi(props.idFilm).then(
                actors => {
                    tenActors = actors.cast.filter((element,index) => index <= 9)
                    setActors(tenActors)
                }
            );
          } catch (error) {
            setIsError(true);
          }
          console.log("HEY!!!")
        })();
        return function cleanup(){
          abortController.abort();
        };
    }, []);
    
    _listActors = () => {
        if(actors)
            return (
                <>
                    <View style={ styles.title_companies_container }>
                        <Text style={styles.title_list}>CASTING</Text>
                    </View>
                    <FlatList
                        extraData={actors}
                        horizontal={true}
                        data={actors}
                        keyExtractor={item => item.cast_id.toString()}
                        renderItem={({item}) => _templateActors(item)}                
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                    />
                </>
            )
        else
            return (
                <View></View>
            )
    }
    _templateActors = (actor) => {
        const keyUrl = 'https://image.tmdb.org/t/p/w500'+ actor.profile_path
        if(actor.profile_path != null)
            url_img = {uri: 'https://image.tmdb.org/t/p/w500'+ actor.profile_path, cache:'force-cache'}
        else
            url_img = require('../../../assets/Images/no-image.jpg')
        return (
            <View style={styles.actor_container}>
                <Image
                    style={styles.actor_image}
                    source={url_img}
                    key={keyUrl}
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

export const CompaniesHook = props => {

    _listCompanies = () => {
        if(props.companies)
            return (
                <>
                    <View style={ styles.title_companies_container }>
                        <Text style={styles.title_list}>PRODUCTIONS</Text>
                        <Text style={styles.budget}>{props.budget} $</Text>
                    </View>
                    <FlatList
                        extraData={props.companies}
                        horizontal={true}
                        data={props.companies}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => this._templateCompanies(item)}                
                        initialNumToRender={10}
                        // maxToRenderPerBatch={10}
                    />
                </>
            )
        else
            return (
                <View></View>
            )
    }
    _templateCompanies = (company) => {
        if(company.logo_path != null)
            url_img = {uri: 'https://image.tmdb.org/t/p/w500'+ company.logo_path}
        else
            url_img = require('../../../assets/Images/no-image.jpg')
        return (
            <View key={company.id} style={styles.company_container}>
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

    return (
        _listCompanies()
    )
}

export const ImagesHook = props => {
    const [images, setImages] = useState("")
    const [isError, setIsError] = useState(false)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const abortController = new AbortController();
        (async function() {
          setIsError(false);
          try {
            getFilmImagesFromApi(props.idFilm).then(
                images => { 
                    tenImages = images.backdrops.filter((element,index) => index <= 9)
                    setImages(tenImages)
                }
            )
          } catch (error) {
            setIsError(true);
          }
          console.log("HOOO!!!")
          setRefresh(false)
        })();
        return function cleanup(){
          abortController.abort();
        };
    }, []);

    _handleRefresh = () => {
        setRefresh(true)
    }

    _listImages = () => {
        if(images)
            return (
                <>
                    <View style={ styles.title_companies_container }>
                        <Text style={styles.title_list}>IMAGES</Text>
                    </View>
                    <FlatList 
                        extraData={props.idFilm}
                        horizontal={true}
                        data={images}
                        keyExtractor={item => item.file_path.toString()}
                        renderItem={({item}) => this._templateImages(item)}                
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        refreshing={refresh}
                        onRefresh={() => _handleRefresh()}
                    />
                </>
            )
        else
            return (
                <View></View>
            )
    }
    _templateImages = (image) => {
        const keyUrl = 'https://image.tmdb.org/t/p/w500'+ image.file_path
        if(image.file_path != null)
            url_img = {uri: 'https://image.tmdb.org/t/p/w500'+ image.file_path, cache: 'force-cache'}
        else
            url_img = require('../../../assets/Images/no-image.jpg')
        return (
            <View key={keyUrl} style={styles.image_container}>
                <Image
                    style={styles.image_image}
                    source={url_img}
                    key={keyUrl}
                />
            </View>
        )
    }

    return (
        _listImages()
    )
}

export const RecommandationsHook = props => {
    const [filmsRecommands, setFilmsRecommands] = useState("")
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const abortController = new AbortController();
        (async function() {
          setIsError(false);
          try {
            getFilmRecommandationsFromApi(props.idFilm).then(
                filmsRecommands => {
                    tenRecommands = filmsRecommands.results.filter((element,index) => index <= 9)
                    setFilmsRecommands(tenRecommands); 
                }
            )
          } catch (error) {
            setIsError(true);
          }
          console.log("HAAA!!!")
        })();
        return function cleanup(){
          abortController.abort();
        };
    }, []);

    _listRecommandations = () => {
        if(filmsRecommands)
            return (
                <>
                    <View style={ styles.title_companies_container }>
                        <Text style={styles.title_list}>RECOMMANDATIONS</Text>
                    </View>
                    <FlatList 
                        extraData={filmsRecommands}
                        horizontal={true}
                        data={filmsRecommands}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => this._templateRecommandations(item)}                
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                    />
                </>
            )
        else
            return (
                <View></View>
            )
    }
    _templateRecommandations = (recommand) => {
        const keyUrl = 'https://image.tmdb.org/t/p/w500'+ recommand.poster_path
        if(recommand.poster_path != null)
            url_img = {uri: 'https://image.tmdb.org/t/p/w500'+ recommand.poster_path}
        else
            url_img = require('../../../assets/Images/no-image.jpg')
        return (
            <TouchableOpacity
                key={recommand.id} 
                style={styles.image_container}
                // onPress={() => this._displayDetailsFilm(recommand)}
            >
                <Image
                    style={styles.recommand_image}
                    source={url_img}
                    key={keyUrl}
                />
            </TouchableOpacity>
        )
    }

    return (
        _listRecommandations()
    )
}

const styles = StyleSheet.create({
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
        flex: 1,
        width: 120,
        height: 180,
        margin: 5,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        resizeMode: 'contain'
    },
})