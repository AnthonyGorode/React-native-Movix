import { createStore } from 'redux';
import toggleFavorite from './Reducers/FavoriteReducer';

export default createStore(toggleFavorite)