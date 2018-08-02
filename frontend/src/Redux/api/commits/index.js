import HttpRequest from 'Util/redux/HttpRequest';

const ENDPOINT = process.env.REACT_APP_SERVER_END_POINT;

const getRecentRepositoryCommitsRequest = new HttpRequest({
  method: 'GET',
  type: 'FETCH_RECENT_REPOSITORY_COMMITS',
  endpoint: `${ENDPOINT}/commits`,
  initialData: {},
});

export const getRecentRepositoryCommits = getRecentRepositoryCommitsRequest.getAction();

export default getRecentRepositoryCommitsRequest.getReducer();
