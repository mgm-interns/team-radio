const mongoose = require('mongoose');
const getVideoId = require('get-video-id');
const request = require('request-promise');
const cheerio = require('cheerio');

export default async songUrl => {
  const songInput = getVideoId(songUrl);
  if (songInput === undefined) {
    // The songUrl is invalid
    return null;
  }
  if (songInput.service === 'youtube') {
    const fulllUrl = 'https://www.youtube.com/watch?v=' + songInput.id;
    // Get new song information
    const body = await fetchVideoPage(songInput.id);
    const videoInfo = parseVideoInfo(body, songInput.id);

    if (videoInfo.url === undefined) {
      // The songInput.id is invalid
      return null;
    }
    // The needed information
    return {
      url: videoInfo.url,
      title: videoInfo.title,
      thumbnail: videoInfo.thumbnailUrl,
      duration: videoInfo.duration * 1000,
    };
  }
  return null;
};

const fetchVideoPage = videoId =>
  request({
    url: 'https://www.youtube.com/watch?v=' + videoId,
    jar: true,
    headers: {
      Host: 'www.youtube.com',
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64; rv:42.0) Gecko/20100101 Firefox/42.0',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      Connection: 'keep-alive',
      'Cache-Control': 'max-age=0',
    },
  });

const parseVideoInfo = (body, videoId) => {
  const $ = cheerio.load(body);
  const url = extractValue($('.watch-main-col link[itemprop="url"]'), 'href');
  const title = extractValue(
    $('.watch-main-col meta[itemprop="name"]'),
    'content',
  );
  const description = $('.watch-main-col #eow-description').html();
  const owner = $('.yt-user-info > a').text();
  const channelId = extractValue(
    $('.watch-main-col meta[itemprop="channelId"]'),
    'content',
  );
  const thumbnailUrl = extractValue(
    $('.watch-main-col link[itemprop="thumbnailUrl"]'),
    'href',
  );
  const embedURL = extractValue(
    $('.watch-main-col link[itemprop="embedURL"]'),
    'href',
  );
  const datePublished = extractValue(
    $('.watch-main-col meta[itemprop="datePublished"]'),
    'content',
  );
  const genre = extractValue(
    $('.watch-main-col meta[itemprop="genre"]'),
    'content',
  );

  let paid = extractValue(
    $('.watch-main-col meta[itemprop="paid"]'),
    'content',
  );
  paid = paid ? paid === 'True' : undefined;

  let unlisted = extractValue(
    $('.watch-main-col meta[itemprop="unlisted"]'),
    'content',
  );
  unlisted = unlisted ? unlisted === 'True' : undefined;

  let isFamilyFriendly = extractValue(
    $('.watch-main-col meta[itemprop="isFamilyFriendly"]'),
    'content',
  );
  isFamilyFriendly = isFamilyFriendly && isFamilyFriendly === 'True';

  let duration = extractValue(
    $('.watch-main-col meta[itemprop="duration"]'),
    'content',
  );
  duration = duration ? parseDuration(duration) : undefined;

  let regionsAllowed = extractValue(
    $('.watch-main-col meta[itemprop="regionsAllowed"]'),
    'content',
  );
  regionsAllowed = regionsAllowed ? regionsAllowed.split(',') : undefined;

  let views = extractValue(
    $('.watch-main-col meta[itemprop="interactionCount"]'),
    'content',
  );
  views = views ? parseInt(views, 10) : undefined;

  return {
    videoId: videoId,
    url: url,
    title: title,
    description: description,
    owner: owner,
    channelId: channelId,
    thumbnailUrl: thumbnailUrl,
    embedURL: embedURL,
    datePublished: datePublished,
    genre: genre,
    paid: paid,
    unlisted: unlisted,
    isFamilyFriendly: isFamilyFriendly,
    duration: duration,
    views: views,
    regionsAllowed: regionsAllowed,
  };
};

const extractValue = ($, attribute) => {
  if ($ && $.length) {
    return $.attr(attribute) || undefined;
  }
  return undefined;
};

const parseDuration = raw => {
  const m = /^[a-z]*(?:(\d+)M)?(\d+)S$/i.exec(raw);
  if (!m) return -1;

  const minutes = m[1] ? parseInt(m[1], 10) : 0;
  const seconds = m[2] ? parseInt(m[2], 10) : 0;
  return minutes * 60 + seconds;
};
