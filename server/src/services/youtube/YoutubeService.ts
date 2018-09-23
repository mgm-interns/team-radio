import Axios from 'axios';
import { BadRequestException, NotFoundException } from 'exceptions';
import * as getVideoId from 'get-video-id';
import * as Moment from 'moment';
import { Logger } from 'services';
import { Inject, Service } from 'typedi';
import { YoutubeVideo } from '.';

@Service()
export class YoutubeService {
  @Inject()
  private logger: Logger;

  public async getVideoDetail(url: string) {
    try {
      const { id } = getVideoId(url);
      if (!id) throw new BadRequestException('Invalid url');
      const { data } = await Axios.get<YoutubeVideo.Response>(`${process.env.YOUTUBE_API_URL}/videos`, {
        params: {
          id,
          key: process.env.YOUTUBE_API_KEY,
          part: 'id,snippet,contentDetails,status'
        }
      });
      if (data && data.items[0]) {
        return data.items[0];
      }
      throw new NotFoundException('Could not find Video.');
    } catch (error) {
      this.logger.error('Error while fetching video detail', error);
      throw error;
    }
  }

  public parseDuration(duration: string) {
    return Moment.duration(duration).asMilliseconds();
  }
}
