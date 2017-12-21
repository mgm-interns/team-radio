const randomList = [
  'https://www.youtube.com/watch?v=LjhCEhWiKXk',
  'https://www.youtube.com/watch?v=ekzHIouo8Q4',
  'https://www.youtube.com/watch?v=IumYMCllMsM',
  'https://www.youtube.com/watch?v=Io0fBr1XBUA',
  'https://www.youtube.com/watch?v=2vjPBrBU-TM',
  'https://www.youtube.com/watch?v=hT_nvWreIhg',
  'https://www.youtube.com/watch?v=OPf0YbXqDm0',
  'https://www.youtube.com/watch?v=BQ0mxQXmLsk',
  'https://www.youtube.com/watch?v=JGwWNGJdvx8',
  'https://www.youtube.com/watch?v=3tmd-ClpJxA',
];

export const nowplaying = {
  nowplaying: {
    url: 'https://www.youtube.com/watch?v=igSCSQ9fg14',
    start: new Date(),
  },
};

export const randomNowplaying = () => {
  const index = Math.floor(Math.random() * 10) + 1;

  return {
    url: randomList[index],
    start: new Date(),
  };
};

export const playlist = [
  {
    name: 'WHAT THE FUCK IS THIS MUSIC',
    singer: 'Ali Connors',
    uploader: 'lybaokhanh',
    score: 30,
    isUpvoted: true,
    thumbnail:
      'https://vignette.wikia.nocookie.net/5-seconds-of-summer/images/e/ee/Luke_try_hard.jpg',
    playing: true,
  },
  {
    name: 'WHAT THE FUCK IS THIS MUSIC',
    singer: 'Ali Connors',
    uploader: 'lybaokhanh',
    score: 6,
    isUpvoted: false,
    thumbnail:
      'https://vignette.wikia.nocookie.net/5-seconds-of-summer/images/e/ee/Luke_try_hard.jpg',
  },
  {
    name: 'WHAT THE FUCK IS THIS MUSIC',
    singer: 'Ali Connors',
    uploader: 'lybaokhanh',
    score: 5,
    isUpvoted: true,
    thumbnail:
      'https://vignette.wikia.nocookie.net/5-seconds-of-summer/images/e/ee/Luke_try_hard.jpg',
  },
  {
    name: 'WHAT THE FUCK IS THIS MUSIC',
    singer: 'Ali Connors',
    uploader: 'lybaokhanh',
    score: 3,
    isUpvoted: false,
    thumbnail:
      'https://vignette.wikia.nocookie.net/5-seconds-of-summer/images/e/ee/Luke_try_hard.jpg',
  },
  {
    name: 'WHAT THE FUCK IS THIS MUSIC',
    singer: 'Ali Connors',
    uploader: 'lybaokhanh',
    score: 1,
    isUpvoted: false,
    thumbnail:
      'https://vignette.wikia.nocookie.net/5-seconds-of-summer/images/e/ee/Luke_try_hard.jpg',
  },
  {
    name: 'WHAT THE FUCK IS THIS MUSIC',
    singer: 'Ali Connors',
    uploader: 'lybaokhanh',
    score: 1,
    isUpvoted: false,
    thumbnail:
      'https://vignette.wikia.nocookie.net/5-seconds-of-summer/images/e/ee/Luke_try_hard.jpg',
  },
  {
    name: 'WHAT THE FUCK IS THIS MUSIC',
    singer: 'Ali Connors',
    uploader: 'lybaokhanh',
    score: 1,
    isUpvoted: false,
    thumbnail:
      'https://vignette.wikia.nocookie.net/5-seconds-of-summer/images/e/ee/Luke_try_hard.jpg',
  },
  {
    name: 'WHAT THE FUCK IS THIS MUSIC',
    singer: 'Ali Connors',
    uploader: 'lybaokhanh',
    score: 1,
    isUpvoted: false,
    thumbnail:
      'https://vignette.wikia.nocookie.net/5-seconds-of-summer/images/e/ee/Luke_try_hard.jpg',
  },
  {
    name: 'WHAT THE FUCK IS THIS MUSIC',
    singer: 'Ali Connors',
    uploader: 'lybaokhanh',
    score: 1,
    isUpvoted: false,
    thumbnail:
      'https://vignette.wikia.nocookie.net/5-seconds-of-summer/images/e/ee/Luke_try_hard.jpg',
  },
  {
    name: 'WHAT THE FUCK IS THIS MUSIC',
    singer: 'Ali Connors',
    uploader: 'lybaokhanh',
    score: 1,
    isUpvoted: false,
    thumbnail:
      'https://vignette.wikia.nocookie.net/5-seconds-of-summer/images/e/ee/Luke_try_hard.jpg',
  },
  {
    name: 'WHAT THE FUCK IS THIS MUSIC',
    singer: 'Ali Connors',
    uploader: 'lybaokhanh',
    score: 1,
    isUpvoted: false,
    thumbnail:
      'https://vignette.wikia.nocookie.net/5-seconds-of-summer/images/e/ee/Luke_try_hard.jpg',
  },
  {
    name: 'WHAT THE FUCK IS THIS MUSIC',
    singer: 'Ali Connors',
    uploader: 'lybaokhanh',
    score: 1,
    isUpvoted: false,
    thumbnail:
      'https://vignette.wikia.nocookie.net/5-seconds-of-summer/images/e/ee/Luke_try_hard.jpg',
  },
  {
    name: 'WHAT THE FUCK IS THIS MUSIC',
    singer: 'Ali Connors',
    uploader: 'lybaokhanh',
    score: 1,
    isUpvoted: false,
    thumbnail:
      'https://vignette.wikia.nocookie.net/5-seconds-of-summer/images/e/ee/Luke_try_hard.jpg',
  },
  {
    name: 'WHAT THE FUCK IS THIS MUSIC',
    singer: 'Ali Connors',
    uploader: 'lybaokhanh',
    score: 1,
    isUpvoted: false,
    thumbnail:
      'https://vignette.wikia.nocookie.net/5-seconds-of-summer/images/e/ee/Luke_try_hard.jpg',
  },
  {
    name: 'WHAT THE FUCK IS THIS MUSIC',
    singer: 'Ali Connors',
    uploader: 'lybaokhanh',
    score: 1,
    isUpvoted: false,
    thumbnail:
      'https://vignette.wikia.nocookie.net/5-seconds-of-summer/images/e/ee/Luke_try_hard.jpg',
  },
  {
    name: 'WHAT THE FUCK IS THIS MUSIC',
    singer: 'Ali Connors',
    uploader: 'lybaokhanh',
    score: 1,
    isUpvoted: false,
    thumbnail:
      'https://vignette.wikia.nocookie.net/5-seconds-of-summer/images/e/ee/Luke_try_hard.jpg',
  },
  {
    name: 'WHAT THE FUCK IS THIS MUSIC',
    singer: 'Ali Connors',
    uploader: 'lybaokhanh',
    score: 1,
    isUpvoted: false,
    thumbnail:
      'https://vignette.wikia.nocookie.net/5-seconds-of-summer/images/e/ee/Luke_try_hard.jpg',
  },
  {
    name: 'WHAT THE FUCK IS THIS MUSIC',
    singer: 'Ali Connors',
    uploader: 'lybaokhanh',
    score: 1,
    isUpvoted: false,
    thumbnail:
      'https://vignette.wikia.nocookie.net/5-seconds-of-summer/images/e/ee/Luke_try_hard.jpg',
  },
  {
    name: 'WHAT THE FUCK IS THIS MUSIC',
    singer: 'Ali Connors',
    uploader: 'lybaokhanh',
    score: 1,
    isUpvoted: false,
    thumbnail:
      'https://vignette.wikia.nocookie.net/5-seconds-of-summer/images/e/ee/Luke_try_hard.jpg',
  },
];

export default {
  playlist,
  nowplaying,
  randomNowplaying,
};
