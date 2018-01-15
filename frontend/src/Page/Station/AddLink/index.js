import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addSong } from 'Redux/api/currentStation/actions';
import { setPreviewVideo, muteVideoRequest } from 'Redux/page/station/actions';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRouter from 'react-router-dom/withRouter';
import { MenuItem } from 'material-ui/Menu';
import { Player } from 'Component';
import { withNotification } from 'Component/Notification';
import { Images } from 'Theme';
import { checkValidYoutubeUrl } from 'Transformer/transformText';
import styles from './styles';

/* eslint-disable no-shadow */
class AddLink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoId: '',
      searchText: '',
      suggestions: [],
      notFoundSearchResults: false,
      isDisableButton: true,
      isAddLinkProgress: false,
      muted: true,
      userDid: false,
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
    this._onVolumeClick = this._onVolumeClick.bind(this);
    this._clearSearchInput = this._clearSearchInput.bind(this);
  }

  componentWillUnmount() {
    this.props.setPreviewVideo();
  }

  componentWillReceiveProps(nextProps) {
    const { mutePreview, muteNowPlaying, userDid, currentStation } = nextProps;

    this.setState({ muted: mutePreview });

    // Save volume status into local storage for reloading the page
    const volumeStatus = {
      muteNowPlaying,
      mutePreview,
      userDid,
    };
    localStorage.setItem('volumeStatus', JSON.stringify(volumeStatus));

    // Reset add link box when navigating to another station
    if (
      (this.props.currentStation && this.props.currentStation.station_id) !==
      (currentStation && currentStation.station_id)
    ) {
      this.setState({ searchText: '' });
    }
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
          part: 'id,snippet,contentDetails,status',
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
          videoEmbeddable: 'true',
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

    return [
      <TextField
        key={1}
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
      />,
      <IconButton
        key={2}
        color="default"
        onClick={this._clearSearchInput}
        className={classes.closeIcon}
      >
        close
      </IconButton>,
    ];
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
    const { setPreviewVideo, notification } = this.props;

    try {
      clearTimeout(this._timeoutSearchFunc);
      this._timeoutSearchFunc = setTimeout(async () => {
        // Display preview if result is a youtube link without search
        if (checkValidYoutubeUrl(value)) {
          // skip the other params of youtube link
          // just get the main part: https://www.youtube.com/watch?v={video_id}
          const input = `${value.split('&')[0]}&t=0s`;
          const videoId = checkValidYoutubeUrl(input);
          const data = await this._getVideoInfo(videoId);
          const embeddableVideo = data[0].status.embeddable;

          setPreviewVideo(data[0]);
          // The "Add" button will be depended on that the video is embeddable onto your website or not
          this.setState({
            isDisableButton: !embeddableVideo,
          });

          if (!embeddableVideo) {
            notification.app.warning({
              message:
                'Your video cannot be added because of copyright issue or it is prevented from the owner.',
              duration: 10000,
            });
          }
        }

        // Search by keyword if value is not a youtube link
        if (!checkValidYoutubeUrl(value)) {
          const data = await this._getSearchResults(value);
          this.setState(
            {
              videoId: '',
              suggestions: data,
            },
            () => {
              if (this.state.suggestions.length === 0) {
                this.setState({ notFoundSearchResults: true });
              }
            },
          );
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
    const { nowPlaying, setPreviewVideo } = this.props;
    if (!nowPlaying.url) {
      this.setState({ isMute: true });
    }
    setPreviewVideo(suggestion);
    this.previewVideo = suggestion;
    this.setState({
      isDisableButton: false,
      searchText: suggestion.snippet.title,
      videoId: suggestion.id.videoId,
    });
  }
  /** End of autoComplete search  */

  /* Handle add link events */
  _clearSearchInput() {
    const { setPreviewVideo } = this.props;
    this.setState({
      searchText: '',
      notFoundSearchResults: false,
    });
    setPreviewVideo();
  }

  _onChange(e) {
    const result = e.target.value;
    const { setPreviewVideo } = this.props;
    this.setState({ searchText: result });
    if (result === '') {
      setPreviewVideo();
      this.setState({
        isDisableButton: true,
        videoId: '',
        notFoundSearchResults: false,
      });
    }
  }

  _onAddClick() {
    const {
      preview,
      addSong,
      setPreviewVideo,
      muteVideoRequest,
      muteNowPlaying,
      userDid,
      match: { params: { stationId } },
      userId,
      notification,
      isAuthenticated,
    } = this.props;
    // Show warning message if not authenticated
    if (!isAuthenticated) {
      notification.app.warning({
        message: 'You need to login to use this feature.',
      });
      return;
    }
    // If authenticated
    setPreviewVideo();
    muteVideoRequest({
      muteNowPlaying: userDid ? muteNowPlaying : false,
      userDid,
    });
    addSong({
      songUrl: this._getVideoUrl(preview),
      title: preview.snippet.title,
      thumbnail: preview.snippet.thumbnails.default.url,
      stationId,
      userId,
    });
    this.setState({
      searchText: '',
      isDisableButton: true,
      isMute: true,
    });
  }
  /* End of handle add link events */

  /* Handle preview volume */
  _onVolumeClick() {
    const {
      muteVideoRequest,
      userDid,
      muteNowPlaying,
      mutePreview,
    } = this.props;
    muteVideoRequest({
      muteNowPlaying: userDid && muteNowPlaying ? muteNowPlaying : mutePreview,
      mutePreview: !mutePreview,
      userDid: !!(userDid && muteNowPlaying),
    });
  }

  /* Render icon if there is not preview content */
  _renderEmptyComponent() {
    const { classes } = this.props;
    const { notFoundSearchResults } = this.state;

    return (
      <Grid
        container
        className={classes.emptyCollection}
        justify="center"
        alignItems="center"
      >
        {notFoundSearchResults ? (
          <img src={Images.notFound} className={classes.notFound} />
        ) : (
          <img src={Images.loadingSong} className={classes.emptyImg} />
        )}
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
                  "Type the Youtube's video name. e.g. Shape of you,...",
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
    const { isDisableButton, muted } = this.state;
    let view = null;

    if (preview === null) {
      view = this._renderEmptyComponent();
    } else {
      view = (
        <Grid container className={classes.content}>
          <Grid item sm={4} xs={12} className={classes.previewImg}>
            <Player
              url={this._getVideoUrl(preview)}
              muted={muted}
              playing={true}
            />
          </Grid>
          <Grid item sm={8} xs={12} className={classes.previewRightContainer}>
            <p className={classes.previewTitle}>{preview.snippet.title}</p>
            <p className={classes.secondaryTitle}>
              Channel: {preview.snippet.channelTitle}
            </p>
            <IconButton
              onClick={this._onVolumeClick}
              className={classes.volume}
              color="default"
            >
              {muted ? 'volume_off' : 'volume_up'}
            </IconButton>
            <Button
              className={classes.sendBtn}
              raised
              color="primary"
              disabled={isDisableButton}
              mini={true}
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
            <Typography type={'display1'} className={classes.primaryTitle}>
              Add song
            </Typography>
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

AddLink.propTypes = {
  classes: PropTypes.object.isRequired,
  addSong: PropTypes.func,
  setPreviewVideo: PropTypes.func,
  preview: PropTypes.object,
  nowPlaying: PropTypes.object,
  match: PropTypes.any,
  userId: PropTypes.any,
  muteVideoRequest: PropTypes.func,
  mutePreview: PropTypes.bool,
  muteNowPlaying: PropTypes.bool,
  userDid: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  joinedStation: PropTypes.bool,
  notification: PropTypes.object,
  currentStation: PropTypes.object,
};

const mapStateToProps = ({ page, api }) => ({
  preview: page.station.preview,
  mutePreview: page.station.mutePreview,
  muteNowPlaying: page.station.muteNowPlaying,
  userDid: page.station.userDid,
  userId: api.user.data.userId,
  nowPlaying: api.currentStation.nowPlaying,
  isAuthenticated: api.user.isAuthenticated,
  joinedStation: page.station.joinedStation,
  currentStation: api.currentStation.station,
});

const mapDispatchToProps = dispatch => ({
  addSong: option => dispatch(addSong(option)),
  setPreviewVideo: video => dispatch(setPreviewVideo(video)),
  muteVideoRequest: ({ muteNowPlaying, mutePreview, userDid }) =>
    dispatch(muteVideoRequest({ muteNowPlaying, mutePreview, userDid })),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withNotification,
)(AddLink);
