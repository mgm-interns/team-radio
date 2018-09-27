declare module 'get-video-id' {
  interface ReturnType {
    id: string | undefined;
    service: 'youtube' | null | undefined;
  }
  const getVideoId: (url: string) => ReturnType;
  export = getVideoId;
}
