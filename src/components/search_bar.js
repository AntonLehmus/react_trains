import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';


class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit();
    }

  render() {
    const term = this.props.term;
    

    return (
        <form className="form form-inline" onSubmit={this.handleSubmit}>
            <div className="input-group col-sm-12">

                <input type="text" className="form-control" id="search_bar"
                placeholder="Search for station" value={term} onChange={this.handleChange} />

                <span className="input-group-addon">
                    <button className="btn btn-primary" type="submit" id="search_submit"><i className="fa fa-search "></i> Go!</button>
                </span>
            </div>
      </form>
    );
  }

}

export default SearchBar;