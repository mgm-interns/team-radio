import ScoreLog from '../models/score-log';

export const createScoreLog = async (userId, score, actionKey, score_description) => {
  try {
    return await ScoreLog.createScoreLog(userId, score, actionKey,score_description);
  } catch (error) {
    throw error;
  }
}
