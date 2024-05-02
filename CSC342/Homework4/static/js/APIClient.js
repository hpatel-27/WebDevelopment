import HTTPClient from "./HTTPClient.js";

const API_BASE = `/api`;



const getHowls = () => {
  return HTTPClient.get(`${API_BASE}/howls`);
};

const getHowlsByUserId = (userId) => {
  return HTTPClient.get(`${API_BASE}/howls/${userId}`);
};

const newHowl = (howlUser, howlDate, howlText) => {
  return HTTPClient.post(`${API_BASE}/howls`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      howlUser,
      howlDate,
      howlText
    })
  });
};

const getFollowing = () => {
    return HTTPClient.get(`${API_BASE}/follows`);
};

const getFollowingById = (userId) => {
  return HTTPClient.get(`${API_BASE}/follows/${userId}`);
};

const addFollower = (userId, followId) => {
    return HTTPClient.post(`${API_BASE}/follows/${userId}`);
};

const removeFollower = (userId, followId) => {
    return HTTPClient.delete(`${API_BASE}/follows/${userId}`);
};

const getCurrentUser = () => {
  return HTTPClient.get(`${API_BASE}/users/current`);
};

const getUserById = (userId) => {
  return HTTPClient.get(`${API_BASE}/users/${userId}`);
};

const logIn = (username, password) => {
  const data = {
    username: username,
    password: password
  }
  return HTTPClient.post(`${API_BASE}/users/login`, data);
};

const logOut = () => {
  return HTTPClient.post(`${API_BASE}/users/logout`, {});
};


export default {
    getHowls,
    getHowlsByUserId,
    newHowl,
    getFollowing,
    getFollowingById,
    addFollower,
    removeFollower,
    getCurrentUser,
    getUserById,
    logIn,
    logOut
};



