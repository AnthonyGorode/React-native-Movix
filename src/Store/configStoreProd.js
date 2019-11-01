import { createStore, combineReducers } from 'redux';
import toggleFavorite from './Reducers/FavoriteReducer';
import setAvatar from './Reducers/AvatarReducer';
import setYoutubeComponent from './Reducers/YoutubeReducer';

export default createStore(combineReducers({ toggleFavorite, setAvatar, setYoutubeComponent}));