import axios from 'axios';

import {
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  SEARCH_GIFS_REQUEST,
  SEARCH_GIFS_SUCCESS,
  FAVORITE_GIF_SAVE_REQUEST,
  FAVORITE_GIF_SAVE_SUCCESS,
  FAVORITE_GIF_LIST_REQUEST,
  FAVORITE_GIF_LIST_SUCCESS,
  GET_GIPHY_GIFS_LIST_REQUEST,
  GET_GIPHY_GIFS_LIST_SUCCESS,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  DELETE_GIF_REQUEST,
  DELETE_GIF_SUCCESS,
  CHANGE_CATEGORY_SUCCESS
} from '../constants/action-types';

const getUsersFavoriteGifs = userId => async dispatch => {
  dispatch({type: FAVORITE_GIF_LIST_REQUEST});

  //Make call using axios to Giphy
  const response = await axios.get(`/api/current-user/${userId}/gifs`);

  dispatch({
    type: FAVORITE_GIF_LIST_SUCCESS,
    response: response.data
  });

  if (response.data && response.data.length > 0) {
    dispatch(getAllFavoriteGifsFromGiphy(response.data));
  }
};

//redux-thunk picks this up and passes in dispatch so we can use it
//Using ES2017 async await
export const getUser = () => async dispatch => {
  dispatch({type: GET_USER_REQUEST});

  //TODO: add in error handling later including 404
  const response = await axios.get('/api/current-user');
  dispatch({type: GET_USER_SUCCESS, payload: response.data});

  if (response.status >= 200 && response.status < 400) {
    dispatch(getUserInformation(response.data.id));
    dispatch(getUsersFavoriteGifs(response.data.id));
  }
};

// example of a thunk using the redux-thunk middleware
export const getGifsFromGiphy = searchText => async dispatch => {
  dispatch({type: SEARCH_GIFS_REQUEST});

  //Make call using axios to Giphy
  const response = await axios.get(
    `https://api.giphy.com/v1/gifs/search?q=${searchText}&api_key=${
      process.env.REACT_APP_GIPHY_KEY
    }&rating=g&limit=15`
  );

  dispatch({
    type: SEARCH_GIFS_SUCCESS,
    response: response.data
  });
};

// example of a thunk using the redux-thunk middleware
const getAllFavoriteGifsFromGiphy = gifs => async dispatch => {
  dispatch({type: GET_GIPHY_GIFS_LIST_REQUEST});

  let gifIds = '';
  gifs.forEach((gif, index) => {
    if (index === 0) {
      gifIds += gif.id;
    } else {
      gifIds += `,${gif.id}`;
    }
  });

  const response = await axios.get(
    `https://api.giphy.com/v1/gifs?api_key=${
      process.env.REACT_APP_GIPHY_KEY
    }&ids=${gifIds}`
  );

  dispatch({
    type: GET_GIPHY_GIFS_LIST_SUCCESS,
    response: response.data
  });
};

// example of a thunk using the redux-thunk middleware
export const favoriteUserGif = (userId, gif) => async dispatch => {
  dispatch({type: FAVORITE_GIF_SAVE_REQUEST});

  //Make call using axios to Giphy
  const response = await axios.post(`/api/current-user/${userId}/gifs`, {
    id: gif.id,
    category: gif.category
  });

  dispatch({
    type: FAVORITE_GIF_SAVE_SUCCESS,
    gif: gif
  });
};

// example of a thunk using the redux-thunk middleware
export const getUserInformation = userId => async dispatch => {
  dispatch({type: USER_INFO_REQUEST});

  //Make call using axios to Giphy
  const response = await axios.get(`/api/current-user/${userId}`);
  dispatch({
    type: USER_INFO_SUCCESS,
    response: response.data
  });
};

// example of a thunk using the redux-thunk middleware
export const deleteFavoriteGif = (userId, gifId) => async dispatch => {
  dispatch({type: DELETE_GIF_REQUEST});

  //Make call using axios to Giphy
  const response = await axios.delete(
    `/api/current-user/${userId}/gifs/${gifId}`
  );

  dispatch({
    type: DELETE_GIF_SUCCESS,
    gifId: gifId
  });
};

// example of a thunk using the redux-thunk middleware
export const changeCategoryText = (gifId, newText) => dispatch => {
  dispatch({
    type: CHANGE_CATEGORY_SUCCESS,
    gifId: gifId,
    newText: newText
  });
};
