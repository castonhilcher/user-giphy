import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import GifDashboard from './GifDashboard';
import SearchComponent from './SearchComponent';

class App extends Component {
  //Don't ever make AJAX calls in componentWillMount
  //Not supported in future releases of React and
  //could cause issues in React state lifecycle
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className={'container blue-grey lighten-5'}>
          <Header {...this.props} />
          <Route
            exact
            path={'/'}
            render={routeProps => <Landing {...routeProps} {...this.props} />}
          />
          <Route
            exact
            path={'/search'}
            render={routeProps => (
              <SearchComponent {...routeProps} {...this.props} />
            )}
          />
          <Route
            exact
            path={'/user-gifs'}
            render={routeProps => (
              <GifDashboard {...routeProps} {...this.props} />
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    authentication: state.authentication,
    searchedGifs: state.searchedGifs,
    favoriteGifs: state.favoriteGifs,
    user: state.user
  };
}

//connect parameters (mapStateToProps, mapDispatchToProps)
export default connect(
  mapStateToProps,
  actions
)(App);
