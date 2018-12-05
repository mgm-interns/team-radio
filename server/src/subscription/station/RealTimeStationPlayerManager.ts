import { DataAccess } from 'config';
import { PlaylistSong } from 'entities';
import { Exception } from 'exceptions';
import { DistinctSongRepository, SongRepository, UserRepository } from 'repositories';
import { Logger, SongCRUDService } from 'services';
import { PlaylistHelper } from 'team-radio-shared';
import { Container } from 'typedi';
import { RealTimeStation, StationTopic } from '.';
import { PlayingSong } from '../types';

export class RealTimeStationPlayerManager {
  private _playlist: PlaylistSong[] = [];

  private stationTimeout: NodeJS.Timer;

  public parent: RealTimeStation;

  public get playlist(): PlaylistSong[] {
    return PlaylistHelper.sortPlaylist(this._playlist, this.parent.currentPlayingSongId);
  }

  public set playlist(playlist: PlaylistSong[]) {
    this._playlist = playlist;
  }

  public playing: PlayingSong | null = null;

  public getCurrentlyPlayingAt(playingSong?: PlayingSong): number | null {
    const playing = playingSong || this.playing;
    if (playing && this.parent.startingTime) {
      const at = Date.now() - this.parent.startingTime || 0;
      if (at < playing.song.duration) {
        return at;
      }
    }
    return null;
  }

  public async start() {
    if (!this.playlist[0]) return;
    try {
      this.playing = this.pickPlayingSong();

      // In normal case, start the player base on playing value
      clearTimeout(this.stationTimeout);
      // start the next song timeout with song duration
      let timeout = this.playing.song.duration;
      // Then calculate the actual remain time of the song
      const currentlyPlayingAt = this.getCurrentlyPlayingAt();
      if (currentlyPlayingAt) {
        timeout = timeout - currentlyPlayingAt;
      }
      this.stationTimeout = setTimeout(this.next.bind(this), timeout);
      // then update station & player state
      this.parent.publish<StationTopic.UpdatePlayerSongPayLoad>(StationTopic.UPDATE_PLAYER_SONG, {
        song: this.playing.song
      });
      await this.updateStationState(this.playing.startedAt);
    } catch (e) {
      // In case of the pickingPlayingSong throw an Exception,
      // because the first song in playlist has been out of play time,
      // shift it then restart the player
      const playedSong = this.shiftSong();
      playedSong.isPlayed = true;
      this.logger.info(`Song ${playedSong.id} has been out of play time. Prepare to restart the player.`);
      await this.songRepository.saveOrFail(playedSong);
      await this.updateStationState(null);
      await this.start();
    }
  }

  public async next() {
    // Remove song from playlist then update it
    const playedSong = this.shiftSong();
    playedSong.isPlayed = true;
    this.playing = null;
    this.parent.publish<StationTopic.UpdatePlayerSongPayLoad>(StationTopic.UPDATE_PLAYER_SONG, {
      song: null
    });
    // Clear the player timeout
    clearTimeout(this.stationTimeout);
    // Then update station & player state
    await Promise.all([
      this.updateStationState(null),
      //
      this.songRepository.saveOrFail(playedSong)
    ]);

    // After finishing a song, wait 5000 second to play the next one.
    this.logger.info(`Finish song ${playedSong.id}, preparing for the next one.`);

    // auto add song if this is the end of playlist and there is at least 1 user in station
    // TODO: Add flag to auto add song or not
    if (!this.playlist[0] && this.parent.onlineCount) {
      this.nextByPickingRandomSong();
    }
    // Or if the playlist already has a song,
    // pending in 5 seconds
    else {
      setTimeout(this.start.bind(this), 5000);
    }
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
    await this.songRepository.saveOrFail(stoppedSong);
    await this.start();
  }

  private async nextByPickingRandomSong(): Promise<void> {
    const randomizedNextSong = await this.distinctSongRepository.findRandomPlayedSong(this.parent.id);
    this.logger.debug(`Picked a random song ${randomizedNextSong.url}`);
    const songOwner = await this.userRepository.findOneOrFail(randomizedNextSong.creatorId);
    const nextSong = await this.songCRUDService.create(randomizedNextSong.url, this.parent.id, songOwner.id);
    this.logger.info(`Ready for the next random song ${nextSong.id} in 5 seconds.`);

    this.parent.publish<StationTopic.AddPlaylistSongPayLoad>(StationTopic.ADD_PLAYLIST_SONG, {
      song: nextSong,
      user: songOwner
    });
  }

  private pickPlayingSong(): PlayingSong {
    if (this.parent.currentPlayingSongId && this.parent.startingTime) {
      const song = this.playlist.find(song => song.id === this.parent.currentPlayingSongId);
      if (song) {
        const playingSong = new PlayingSong(song, this.parent.startingTime);
        if (this.getCurrentlyPlayingAt(playingSong)) {
          return playingSong;
        }
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

  private get distinctSongRepository(): DistinctSongRepository {
    return Container.get(DistinctSongRepository);
  }

  private get userRepository(): UserRepository {
    return Container.get(DataAccess).connection.getCustomRepository(UserRepository);
  }

  private get songCRUDService(): SongCRUDService {
    return Container.get(SongCRUDService);
  }

  private get logger(): Logger {
    return Container.get(Logger);
  }
}
