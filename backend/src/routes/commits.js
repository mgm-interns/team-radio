import { getRepositoryCommits } from '../controllers/commits';

export default router => {
  router.get('/commits', (req, res) => {
    getRepositoryCommits().then(result => {
      res.status(200).json({
        success: true,
        html_url: process.env.GITHUB_REPOSITORY_COMMITS,
        data: result,
      });
    });
  });
};
