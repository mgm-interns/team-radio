import { DataAccess } from 'config';
import { PlaylistSong } from 'entities';
import { Exception } from 'exceptions';
import { SongRepository, StationRepository } from 'repositories';
import { PlayingSong, SubscriptionManager } from 'subscription';
import { Field, Int, ObjectType } from 'type-graphql';
import { Container } from 'typedi';
import { StationTopic } from '.';
import { RealTimeStation } from './RealTimeStation';

@ObjectType()
export class RealTimeStationPlayer {
  private _playlist: PlaylistSong[] = [];

  private startedAt: number;

  private stationTimeout: NodeJS.Timer;

  public parent: RealTimeStation;

  @Field(type => [PlaylistSong])
  public get playlist(): PlaylistSong[] {
    return this._playlist.sort((s1, s2) => s2.upVotes.length - s1.upVotes.length);
  }

  public set playlist(playlist: PlaylistSong[]) {
    this._playlist = playlist;
  }

  @Field(type => PlayingSong, { nullable: true })
  public playing: PlayingSong | null = null;

  @Field(type => Int, { nullable: true })
  public get currentlyPlayingAt(): number | null {
    if (this.playing) {
      const at = Date.now() - this.startedAt || 0;
      if (at < this.playing.song.duration) {
        return at;
      }
    }
    return null;
  }

  public async start() {
    if (!this.playlist[0]) return;
    this.playing = new PlayingSong(this.playlist[0], Date.now());
    clearTimeout(this.stationTimeout);
    this.stationTimeout = setTimeout(this.next.bind(this), this.playing.song.duration);
    this.publish<StationTopic.UpdatePlayerSongPayLoad>(StationTopic.UPDATE_PLAYER_SONG, {
      ...this.getDefaultPubSubPayload(),
      song: this.playing.song
    });
    await this.updateStationStartingTime();
  }

  public async next() {
    const playedSong = this.shiftSong();
    playedSong.isPlayed = true;
    this.playing = null;
    this.publish<StationTopic.UpdatePlayerSongPayLoad>(StationTopic.UPDATE_PLAYER_SONG, {
      ...this.getDefaultPubSubPayload(),
      song: null
    });
    clearTimeout(this.stationTimeout);
    await this.songRepository.save(playedSong);
    await this.start();
  }

  // TODO: Do we need this feature?
  public pause() {
    throw new Exception('This feature is not supported yet!');
  }

  public async stop() {
    clearTimeout(this.stationTimeout);
    const stoppedSong = this.shiftSong();
    this.playing = null;
    this.publish<StationTopic.UpdatePlayerSongPayLoad>(StationTopic.UPDATE_PLAYER_SONG, {
      ...this.getDefaultPubSubPayload(),
      song: null
    });
    stoppedSong.isPlayed = true;
    await this.songRepository.save(stoppedSong);
    await this.start();
  }

  private shiftSong(): PlaylistSong {
    const removedSong = this.playlist[0];
    this.playlist = this.playlist.filter(song => song.id !== removedSong.id);
    this.publish<StationTopic.RemovePlaylistSongPayLoad>(StationTopic.REMOVE_PLAYLIST_SONG, {
      ...this.getDefaultPubSubPayload(),
      songId: removedSong.id
    });
    this.publish<StationTopic.AddSongToHistory>(StationTopic.ADD_SONG_TO_HISTORY, {
      ...this.getDefaultPubSubPayload(),
      song: removedSong
    });
    return removedSong;
  }

  private async updateStationStartingTime(startingTime: number = Date.now()) {
    const station = await this.stationRepository.findOneOrFail(this.parent.id);
    station.startingTime = startingTime;
    this.startedAt = startingTime;
    return this.stationRepository.save(station);
  }

  private publish<Payload>(triggerName: string, payload: Payload): boolean {
    return this.subscriptionManager.pubSub.publish(triggerName, payload);
  }

  private getDefaultPubSubPayload(): StationTopic.StationIdPayload {
    return { stationId: this.parent.stationId };
  }

  private get subscriptionManager(): SubscriptionManager {
    return Container.get(SubscriptionManager);
  }

  private get stationRepository(): StationRepository {
    return Container.get(DataAccess).connection.getCustomRepository(StationRepository);
  }

  private get songRepository(): SongRepository {
    return Container.get(DataAccess).connection.getCustomRepository(SongRepository);
  }
}
