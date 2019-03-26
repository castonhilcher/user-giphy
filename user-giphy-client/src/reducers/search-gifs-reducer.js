import {
  CHANGE_CATEGORY_SUCCESS,
  SEARCH_GIFS_SUCCESS
} from '../constants/action-types';

export default function(state = [], action) {
  //Each one creates a new object so we don't mutate state
  switch (action.type) {
    case SEARCH_GIFS_SUCCESS:
      //take the array returned and grab select
      //properties off of it (using .webp for performance)
      return action.response.data.map(gif => {
        return {
          url: gif.images.original.webp,
          id: gif.id,
          title: gif.title,
          favorited: false,
          category: ''
        };
      });
    case CHANGE_CATEGORY_SUCCESS:
      return state.map(gif => {
        if (gif.id === action.gifId) {
          gif.category = action.newText;
        }

        return gif;
      });
    default:
      return state;
  }
}
