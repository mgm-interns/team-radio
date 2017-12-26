// Prefix: api

export default router => {
  // For demonstration
  router.get('/dummy', (req, res) => {
    // return response
    res.json({
      title: 'Express',
      content: 'Hello Express',
      isLiked: true,
      likesCount: 12,
    });
  });
};
