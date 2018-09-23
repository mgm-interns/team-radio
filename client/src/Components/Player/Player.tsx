// import { LinearProgress, withStyles, WithStyles } from '@material-ui/core';
// import { Identifiable, Styleable } from 'Common';
// import * as React from 'react';
// import ReactPlayer, { ReactPlayerProps } from 'react-player';
// import { styles } from './styles';
//
// const ACCEPTABLE_DELAY = process.env.REACT_APP_ACCEPTABLE_DELAY || 2; // seconds
// class CorePlayer extends React.Component<CorePlayer.Props, CorePlayer.States> {
//   public static getExactlySeekTime({ seekTime, receivedAt }: CorePlayer.States) {
//     const currentTime = new Date().getTime();
//     const delayedTime = parseInt(currentTime - receivedAt, 10) / 1000;
//     return Math.abs(seekTime + delayedTime);
//   }
//   private playerRef: ReactPlayer | null = null;
//
//   constructor(props: CorePlayer.Props) {
//     super(props);
//
//     this.state = {
//       played: 0,
//       buffer: 0,
//       seekTime: this.props.seekTime,
//       receivedAt: this.props.receivedAt,
//       isPaused: false,
//       playedSeconds: 0
//     };
//   }
//
//   public componentWillReceiveProps(nextProps: CorePlayer.Props) {
//     // Force update seekTime when component receive new props
//     this.setState(
//       {
//         seekTime: nextProps.seekTime,
//         receivedAt: nextProps.receivedAt
//       },
//       () => {
//         this.seekToTime(this.state);
//       }
//     );
//   }
//
//   // Prevent calling render when isPaused changed
//   public shouldComponentUpdate(nextProps: CorePlayer.Props, nextState: CorePlayer.States) {
//     return this.state.isPaused === nextState.isPaused;
//   }
//
//   public render(): React.ReactNode {
//     const { classes, url, playing, showProgressbar, ...othersProps } = this.props;
//     const { played, buffer } = this.state;
//     return [
//       <ReactPlayer
//         key={1}
//         url={url}
//         ref={input => {
//           this.playerRef = input;
//         }}
//         controls={false}
//         playing={playing}
//         onStart={this.onStart}
//         onPlay={this.onPlay}
//         onPause={this.onPause}
//         onProgress={this.onProgress}
//         youtubeConfig={{ playerVars: { disablekb: 1 } }}
//         // style={{ pointerEvents: enablePointerEvent }}
//         {...othersProps}
//       />,
//       showProgressbar && url && <LinearProgress key={2} variant={'buffer'} value={played} valueBuffer={buffer} />
//     ];
//   }
//
//   private seekToTime({ seekTime, receivedAt }: CorePlayer.States) {
//     const exactlyTime = Player.getExactlySeekTime({ seekTime, receivedAt });
//     const differentTime = Math.abs(exactlyTime - this.state.playedSeconds);
//     if (differentTime > ACCEPTABLE_DELAY) {
//       this.playerRef.seekTo(exactlyTime);
//     }
//   }
//
//   private onStart() {
//     this.seekToTime(this.state);
//   }
//
//   private onProgress({ played, loaded, playedSeconds }) {
//     this.setState({
//       playedSeconds,
//       played: played * 100,
//       buffer: loaded * 100
//     });
//     const exactlyTime = Player.getExactlySeekTime(this.state);
//     const differentTime = Math.abs(exactlyTime - playedSeconds);
//     if (differentTime > ACCEPTABLE_DELAY) {
//       this.playerRef.seekTo(exactlyTime);
//     }
//   }
//   private onPause() {
//     this.setState({
//       isPaused: true
//     });
//   }
//
//   private onPlay() {
//     if (this.state.isPaused) {
//       this.setState({
//         isPaused: false
//       });
//       const exactlyTime = Player.getExactlySeekTime(this.state);
//       this.playerRef.seekTo(exactlyTime);
//     }
//   }
// }
//
// namespace CorePlayer {
//   export interface Props extends Player.Props, WithStyles<typeof styles> {}
//   export interface States extends Player.States {}
// }
//
// export const Player: React.ComponentType<Player.Props> = withStyles(styles)(CorePlayer);
//
// export namespace Player {
//   export interface Props extends Identifiable, Styleable {
//     url: string;
//     // ref: ReactPlayer;
//     seekTime: number;
//     receivedAt: number;
//     songId: any;
//     playing: boolean;
//     showProgressbar: boolean;
//   }
//   export interface States {
//     played: number;
//     buffer: number;
//     seekTime: number;
//     receivedAt: number;
//     isPaused: boolean;
//     playedSeconds: number;
//   }
// }
