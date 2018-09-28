import { DataAccess } from 'config';
import { PlaylistSong } from 'entities';
import { Exception } from 'exceptions';
import { SongRepository } from 'repositories';
import { PlayingSong } from 'subscription';
import { PlaylistHelper } from 'team-radio-shared';
import { Field, Int, ObjectType } from 'type-graphql';
import { Container } from 'typedi';
import { RealTimeStation, StationTopic } from '.';
import { Logger } from 'services';

@ObjectType()
export class RealTimeStationPlayer {
  private _playlist: PlaylistSong[] = [];

  private stationTimeout: NodeJS.Timer;

  public parent: RealTimeStation;

  @Field(type => [PlaylistSong])
  public get playlist(): PlaylistSong[] {
    return PlaylistHelper.sortPlaylist(this._playlist, this.parent.currentPlayingSongId);
  }

  public set playlist(playlist: PlaylistSong[]) {
    this._playlist = playlist;
  }

  @Field(type => PlayingSong, { nullable: true })
  public playing: PlayingSong | null = null;

  @Field(type => Int, { nullable: true })
  public get currentlyPlayingAt(): number | null {
    if (this.playing && this.parent.startingTime) {
      const at = Date.now() - this.parent.startingTime || 0;
      if (at < this.playing.song.duration) {
        return at;
      }
    }
    return null;
  }

  public async start() {
    if (!this.playlist[0]) return;
    try {
      this.playing = this.pickPlayingSong();
    } catch (e) {
      // In case of the pickingPlayingSong throw an Exception,
      // because the first song in playlist has been out of play time,
      // shift it then restart the player
      const playedSong = this.shiftSong();
      playedSong.isPlayed = true;
      this.logger.info(`Song ${playedSong.id} has been out of play time. Prepare to restart the player.`);
      await this.songRepository.save(playedSong);
      await this.updateStationState(null);
      await this.start();
      return;
    }

    // In normal case, start the player base on playing value
    clearTimeout(this.stationTimeout);
    this.stationTimeout = setTimeout(this.next.bind(this), this.playing.song.duration);
    this.parent.publish<StationTopic.UpdatePlayerSongPayLoad>(StationTopic.UPDATE_PLAYER_SONG, {
      song: this.playing.song
    });
    await this.updateStationState(this.playing.startedAt);
  }

  public async next() {
    const playedSong = this.shiftSong();
    playedSong.isPlayed = true;
    this.playing = null;
    this.parent.publish<StationTopic.UpdatePlayerSongPayLoad>(StationTopic.UPDATE_PLAYER_SONG, {
      song: null
    });
    clearTimeout(this.stationTimeout);
    await Promise.all([
      this.updateStationState(null),
      //
      this.songRepository.save(playedSong)
    ]);
    // After finishing a song, wait 5000 second to play the next one.
    this.logger.info(`Finish song ${playedSong.id}, preparing for the next one.`);
    setTimeout(this.start.bind(this), 5000);
  }

  // TODO: Do we need this feature?
  public pause() {
    throw new Exception('This feature is not supported yet!');
  }

  public async stop() {
    clearTimeout(this.stationTimeout);
    const stoppedSong = this.shiftSong();
    this.playing = null;
    this.parent.publish<StationTopic.UpdatePlayerSongPayLoad>(StationTopic.UPDATE_PLAYER_SONG, {
      song: null
    });
    stoppedSong.isPlayed = true;
    await this.songRepository.save(stoppedSong);
    await this.start();
  }

  private pickPlayingSong() {
    if (this.parent.currentPlayingSongId && this.parent.startingTime) {
      const playingSong = this.playlist.find(song => song.id === this.parent.currentPlayingSongId);
      if (playingSong && this.currentlyPlayingAt) {
        return new PlayingSong(playingSong, this.parent.startingTime);
      }
      throw new Exception('Song not found or out of playing time');
    }
    return new PlayingSong(this.playlist[0]);
  }

  private shiftSong(): PlaylistSong {
    const removedSong = this.playlist[0];
    // TODO: Can we just mutate it instead of return a new array?
    // Must to use _playlist to disable sorting
    this.playlist = this._playlist.filter(song => song.id !== removedSong.id);
    this.parent.publish<StationTopic.RemovePlaylistSongPayLoad>(StationTopic.REMOVE_PLAYLIST_SONG, {
      songId: removedSong.id
    });
    this.parent.publish<StationTopic.AddSongToHistory>(StationTopic.ADD_SONG_TO_HISTORY, { song: removedSong });
    return removedSong;
  }

  private async updateStationState(startingTime: number | null) {
    const currentPlayingSongId = this.playing ? this.playing.song.id : null;
    return this.parent.updateStationState(startingTime, currentPlayingSongId);
  }

  private get songRepository(): SongRepository {
    return Container.get(DataAccess).connection.getCustomRepository(SongRepository);
  }

  private get logger(): Logger {
    return Container.get(Logger);
  }
}
