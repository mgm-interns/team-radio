import { BadRequestException } from 'exceptions';
import Fetch from 'node-fetch';
import { Logger } from '../logger';
import { YoutubeHelper } from 'team-radio-shared';
import { Inject, Service } from 'typedi';
export { YoutubeVideo } from 'team-radio-shared';

@Service()
export class YoutubeService {
  @Inject()
  private logger: Logger;

  constructor(private youtubeHelper = new YoutubeHelper(Fetch)) {}

  public async getVideoDetail(url: string) {
    try {
      return this.youtubeHelper.fetchVideoDetail(url, {
        apiKey: process.env.YOUTUBE_API_KEY as string,
        apiUrl: process.env.YOUTUBE_API_URL as string
      });
    } catch (error) {
      this.logger.error('Error while fetching video detail', error);
      throw new BadRequestException(error.message);
    }
  }

  public parseDuration(duration: string) {
    return this.youtubeHelper.parseDuration(duration);
  }
}
