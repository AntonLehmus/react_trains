import React, { Component } from 'react';

import Autosuggest from 'react-autosuggest';

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);

        this.state = {
            suggestions: []
        };
    }

    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        const array = this.props.stations;

        return inputLength === 0 ? [] : array.filter(item =>
            item.stationName.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    getSuggestionValue(suggestion) {
        return suggestion.stationName;
    }

    renderSuggestion(suggestion) {
        return (
            <span>{suggestion.stationName}</span>
        );
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };


    handleChange = (event, { newValue, method }) => {
        this.props.onChange(newValue);
    };


    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit();
    }

    render() {
        const term = this.props.term;
        const { suggestions } = this.state;
        const inputProps = {
            placeholder: "Search for station",
            value: term,
            onChange: this.handleChange,
            className: "form-control"
        };

        return (
            <div id="search_bar">
                <form className="form form-inline" onSubmit={this.handleSubmit}>
                    <div className="input-group col-12">

                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            inputProps={inputProps} />

                        <span className="input-group-addon">
                            <button className="btn btn-primary" type="submit" id="search_submit"><i className="fa fa-search "></i> Go!</button>
                        </span>
                    </div>
                </form>
            </div>
        );
    }

}

export default SearchBar;