import { BadRequestException } from 'exceptions';
import * as getVideoId from 'get-video-id';
import * as Moment from 'moment';
import Fetch from 'node-fetch';
import { Logger } from 'services';
import { Inject, Service } from 'typedi';
import { YoutubeHelper } from '../../../../shared/youtube';
export { YoutubeVideo } from '../../../../shared/youtube';

@Service()
export class YoutubeService {
  @Inject()
  private logger: Logger;

  constructor(private youtubeHelper = new YoutubeHelper(Fetch, Moment)) {}

  public async getVideoDetail(url: string) {
    try {
      const { id } = getVideoId(url);
      if (!id) throw new BadRequestException('Invalid url');
      return this.youtubeHelper.fetchVideoDetail(id, {
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
