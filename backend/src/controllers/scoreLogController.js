import ScoreLog from '../models/score-log';

export const createScoreLog = async (userId, score, actionKey) => {
  try {
    return await ScoreLog.createScoreLog(userId, score, actionKey);
  } catch (error) {
    throw error;
  }
}
