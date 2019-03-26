import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Landing extends Component {
  render() {
    const {authentication} = this.props;
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Welcome to User Giphy</h1>
        <p className={'flow-text'}>
          This is a small site that lets you search your favorite gifs using the{' '}
          <a target={'_blank'} href="https://developers.giphy.com/">
            Giphy API
          </a>
          .{' '}
          {!authentication ||
            (!authentication.loggedIn &&
              'Sign up today to save your favorite gifs to your profile.')}
        </p>
      </div>
    );
  }
}

Landing.propTypes = {
  authentication: PropTypes.object,
  getGifsFromGiphy: PropTypes.func,
  favoriteUserGif: PropTypes.func
};
