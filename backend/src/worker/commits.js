import request from 'request-promise';
import Commit from '../models/commit';
import { workerlog } from './logger';

export const scanCommits = () => Promise.all([scanGithubCommits()]);

export const scanGithubCommits = async () => {
  workerlog('Start fetching to github commits');
  const result = await request.get({
    url: process.env.GITHUB_COMMITS_API,
    headers: {
      'User-Agent': process.env.GITHUB_USER_AGENT || 'team-radio',
    },
  });

  const commits = JSON.parse(result).map(item => {
    const { commit } = item;
    if (commit.author) {
      commit.author.date = new Date(commit.author.date).getTime();
    }
    if (commit.committer) {
      commit.committer.date = new Date(commit.committer.date).getTime();
    }
    return item;
  });

  await Commit.remove();
  await Commit.insertMany(commits);
  workerlog('Update latest github commits');
};
