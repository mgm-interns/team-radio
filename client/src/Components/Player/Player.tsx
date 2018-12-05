import { LinearProgress, Tooltip, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable } from 'Common';
import * as React from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import { styles } from './styles';

export class Player extends React.Component<CoreProps, CoreStates> {
  public static defaultProps: Partial<CoreProps> = {
    maximumDelaySeconds: 5,
    progressBarHeight: 5
  };

  public state: CoreStates = {
    playedAt: this.props.currentlyPlayedAt,
    loadedAt: 0,
    loadedAtPercent: 0,
    playedAtPercent: 0,
    preload: false
  };

  private reactPlayer: ReactPlayer;

  public componentDidUpdate(prevProps: CoreProps) {
    if (prevProps.currentlyPlayedAt !== this.props.currentlyPlayedAt) {
      this.setState({ playedAt: this.props.currentlyPlayedAt });
    }
    if (prevProps.url !== this.props.url && !this.props.url) {
      this.setState({
        playedAt: 0,
        loadedAt: 0,
        loadedAtPercent: 0,
        playedAtPercent: 0
      });
    }
  }

  public render() {
    const {
      classes,
      id,
      style,
      className,
      height,
      width,
      currentlyPlayedAt,
      maximumDelaySeconds,
      progressBarHeight,
      ...otherProps
    } = this.props;
    return (
      <div style={{ height, width }} className={classes.root}>
        <ReactPlayer
          {...otherProps}
          id={id}
          style={{ pointerEvents: 'none', ...style }}
          config={{ youtube: { preload: this.state.preload } }}
          className={className}
          height={this.resolvePlayerHeight()}
          width={width}
          onProgress={this.onProgress}
          onStart={() => this.setState({ preload: true })}
          onError={(...args) => console.error(`Error while playing video`, args)}
          ref={this.ref}
        />
        <Tooltip
          title={`${Math.round(this.state.playedAt)} seconds`}
          placement={'top-start'}
          classes={{ tooltipPlacementTop: classes.tooltip, tooltipPlacementBottom: classes.tooltip }}
        >
          <LinearProgress
            color={'primary'}
            style={{ height: progressBarHeight, width: '100%' }}
            variant={'buffer'}
            value={this.state.playedAtPercent * 100}
            valueBuffer={this.state.loadedAtPercent * 100}
          />
        </Tooltip>
      </div>
    );
  }

  protected shouldPlayerSeekTime = (oldPlayedSeconds: number, newPlayedSeconds: number): boolean => {
    if (Math.abs(newPlayedSeconds - oldPlayedSeconds) > this.props.maximumDelaySeconds) {
      return true;
    }
    return false;
  };

  protected onProgress = ({ played, playedSeconds, loaded, loadedSeconds }: OnPlayerProgressState): void => {
    if (this.props.onProgress) {
      this.props.onProgress({ played, playedSeconds, loaded, loadedSeconds });
    }
    if (this.shouldPlayerSeekTime(this.state.playedAt, playedSeconds)) {
      this.reactPlayer.seekTo(this.state.playedAt);
    } else {
      this.setState({
        playedAt: playedSeconds,
        loadedAt: loadedSeconds,
        playedAtPercent: played,
        loadedAtPercent: loaded
      });
    }
  };

  private ref = (player: ReactPlayer) => {
    if (this.props.ref) {
      this.props.ref(player);
    }
    this.reactPlayer = player;
  };

  private resolvePlayerHeight = () => {
    const { height, progressBarHeight } = this.props;
    if (typeof height === 'number') {
      return `calc(${height}px - ${progressBarHeight}px)`;
    }
    return `calc(${height} - ${progressBarHeight}px)`;
  };
}

export interface OnPlayerProgressState {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

interface CoreProps extends WithStyles<typeof styles>, Props {}

interface CoreStates {
  playedAt: number;
  loadedAt: number;
  playedAtPercent: number;
  loadedAtPercent: number;

  preload: boolean;
}

export interface Props extends Identifiable, ReactPlayerProps {
  currentlyPlayedAt: number;
  maximumDelaySeconds?: number;
  progressBarHeight?: number | string;
  ref?(player: ReactPlayer): void;
}

export default withStyles(styles)(Player);
