import { createStore, combineReducers } from 'redux';
import toggleFavorite from './Reducers/FavoriteReducer';
import setAvatar from './Reducers/AvatarReducer'

export default createStore(combineReducers({ toggleFavorite, setAvatar }))