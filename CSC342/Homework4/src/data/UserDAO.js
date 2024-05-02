const crypto = require('crypto');

let users = require('./users.json');

//This file mimics making asynchronous request to a database
module.exports = {
  getUserByCredentials: (username) => {
    return new Promise((resolve, reject) => {
      const user = Object.values(users).find(user => user.username == username);
      if (user) { // we found our user
        resolve( getFilteredUser(user));
        
      }
      else { // if no user with provided username
        reject({code: 401, message: "No such user"});
      }
    })

  },

  getUserById: (userId) => {
    return new Promise ((resolve, reject) => {
      // get the list of howls made by a user given their userid
      const user = Object.values(users).find(user => user.id == userId);
      if ( user ) {
          resolve(getFilteredUser(user));

      }
      else {
          reject();
      }
    })
  }
};


function getFilteredUser(user) {
  return {
    "id": user.id,
    "first_name": user.first_name,
    "last_name": user.last_name,
    "username": user.username,
    "avatar": user.avatar
  }
}