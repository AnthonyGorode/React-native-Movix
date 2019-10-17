import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation';
import Search from '../Components/Search';
import FilmDetails from '../Components/FilmDetails';
import Favorites from '../Components/Favorites';
import Avatar from '../Components/Avatar'

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: "Rechercher",
            headerRight: <Avatar/>
        }
    },
    FilmDetails: {
        screen: FilmDetails,
        navigationOptions: {
            headerRight: <Avatar/>
        }
    }
})

const FavoritesStackNavigator = createStackNavigator({
    Favorites: {
      screen: Favorites,
      navigationOptions: {
        title: 'Favoris',
        headerRight: <Avatar/>
      }
    },
    FilmDetails: {
      screen: FilmDetails,
      navigationOptions: {
        headerRight: <Avatar/>
      }
    }
})

const MoviesTabNavigator = createBottomTabNavigator({
    Search: {
        screen: SearchStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image 
                    source={require('../assets/Images/ic_search.png')} 
                    style={styles.icon} 
                />
            }
        }
    },
    Favorites: {
        screen: FavoritesStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image 
                    source={require('../assets/Images/ic_favorite.png')} 
                    style={styles.icon} 
                />
            }
        }
    } 
},{
    tabBarOptions: {
        showLabel: false,
        showIcon: true,
        activeBackgroundColor: '#DDD',
        inactiveBackgroundColor: '#FFF'
    }
})

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default createAppContainer(MoviesTabNavigator)