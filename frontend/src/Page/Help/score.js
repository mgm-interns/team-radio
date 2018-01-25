import React from 'react';

const scoreSource = {
  content: `
# User score rules:
---
## Global score - (reputation): 
+ How to get point of reputation? You can get point from: 
    - Updating your profile : The first time you update your profile, you can get point.
      *  Avatar:  20 points
      *  Other: 2 points/ field ( City, country, Bio, first name, last name)

    -	Creating your station: For each your station, you can get point 
      * User: Each 2 users who joined your station you get 1 point. Each user is counted one time for the first times join your station.
      * Song: Each (n) songs which was added to your station by another user you get (n) point.
  
    Note: **Point which you get from each station will be removed when you delete your station**

+ What can you do with your point? 
    - Increase number of your station: After you create your account, you have 1 station in limit. Each 30 points you have you can get 1 station in limit. More point you have more station you can create
      * Example: *After you update full your profile, you can get 30 points and you have 2 stations in limit*

    - Increase your point in station:  When the first times you join each station (not yours) you get a station score. By default as a new user, you have zero. Each 10% your reputation you get 1 station score.
    
      * Example: *After you update full your profile, you can get 30 points and you have 3 station scores*
---     
## Station score:
+ How to get point of station score? You can get point from: 
  -	Like on your songs :  Each like on your song which you added, you get 1 point . Remember you cannot like your song. When you like a song (not yours) you spend 1 point. When your point equal zero, you cannot like song. You can like more than 1 times. It help the song you like was played more soon.
  -	Adding your song: For each song you add you get 1 point, each your song was skipped you lose 1 point. When your point is -1. You need to wait a minute to continue add new song and then your point reset to zero.
  
+ What can you do with your point? 
  -	You can like for the song you like to  make it be play soon, because the song in top of like  is played first.
`,
};

export default scoreSource;
