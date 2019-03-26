import {combineReducers} from 'redux';
import authReducer from './auth-reducer';
import searchGifsReducer from './search-gifs-reducer';
import favoriteGifsReducer from './favorite-gifs-reducer';
import userReducer from './user-reducer';

export default combineReducers({
  authentication: authReducer,
  searchedGifs: searchGifsReducer,
  favoriteGifs: favoriteGifsReducer,
  user: userReducer
});
