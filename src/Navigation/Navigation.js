/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Home from '../Components/Home';
import Search from '../Components/Search';
import FilmDetails from '../Components/FilmDetails';
import Favorites from '../Components/Favorites';
import Avatar from '../Components/Avatar';
import MainStyles from '../Components/styles/Styles';
// import Test from '../Components/Test';
// import Test2 from '../Components/Test2';

const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: (
        <Text
          style={{color: '#922e33', fontFamily: 'Bungee Shade', fontSize: 26}}>
          ACCUEIL
        </Text>
      ),
      headerRight: <Avatar />,
      headerStyle: MainStyles.Navigation,
    },
  },
  FilmDetails: {
    screen: FilmDetails,
    navigationOptions: {
      headerRight: <Avatar />,
      headerStyle: MainStyles.Navigation,
    },
  },
});

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      headerTitle: (
        <Text
          style={{color: '#922e33', fontFamily: 'Bungee Shade', fontSize: 26}}>
          RECHERCHER
        </Text>
      ),
      headerRight: <Avatar />,
      headerStyle: MainStyles.Navigation,
    },
  },
  FilmDetails: {
    screen: FilmDetails,
    navigationOptions: {
      headerRight: <Avatar />,
      headerStyle: MainStyles.Navigation,
    },
  },
});

const FavoritesStackNavigator = createStackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      headerTitle: (
        <Text
          style={{color: '#922e33', fontFamily: 'Bungee Shade', fontSize: 26}}>
          FAVORIS
        </Text>
      ),
      headerRight: <Avatar />,
      headerStyle: MainStyles.Navigation,
    },
  },
  FilmDetails: {
    screen: FilmDetails,
    navigationOptions: {
      headerRight: <Avatar />,
      headerStyle: MainStyles.Navigation,
    },
  },
});

const MoviesTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <Image
              source={require('../assets/Images/home_white.png')}
              style={styles.icon}
            />
          );
        },
      },
    },
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <Image
              source={require('../assets/Images/search_white.png')}
              style={styles.icon}
            />
          );
        },
      },
    },
    Favorites: {
      screen: FavoritesStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <Image
              source={require('../assets/Images/favorite_white.png')}
              style={styles.icon}
            />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeBackgroundColor: '#3f3d3f',
      inactiveBackgroundColor: MainStyles.Navigation.backgroundColor,
    },
    // resetOnBlur:true
  },
);

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});

export default createAppContainer(MoviesTabNavigator);
