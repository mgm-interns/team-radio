import * as getVideoId from 'get-video-id';
import * as Moment from 'moment';
import { YoutubeVideo } from './interfaces';

export class YoutubeHelper {
  constructor(private fetch: YoutubeHelper.FetchFunction) {}

  public parseVideoUrl(url: string): YoutubeHelper.VideoReturnType {
    const { id, service } = getVideoId(url);
    if (!id) throw new Error('Invalid url');
    if (service !== 'youtube') throw new Error(`Service ${service} is not yet supported`);
    return { id, service }
  }

  public async fetchVideoDetail(url: string, options: YoutubeHelper.FetchOptions): Promise<YoutubeVideo.Video> {
    const { id } = this.parseVideoUrl(url);
    const part = 'id,snippet,contentDetails';
    const serviceUrl = `${options.apiUrl}/videos?id=${id}&key=${options.apiKey}&part=${part}`;
    const data = await this.fetch(serviceUrl).then(res => res.json());
    if (data && data.items[0]) {
      return data.items[0];
    }
    throw new Error('Could not find Video.');
  }

  public parseDuration(duration: string) {
    return Moment.duration(duration).asMilliseconds();
  }
}

export namespace YoutubeHelper {
  export interface FetchOptions {
    apiUrl: string;
    apiKey: string;
  }
  export type FetchFunction = (url: string) => Promise<{ json(): Promise<YoutubeVideo.Response> }>;

  export type VideoReturnType = { id: string; service: 'youtube'  }
}
