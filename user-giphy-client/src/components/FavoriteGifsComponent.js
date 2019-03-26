import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class FavoriteGifsComponent extends Component {
  render() {
    const {authentication, favoriteGifs, deleteFavoriteGif} = this.props;

    //TODO: find a better way to display and refactor with search display
    let gifMatrix = [];
    for (let i = 0; i < favoriteGifs.length / 3; i++) {
      gifMatrix[i] = [];
    }

    favoriteGifs.forEach((gif, index) => {
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
                            deleteFavoriteGif(authentication.id, gif.id);
                          }}
                          className="btn-floating halfway-fab waves-effect waves-light red darken-2"
                        >
                          <i className="material-icons">delete</i>
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

FavoriteGifsComponent.propTypes = {
  deleteFavoriteGif: PropTypes.func,
  favoriteGifs: PropTypes.array
};

FavoriteGifsComponent.defaultProps = {
  favoriteGifs: []
};
