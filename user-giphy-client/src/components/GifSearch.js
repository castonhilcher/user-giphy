import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class GifSearch extends Component {
  constructor(props) {
    super(props);

    this.searchGiphy = this.searchGiphy.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);

    this.state = {
      searchText: ''
    };
  }

  //Go out to Giphy and get some results
  searchGiphy = event => {
    event.preventDefault();
    this.props.getGifsFromGiphy(this.state.searchText);
  };

  //Go out to Giphy and get some results
  onSearchChange = event => {
    this.setState({searchText: event.target.value});
  };

  render() {
    return (
      <form>
        <div className={'input-field search-wrapper'}>
          <input
            type="text"
            id={'search'}
            placeholder={`Search for your favorite gif...`}
            onChange={this.onSearchChange}
          />
          <button
            className={'teal btn-flat right white-text'}
            type={'submit'}
            onClick={this.searchGiphy}
          >
            Search
            <i className={'material-icons right'}>search</i>
          </button>
        </div>
      </form>
    );
  }
}

GifSearch.propTypes = {
  getGifsFromGiphy: PropTypes.func
};
