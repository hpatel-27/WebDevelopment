const crypto = require('crypto');

const sessions = {};

const SESSION_COOKIE_NAME = "HowlerCookie";

exports.SessionMiddleware = (req, res, next) => {
  if(!req.cookies[SESSION_COOKIE_NAME]) {
    res.status(401).json({error: 'Not authenticated'});
    return;
  }
  else { //We do have a cookie with a session. Is it valid?
    //Get session Id from cookie
    let sessionId = req.cookies[SESSION_COOKIE_NAME];
    if(!sessions[sessionId]) { // If we don't have a session with that ID
      this.removeSession(req, res); //remove the cookie
      res.status(401).json({error: 'Not authenticated'});
      return;
    }
    else { //We do have a matching session! Populate it in the request
      req.session = sessions[sessionId] //store session object in the request
      next(); //Make sure we call the next middleware
    }
  }
}


exports.initializeSession = (req, res, user) => {
  let sessionId = generateSessionId();
  let sessionData = {
    user: user,
    howls: []
  }

  //send session ID in cookie to client
  res.cookie(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: true,
    maxAge: 5 * 60 * 1000 //This session expires in 5 minutes
  });

  sessions[sessionId] = sessionData; //Associate ID with data
};


exports.removeSession = (req, res) => {
  let sessionId = req.cookies[SESSION_COOKIE_NAME];
  if(sessionId) {
    delete sessions[sessionId];
  }
  //send session ID in cookie to client
  res.cookie(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    maxAge: -360000 //A date in the past
  });

}



function generateSessionId() {
  return crypto.randomBytes(256).toString ("hex");
}