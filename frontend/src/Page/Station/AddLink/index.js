import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import styles from './styles';

const STATION_DEFAULT = {
  number: 1,
  name: 'mgm internship 2017',
};

class AddLink extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      video: {},
      videoId: '',
      searchText: '',
      suggestions: [],
      isDisableButton: true,
      isAddLinkProgress: false,
    };
    this._onChange = this._onChange.bind(this);
    this._onSendClick = this._onSendClick.bind(this);
    this._onSuggestionsFetchRequested = this._onSuggestionsFetchRequested.bind(
      this,
    );
    this._onSuggestionsClearRequested = this._onSuggestionsClearRequested.bind(
      this,
    );
    this._onSuggestionSelected = this._onSuggestionSelected.bind(this);
    this._renderLinkBoxSection = this._renderLinkBoxSection.bind(this);
    this._renderPreviewSection = this._renderPreviewSection.bind(this);
  }

  _checkValidUrl(url) {
    const p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const matches = url.match(p);
    if (matches) {
      // return video_id if url is valid
      return matches[1];
    }
    return false;
  }

  async _getVideoInfo(id) {
    const { data: { items } } = await axios.get(
      `${process.env.REACT_APP_YOUTUBE_API_URL}/videos`,
      {
        params: {
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
          part: 'id,snippet',
          id,
        },
      },
    );
    return items;
  }

  async _getSearchResult(value) {
    const { data: { items } } = await axios.get(
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
    return items;
  }

  /** AutoComplete Search */
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

  _timeoutSearchFunc;
  _onSuggestionsFetchRequested({ value }) {
    this.setState({ isAddLinkProgress: true });
    try {
      clearTimeout(this._timeoutSearchFunc);
      this._timeoutSearchFunc = setTimeout(async () => {
        // value is a video link
        if (value !== '' && this._checkValidUrl(value)) {
          const id = this._checkValidUrl(value);
          const data = await this._getVideoInfo(id);
          this.setState({
            isDisableButton: false,
            video: { ...data[0] },
            videoId: id,
            suggestions: [],
          });
        } else {
          // value is not a link will be searched
          const data = await this._getSearchResult(value);
          this.setState({
            isDisableButton: true,
            video: {},
            videoId: '',
            suggestions: data,
          });
        }
      }, 300);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        this.setState({ isAddLinkProgress: false });
      }, 600);
    }
  }

  _onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  _onSuggestionSelected(e, { suggestion }) {
    this.setState({
      isDisableButton: false,
      searchText: suggestion.snippet.title,
      video: { ...suggestion },
      videoId: suggestion.id.videoId,
    });
  }
  /** End of autoComplete search  */

  _onChange(e) {
    const result = e.target.value;
    this.setState({ searchText: result });
    if (result === '') {
      this.setState({
        isDisableButton: true,
        video: {},
        videoId: '',
      });
    }
  }

  _onSendClick() {
    console.log(this.state.videoId);
  }

  _renderLoading() {
    const { classes } = this.props;

    return (
      <Grid
        container
        className={classes.loadingContainer}
        justify="center"
        alignItems="center"
      >
        <CircularProgress color="primary" thickness={3} size={20} />
      </Grid>
    );
  }

  _renderEmptyComponent() {
    const { classes } = this.props;

    return (
      <Grid
        container
        className={classes.loadingContainer}
        justify="center"
        alignItems="center"
      >
        <span>Not found</span>
      </Grid>
    );
  }

  _renderLinkBoxSection() {
    const { classes } = this.props;
    const { isDisableButton } = this.state;

    return (
      <Grid item md={5} xs={12} className={classes.addLinkBoxLeft}>
        <Grid
          container
          className={classes.gridContainer}
          direction="column"
          justify="space-between"
        >
          <Grid item xs={12}>
            <Autosuggest
              theme={{
                container: classes.autoSearchContainer,
                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                suggestionsList: classes.suggestionsList,
                suggestion: classes.suggestion,
              }}
              renderInputComponent={this._renderInput}
              suggestions={this.state.suggestions}
              onSuggestionsFetchRequested={this._onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this._onSuggestionsClearRequested}
              onSuggestionSelected={this._onSuggestionSelected}
              renderSuggestionsContainer={this._renderSuggestionsContainer}
              getSuggestionValue={this._getSuggestionValue}
              renderSuggestion={this._renderSuggestion}
              inputProps={{
                classes,
                placeholder: 'Add your link or search by keyword...',
                value: this.state.searchText,
                onChange: this._onChange,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className={classes.sendBtn}
              raised
              color="primary"
              disabled={isDisableButton}
              onClick={this._onSendClick}
            >
              Add <Icon className={classes.sendIcon}>send</Icon>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  _renderPreviewSection() {
    const { classes } = this.props;
    const { video, isAddLinkProgress } = this.state;

    let view = null;
    if (video.id === undefined) {
      view = this._renderEmptyComponent();
    } else if (isAddLinkProgress) {
      view = this._renderLoading();
    } else {
      view = (
        <Grid container className={classes.content}>
          <Grid item sm={4} xs={12} className={classes.previewImg}>
            <img
              src={video.snippet.thumbnails.medium.url}
              className={classes.previewImg}
            />
          </Grid>
          <Grid item sm={8} xs={12}>
            <p className={classes.previewTitle}>{video.snippet.title}</p>
            <p className={classes.secondaryTitle}>
              Channel: {video.snippet.channelTitle}
            </p>
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid item md={7} xs={12} className={classes.addLinkBoxRight}>
        {view}
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.addLinkContainer}>
        <Grid item xs={12} className={classes.linkTitle}>
          <div>
            <h1 className={classes.primaryTitle}>
              ADD TO STATION {STATION_DEFAULT.number}
            </h1>
            <span className={classes.secondaryTitle}>
              {' - '} {STATION_DEFAULT.name}
            </span>
          </div>
        </Grid>
        <Card className={classes.addLinkBox}>
          <Grid item xs={12}>
            <Grid container className={classes.gridContainer}>
              {this._renderLinkBoxSection()}
              {this._renderPreviewSection()}
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(AddLink);
