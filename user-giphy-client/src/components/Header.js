import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default class Header extends Component {
  render() {
    const {authentication} = this.props;

    let authText = 'Log in with Google',
      authUrl = '/auth/google';
    if (authentication && authentication.loggedIn) {
      authText = 'Log out';
      authUrl = '/api/current-user/logout';
    }

    return (
      <nav>
        <div className={'nav-wrapper deep-purple lighten-2'}>
          <Link to={'/'} className={'left brand-logo'}>
            User Giphy
          </Link>
          <ul className={'right'}>
            <li>
              <Link to={'/search'}>Search</Link>
            </li>
            {authentication && authentication.loggedIn && (
              <li>
                <Link to={'/user-gifs'}>Dashboard</Link>
              </li>
            )}
            <li>
              <a href={authUrl}>{authText}</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  authentication: PropTypes.object,
  getGifsFromGiphy: PropTypes.func
};
