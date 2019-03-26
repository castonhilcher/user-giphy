import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FavoriteGifsComponent from './FavoriteGifsComponent';

// Since this component is simple and static, there's no parent container for it.
export default class GifDashboard extends Component {
  render() {
    const {user} = this.props;

    if (!user)
      return (
        <div className="progress">
          <div className="indeterminate" />
        </div>
      );

    return (
      <div>
        <h1>{user.firstName}'s dashboard</h1>
        <h2>Find your favorite gifs you have saved here</h2>
        <FavoriteGifsComponent {...this.props} />
      </div>
    );
  }
}

GifDashboard.propTypes = {
  favoriteGifs: PropTypes.array,
  user: PropTypes.object
};
