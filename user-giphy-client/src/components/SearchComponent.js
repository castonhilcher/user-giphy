import React, {Component} from 'react';
import PropTypes from 'prop-types';

import GifSearch from './GifSearch';
import SearchedGifsComponent from './SearchedGifsComponent';

export default class SearchComponent extends Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Search for your favorite gifs below</h1>
        <GifSearch getGifsFromGiphy={this.props.getGifsFromGiphy} />
        <SearchedGifsComponent {...this.props} />
      </div>
    );
  }
}

SearchComponent.propTypes = {
  authentication: PropTypes.object,
  getGifsFromGiphy: PropTypes.func,
  favoriteUserGif: PropTypes.func
};
