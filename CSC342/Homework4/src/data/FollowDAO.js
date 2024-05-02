let follows = require('./follows.json');

// // Get users followed by user with ID 1:
// let user1Follows = follows["1"].following; //returns [24, 6, 7]

// // Make user with ID 1 follow user with ID 3
// follows["1"].following.push(3);
module.exports = {

  getFollows: () => {
      return new Promise((resolve, reject) => {
        resolve(Object.values(follows));
      });
  },

  // gets the list of users that the given user follows
  getFollowingById: (userId) => {
    return new Promise((resolve, reject) => {
      const following = follows[userId];
      if(following) {
        resolve(following);
      }
      else {
        reject();
      }
    });


  },

  addFollower: (userId, followId) => {
    return new Promise((resolve, reject) => {
      let userFollowing = follows[userId].following;
      userFollowing.push(followId);
      resolve( userFollowing );
    });
  },

  removeFollower: (userId, followId) => {
    return new Promise((resolve, reject) => {
        let userFollowing = follows[userId].following;
        userFollowing.filter(id => id !== followId );
        resolve( userFollowing );
    });
  }
};
