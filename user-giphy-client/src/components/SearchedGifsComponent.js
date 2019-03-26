import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SearchedGifsComponent extends Component {
  render() {
    const {
      authentication,
      searchedGifs,
      favoriteUserGif,
      deleteFavoriteGif
    } = this.props;

    //TODO: refactor with the favorites page and process faster
    let gifMatrix = [];
    for (let i = 0; i < searchedGifs.length / 3; i++) {
      gifMatrix[i] = [];
    }

    //TODO: figure out a way to display these better
    //Currently creating a matrix and putting 3 to a row to render
    searchedGifs.forEach((gif, index) => {
      gifMatrix[Math.floor(index / 3)].push(gif);
    });

    return (
      <div>
        {gifMatrix.map(gifArray => {
          return (
            <div className="row">
              {gifArray.map(gif => {
                return (
                  <div className="col s12 m6 l3">
                    <div className="card">
                      <div className="card-image">
                        <img src={gif.url} alt={gif.title} />
                        <button
                          onClick={() => {
                            if (gif.favorited !== true) {
                              favoriteUserGif(authentication.id, gif);
                              gif.favorited = true;
                            } else {
                              deleteFavoriteGif(authentication.id, gif.id);
                              gif.favorited = false;
                            }
                          }}
                          className="btn-floating halfway-fab waves-effect waves-light red"
                        >
                          {gif.favorited && (
                            <i className="material-icons">delete</i>
                          )}
                          {!gif.favorited && (
                            <i className="material-icons">add</i>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

SearchedGifsComponent.propTypes = {
  deleteFavoriteGif: PropTypes.func,
  favoriteUserGif: PropTypes.func,
  searchedGifs: PropTypes.array
};

SearchedGifsComponent.defaultProps = {
  searchedGifs: []
};
