import { LinearProgress, Tooltip } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import * as React from 'react';
import ReactPlayer from 'react-player';
import { useStyles } from './styles';

const initialState: CoreStates = {
  playedAt: 0,
  loadedAt: 0,
  loadedAtPercent: 0,
  playedAtPercent: 0
};

const Player: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();

  const [preload, setPreload] = React.useState<boolean>(false);

  const [playerState, setPlayerState] = React.useState<CoreStates>(initialState);

  const reactPlayerRef = React.useRef<ReactPlayer>(null);

  const isSeekedTime = React.useRef(false);

  React.useEffect(
    () => {
      isSeekedTime.current = false;
    },
    [props.currentlyPlayedAt]
  );

  const shouldSeekTime = React.useCallback(
    () => {
      if (isSeekedTime.current) return false;
      return Math.abs(playerState.playedAt - props.currentlyPlayedAt) > 5;
    },
    [playerState.playedAt, props.currentlyPlayedAt]
  );

  const onProgress = React.useCallback<(state: OnPlayerProgressState) => void>(
    ({ played, playedSeconds, loaded, loadedSeconds }): void => {
      if (props.onProgress) {
        props.onProgress({ played, playedSeconds, loaded, loadedSeconds });
      }
      if (shouldSeekTime()) {
        isSeekedTime.current = true;
        reactPlayerRef.current.seekTo(props.currentlyPlayedAt);
      } else {
        setPlayerState({
          playedAt: playedSeconds,
          loadedAt: loadedSeconds,
          playedAtPercent: played,
          loadedAtPercent: loaded
        });
      }
    },
    [props.onProgress, props.currentlyPlayedAt, shouldSeekTime]
  );

  React.useEffect(() => setPlayerState(initialState), [props.url]);

  const playerHeight = React.useMemo(
    () => {
      if (typeof props.height === 'number') {
        return `calc(${props.height}px - ${props.progressBarHeight}px)`;
      }
      return `calc(${props.height} - ${props.progressBarHeight}px)`;
    },
    [props.height, props.progressBarHeight]
  );

  // This memo value is a fix for the issue when user loads the player on the first time with "url" set to undefined
  // then it will make player to be set to stopped state
  const playing = React.useMemo<boolean>(() => !!props.url, [props.url]);

  const {
    id,
    style,
    height,
    width,
    currentlyPlayedAt,
    maximumDelaySeconds,
    progressBarHeight,
    onError,
    ...otherProps
  } = props;

  return (
    <div style={{ height, width }} className={classes.root}>
      <ReactPlayer
        {...otherProps}
        id={id}
        playing={playing}
        style={{ pointerEvents: 'none', ...style }}
        config={{ youtube: { preload } }}
        height={playerHeight}
        width={width}
        onProgress={onProgress}
        ref={reactPlayerRef}
        onStart={() => setPreload(true)}
        onError={errorCode => {
          if (onError) {
            onError(errorCode, props.url!);
          }
        }}
      />
      <Tooltip
        title={`${Math.round(playerState.playedAt)} seconds`}
        placement={'top-start'}
        classes={{ tooltipPlacementTop: classes.tooltip, tooltipPlacementBottom: classes.tooltip }}
      >
        <LinearProgress
          color={'primary'}
          style={{ height: progressBarHeight, width: '100%' }}
          variant={'buffer'}
          value={playerState.playedAtPercent * 100}
          valueBuffer={playerState.loadedAtPercent * 100}
        />
      </Tooltip>
    </div>
  );
};

Player.defaultProps = {
  maximumDelaySeconds: 5,
  progressBarHeight: 5
};

export interface OnPlayerProgressState {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

interface CoreProps extends Props {}

interface CoreStates {
  playedAt: number;
  loadedAt: number;
  playedAtPercent: number;
  loadedAtPercent: number;
}

export default Player;

export interface Props extends Identifiable, Styleable {
  url?: string;
  currentlyPlayedAt?: number;
  maximumDelaySeconds?: number;
  progressBarHeight?: number | string;
  height: string;
  width: string;
  muted: boolean;
  onError?(errorCode: number, url: string): void;
  onProgress?(state: OnPlayerProgressState): void;
}
