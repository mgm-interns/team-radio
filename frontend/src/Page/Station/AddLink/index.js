import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addSong } from 'Redux/api/currentStation/actions';
import { setPreviewVideo } from 'Redux/page/station/actions';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import withRouter from 'react-router-dom/withRouter';
import { MenuItem } from 'material-ui/Menu';
import { CircularProgress } from 'material-ui/Progress';
import { Player } from 'Component';
import { Images } from 'Theme';
import { checkValidYoutubeUrl } from 'Transformer/transformText';
import styles from './styles';

/* eslint-disable no-shadow */
class AddLink extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    addSong: PropTypes.func,
    setPreviewVideo: PropTypes.func,
    preview: PropTypes.object,
    match: PropTypes.any,
    userId: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.state = {
      videoId: '',
      searchText: '',
      suggestions: [],
      isDisableButton: true,
      isAddLinkProgress: false,
    };
    this._onChange = this._onChange.bind(this);
    this._onAddClick = this._onAddClick.bind(this);
    this._onSuggestionsFetchRequested = this._onSuggestionsFetchRequested.bind(
      this,
    );
    this._onSuggestionsClearRequested = this._onSuggestionsClearRequested.bind(
      this,
    );
    this._onSuggestionSelected = this._onSuggestionSelected.bind(this);
    this._renderLinkBoxSection = this._renderLinkBoxSection.bind(this);
    this._renderPreviewSection = this._renderPreviewSection.bind(this);
    this._renderSuggestion = this._renderSuggestion.bind(this);

    this._renderInput = this._renderInput.bind(this);
  }

  /* Get video info */
  _getVideoUrl(video) {
    return typeof video.id === 'string'
      ? process.env.REACT_APP_YOUTUBE_URL + video.id
      : process.env.REACT_APP_YOUTUBE_URL + video.id.videoId;
  }

  // use for link
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

  /* Get search results */
  async _getSearchResults(value) {
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
    const { classes } = this.props;

    const matches = match(suggestion.snippet.title, query);
    const parts = parse(suggestion.snippet.title, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <img
          src={suggestion.snippet.thumbnails.default.url}
          className={classes.searchItemImg}
        />
        <span>
          {parts.map((part, index) => <span key={index}>{part.text}</span>)}
        </span>
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
    try {
      clearTimeout(this._timeoutSearchFunc);
      this._timeoutSearchFunc = setTimeout(async () => {
        // Search by keyword if value is not a youtube link
        if (!checkValidYoutubeUrl(value)) {
          const data = await this._getSearchResults(value);
          this.setState({
            videoId: '',
            suggestions: data,
          });
        } else {
          this.setState({
            suggestions: [],
          });
        }
      }, 300);
    } catch (error) {
      console.log(error);
    }
  }

  _onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  _onSuggestionSelected(e, { suggestion }) {
    this.props.setPreviewVideo(suggestion);
    this.previewVideo = suggestion;
    this.setState({
      isDisableButton: false,
      searchText: suggestion.snippet.title,
      videoId: suggestion.id.videoId,
    });
  }
  /** End of autoComplete search  */

  /* Handle add link events */
  async _onChange(e) {
    const { setPreviewVideo } = this.props;
    const result = e.target.value;
    this.setState({ searchText: result });
    try {
      // Display preview if result is a youtube link without search
      if (checkValidYoutubeUrl(result)) {
        // skip the other params of youtube link
        // just get the main part: https://www.youtube.com/watch?v={video_id}
        const input = result.split('&')[0];
        const videoId = checkValidYoutubeUrl(input);
        const data = await this._getVideoInfo(videoId);
        setPreviewVideo(data[0]);
        this.setState({
          isDisableButton: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
    if (result === '') {
      setPreviewVideo();
      this.setState({
        isDisableButton: true,
        videoId: '',
      });
    }
  }

  _onAddClick() {
    const {
      preview,
      addSong,
      setPreviewVideo,
      match: { params: { stationId } },
      userId,
    } = this.props;
    setPreviewVideo();
    console.log(preview);
    addSong({
      songUrl: this._getVideoUrl(preview),
      title: preview.snippet.title,
      thumbnail: preview.snippet.thumbnails.default.url,
      stationId,
      userId,
    });
    this.setState({ searchText: '', isDisableButton: true });
  }
  /* End of handle add link events */

  /* Render loading while waiting for load data */
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

  /* Render icon if there is not preview content */
  _renderEmptyComponent() {
    const { classes } = this.props;

    return (
      <Grid
        container
        className={classes.emptyCollection}
        justify="center"
        alignItems="center"
      >
        <img src={Images.loadingSong} className={classes.emptyImg} />
      </Grid>
    );
  }

  _renderLinkBoxSection() {
    const { classes } = this.props;

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
              alwaysRenderSuggestions={false}
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
                placeholder:
                  "Type the Youtube's video name. e.g. Despacito,...",
                value: this.state.searchText,
                onChange: this._onChange,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  _renderPreviewSection() {
    const { classes, preview } = this.props;
    const { isDisableButton } = this.state;
    let view = null;

    if (preview === null) {
      view = this._renderEmptyComponent();
    } else {
      view = (
        <Grid container className={classes.content}>
          <Grid item sm={4} xs={12} className={classes.previewImg}>
            <Player
              url={this._getVideoUrl(preview)}
              muted={true}
              playing={true}
            />
          </Grid>
          <Grid item sm={8} xs={12} className={classes.previewRightContainer}>
            <p className={classes.previewTitle}>{preview.snippet.title}</p>
            <p className={classes.secondaryTitle}>
              Channel: {preview.snippet.channelTitle}
            </p>
            <Button
              className={classes.sendBtn}
              raised
              color="primary"
              disabled={isDisableButton}
              onClick={this._onAddClick}
            >
              Add <Icon className={classes.sendIcon}>send</Icon>
            </Button>
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
            <h1 className={classes.primaryTitle}>Add song</h1>
            <span className={classes.secondaryTitle} />
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

const mapStateToProps = ({ page, api }) => ({
  preview: page.station.preview,
  userId: api.user.data.userId,
});

const mapDispatchToProps = dispatch => ({
  addSong: option => dispatch(addSong(option)),
  setPreviewVideo: video => dispatch(setPreviewVideo(video)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(AddLink);
