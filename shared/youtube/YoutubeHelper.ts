import { YoutubeVideo } from './interfaces';

export class YoutubeHelper {
  constructor(private fetch: YoutubeHelper.FetchFunction, private moment: YoutubeHelper.Moment) {}

  public fetchVideoDetail(videoId: string, options: YoutubeHelper.FetchOptions): Promise<YoutubeVideo.Video> {
    const part = 'id,snippet,contentDetails';
    return this.fetch(`${options.apiUrl}/videos?id=${videoId}&key=${options.apiKey}&part=${part}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.items[0]) {
          return data.items[0];
        }
        throw new Error('Could not find Video.');
      });
  }

  public parseDuration(duration: string) {
    return this.moment.duration(duration).asMilliseconds();
  }
}

export namespace YoutubeHelper {
  export interface FetchOptions {
    apiUrl: string;
    apiKey: string;
  }
  export type FetchFunction = (url: string) => Promise<{ json(): Promise<YoutubeVideo.Response> }>;
  export interface Moment {
    duration(duration: string): { asMilliseconds(): number };
  }
}
