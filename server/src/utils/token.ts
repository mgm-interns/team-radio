export namespace TokenHelper {
  export const generateExpiredTime = () => {
    const lifeTime = 1000 * 60 * 60 * 24; // a day
    return new Date().getTime() + lifeTime;
  };

  export const generateRefreshTokenExpiredTime = () => {
    const lifeTime = 1000 * 60 * 60 * 24 * 7; // a week
    return new Date().getTime() + lifeTime;
  };
}
