import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 200,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  textField: {
    width: '100%',
  },
});

class IntegrationAutosuggest extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: '',
      suggestions: [],
      searchList: [],
    };

    this._onChange = this._onChange.bind(this);
    this._handleSuggestionsFetchRequested = this._handleSuggestionsFetchRequested.bind(
      this,
    );
    this._handleSuggestionsClearRequested = this._handleSuggestionsClearRequested.bind(
      this,
    );
  }

  _renderInput(inputProps) {
    const { classes, value, ref, ...other } = inputProps;

    return (
      <TextField
        autoComplete="search-input"
        id="search-input"
        name="search-input"
        className={classes.textField}
        value={value}
        inputRef={ref}
        InputProps={{
          classes: {
            input: classes.input,
          },
          ...other,
        }}
      />
    );
  }

  _renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.snippet.title, query);
    const parts = parse(suggestion.snippet.title, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => <span key={index}>{part.text}</span>)}
        </div>
      </MenuItem>
    );
  }

  _renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    return (
      <Paper {...containerProps} square>
        {children}
      </Paper>
    );
  }

  _getSuggestionValue(suggestion) {
    return suggestion.snippet.title;
  }

  async _handleSuggestionsFetchRequested() {
    const { value } = this.state;
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_YOUTUBE_API_URL}/search`,
        {
          params: {
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
            q: value,
            part: 'snippet',
            safeSearch: 'strict',
            type: 'video',
            maxResults: 5,
            videoDefinition: 'any',
            relevanceLanguage: 'en',
          },
        },
      );
      this.setState({
        suggestions: data.data.items,
      });
    } catch (error) {
      console.log(error);
    }
  }

  _handleSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  _onChange(e) {
    const result = e.target.value;
    this.setState({
      value: result,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={this._renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this._handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this._handleSuggestionsClearRequested}
        renderSuggestionsContainer={this._renderSuggestionsContainer}
        getSuggestionValue={this._getSuggestionValue}
        renderSuggestion={this._renderSuggestion}
        inputProps={{
          classes,
          placeholder: 'Search by keyword...',
          value: this.state.value,
          onChange: this._onChange,
        }}
      />
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationAutosuggest);
