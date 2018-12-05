import { BadRequestException } from 'exceptions';
import { default as fetchFunction } from 'node-fetch';
import { Logger } from '../logger';
import { YoutubeHelper, YoutubeVideo } from 'team-radio-shared';
import { Inject, Service } from 'typedi';

@Service()
export class YoutubeService {
  @Inject()
  private logger: Logger;

  constructor(private youtubeHelper = new YoutubeHelper(fetchFunction)) {}

  public async getVideoDetail(url: string): Promise<YoutubeVideo.Video> {
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
