export namespace YoutubeVideo {
  interface BaseItem {
    kind: string;
    etag: string;
  }

  export interface Response extends BaseItem {
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
    items: Video[];
  }

  export interface Video extends BaseItem {
    id: string;
    snippet: Snippet;
    contentDetails: ContentDetail;
    status: Status;
  }

  export interface Snippet {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
      standard: Thumbnail;
      maxres: Thumbnail;
    };
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: 'none';
    defaultAudioLanguage: string;
    localized: {
      title: string;
      description: string;
    };
  }

  export interface Thumbnail {
    url: string;
    width: number;
    height: number;
  }

  export  interface ContentDetail {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    regionRestriction?: {
      blocked: string[]
    }
  }

  export interface Status {
    uploadStatus: string;
    privacyStatus: 'public' | 'private';
    license: string;
    embeddable: boolean;
    publicStatsViewable: boolean;
  }
}
