import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AccessTimeIcon from 'react-icons/lib/md/access-time';
import VolumeOffIcon from 'react-icons/lib/md/volume-off';
import VolumeUpIcon from 'react-icons/lib/md/volume-up';
import CloseIcon from 'react-icons/lib/md/close';
import SendIcon from 'react-icons/lib/md/send';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addSong } from 'Redux/api/currentStation/actions';
import { setPreviewVideo, muteVideoRequest } from 'Redux/page/station/actions';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Grid from 'material-ui/Grid';
import Tooltip from 'material-ui/Tooltip';
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
import { transformText, transformNumber } from 'Transformer';
import classNames from 'classnames';
import styles from './styles';

/* eslint-disable no-shadow */
class AddLink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoId: '',
      searchText: '',
      songMessage: '',
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
    this._onSongMessageChange = this._onSongMessageChange.bind(this);
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

  /* Get info of a video or list of videos based on ids from search results */
  _getVideoUrl(video) {
    return `${process.env.REACT_APP_YOUTUBE_URL + video.id}&t=0s`;
  }

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
          // regionCode: 'VN', //	STAMEQ
          type: 'video',
          videoEmbeddable: 'true',
          // videoSyndicated: 'true',
          maxResults: 5,
          videoDefinition: 'any',
          relevanceLanguage: 'en',
        },
      },
    );

    // Get all video ids from search results that used to get info of those (contains more params like containDetails, status,...)
    let videoIds = '';
    items.forEach(item => {
      videoIds += `${item.id.videoId},`;
    });
    const result = await this._getVideoInfo(videoIds);

    return result;
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
        <CloseIcon />
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

  static _renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    return (
      <Paper {...containerProps} square>
        {children}
      </Paper>
    );
  }

  static _getSuggestionValue(suggestion) {
    return suggestion.snippet.title;
  }

  _timeoutSearchFunc;
  _onSuggestionsFetchRequested({ value }) {
    const { setPreviewVideo, notification } = this.props;

    try {
      clearTimeout(this._timeoutSearchFunc);
      this._timeoutSearchFunc = setTimeout(async () => {
        // Display preview if result is a youtube link without search
        if (transformText.checkValidYoutubeUrl(value)) {
          // skip the other params of youtube link
          // just get the main part: https://www.youtube.com/watch?v={video_id}
          const input = `${value.split('&')[0]}&t=0s`;
          const videoId = transformText.checkValidYoutubeUrl(input);
          const data = await this._getVideoInfo(videoId);

          // if the video is deleted from youtube
          if (data.length === 0) {
            this.setState({
              notFoundSearchResults: true,
            });
          } else {
            const embeddableVideo = data[0].status.embeddable;

            setPreviewVideo(data[0]);
            // The "Add" button will be depended on that the video is embeddable onto your website or not
            this.setState({
              isDisableButton: !embeddableVideo,
            });

            if (!embeddableVideo) {
              notification.app.warning({
                message:
                  'Your video cannot be added because of copyright issue or it is blocked from the owner.',
                duration: 10000,
              });
            }
          }
        }

        // Search by keyword if value is not a youtube link
        if (!transformText.checkValidYoutubeUrl(value)) {
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
      videoId: suggestion.videoId,
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

  _onSongMessageChange(e) {
    this.setState({
      songMessage: e.target.value,
    });
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
      user: { userId, username, name, avatar_url },
      notification,
    } = this.props;

    // Show warning message if not authenticated
    if (!userId) {
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
      songMessage: this.state.songMessage,
      creator: { username, name, avatar_url },
      duration: moment
        .duration(preview.contentDetails.duration)
        .asMilliseconds(),
    });
    this.setState({
      searchText: '',
      songMessage: '',
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
              renderSuggestionsContainer={AddLink._renderSuggestionsContainer}
              getSuggestionValue={AddLink._getSuggestionValue}
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
      const videoDuration = moment.duration(preview.contentDetails.duration);
      view = (
        <Grid container className={classes.content}>
          <Grid item sm={4} xs={12} className={classes.previewImg}>
            <Player
              url={this._getVideoUrl(preview)}
              showProgressbar={false}
              muted={muted}
              playing={true}
            />
          </Grid>
          <Grid item sm={8} xs={12} className={classes.previewRightContainer}>
            <p className={classes.previewTitle}>{preview.snippet.title}</p>
            {preview && (
              <div className={classes.durationContainer}>
                <AccessTimeIcon color={'rgba(0, 0, 0, 0.54)'} />
                {videoDuration >= 300000 ? (
                  <Tooltip
                    placement={'bottom-start'}
                    title="This video has long duration."
                  >
                    <p
                      className={classNames(
                        classes.durationText,
                        classes.warningText,
                      )}
                    >
                      {transformNumber.millisecondsToTime(videoDuration)}
                    </p>
                  </Tooltip>
                ) : (
                  <p
                    className={classNames(
                      classes.durationText,
                      classes.secondaryText,
                    )}
                  >
                    {transformNumber.millisecondsToTime(videoDuration)}
                  </p>
                )}
                <p
                  className={classNames(
                    classes.secondaryText,
                    classes.channelName,
                  )}
                >
                  Channel: {preview.snippet.channelTitle}
                </p>
              </div>
            )}
            <TextField
              fullWidth
              multiline
              rowsMax={1}
              placeholder="Do you want to say something about this video?"
              value={this.state.songMessage}
              onChange={this._onSongMessageChange}
            />
            <IconButton
              onClick={this._onVolumeClick}
              className={classes.volume}
              color="default"
            >
              {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
            <Button
              className={classes.sendBtn}
              raised
              color="primary"
              disabled={isDisableButton}
              mini={true}
              onClick={this._onAddClick}
            >
              Add{' '}
              <Icon className={classes.sendIcon}>
                <SendIcon />
              </Icon>
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
            <Typography type={'display1'} className={classes.primaryText}>
              Add song
            </Typography>
            <span className={classes.secondaryText} />
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
  user: PropTypes.any,
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
  user: api.user.data,
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
