import Commit from '../models/commit';

export const getRepositoryCommits = async (limit = 20) => {
  try {
    const commits = await Commit.find({
      'commit.verification.verified': false, // Ignore verified commit on Github
      'commit.message': /^((?!Merge).)*$/g, // Ignore any "Merge" commits
    })
      .select({
        sha: 1,
        url: 1,
        html_url: 1,
        'commit.author': 1,
        'commit.committer': 1,
        'commit.message': 1,
        'author.login': 1,
        'author.id': 1,
        'author.avatar_url': 1,
        'author.url': 1,
        'author.html_url': 1,
        'committer.login': 1,
        'committer.id': 1,
        'committer.avatar_url': 1,
        'committer.url': 1,
        'committer.html_url': 1,
      })
      .sort('-commit.author.date')
      .limit(limit);
    return commits;
  } catch (err) {
    throw err;
  }
};

export default { getRepositoryCommits };
