import { DataAccess } from 'config';
import { UnavailableSong } from 'entities';
import { UnavailableSongRepository } from 'repositories';
import { Container, Service } from 'typedi';
import { Logger } from 'services';

@Service()
export class UnavailableSongService {
  public async verifySong(url: string): Promise<VerificationResult> {
    const song = await this.unavailableSongRepository.findUnAvailableSongByUrl(url);
    if (song) return { song, valid: false };

    return { song: null, valid: true };
  }

  public async createUnavailableSong(url: string, errorCode: number): Promise<UnavailableSong> {
    const existedSong = await this.unavailableSongRepository.findUnAvailableSongByUrl(url);

    if (existedSong) {
      this.logger.debug(`Unavailable song ${url} has already been existed.`);
      return existedSong;
    }

    const song = this.unavailableSongRepository.create({ url, errorCode });
    return this.unavailableSongRepository.save(song);
  }

  private get unavailableSongRepository(): UnavailableSongRepository {
    return Container.get(DataAccess).getRepository(UnavailableSongRepository);
  }

  private get logger(): Logger {
    return Container.get(Logger);
  }
}

export interface VerificationResult {
  valid: boolean;
  song: UnavailableSong | null;
}
