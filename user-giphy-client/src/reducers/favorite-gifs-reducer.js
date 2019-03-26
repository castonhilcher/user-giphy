import {
  FAVORITE_GIF_SAVE_SUCCESS,
  FAVORITE_GIF_LIST_SUCCESS,
  DELETE_GIF_SUCCESS,
  GET_GIPHY_GIFS_LIST_SUCCESS
} from '../constants/action-types';

export default function(state = [], action) {
  //Each one creates a new object so we don't mutate state
  switch (action.type) {
    case FAVORITE_GIF_LIST_SUCCESS:
      //formats the response of the favorite gifs to display
      return action.response.map(gif => {
        return {
          id: gif.id,
          categories: gif.categories,
          favorited: true
        };
      });
    case GET_GIPHY_GIFS_LIST_SUCCESS:
      //formats the collection returned back into
      //the format we expect, using .webp for increased performance
      return action.response.data.map(gif => {
        return {
          url: gif.images.original.webp,
          id: gif.id,
          title: gif.title,
          favorited: true,
          categories: gif.categories
        };
      });
    case DELETE_GIF_SUCCESS:
      //return back the array but without the id that was
      //just deleted
      return state.filter(gif => action.gifId !== gif.id);
    case FAVORITE_GIF_SAVE_SUCCESS:
      //When a gif is favorited,
      //make the gif favorited property = true
      let gif = action.gif;
      gif.favorited = true;
      return [...state, gif];
    default:
      return state;
  }
}
