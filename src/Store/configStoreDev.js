import { createStore, combineReducers, applyMiddleware } from 'redux';
import toggleFavorite from './Reducers/FavoriteReducer';
import setAvatar from './Reducers/AvatarReducer';
import setYoutubeComponent from './Reducers/YoutubeReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

export default createStore(combineReducers({ toggleFavorite, setAvatar, setYoutubeComponent}), {},composedEnhancer);