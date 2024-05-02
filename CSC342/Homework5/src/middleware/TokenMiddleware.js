// const jwt = require('jsonwebtoken');
const crypto = require( 'crypto' );
const { Buffer } = require( 'buffer' );

const TOKEN_COOKIE_NAME = "HW5Token";
// In a real application, you will never hard-code this secret and you will
// definitely never commit it to version control, ever
const API_SECRET = process.env.API_SECRET_KEY;

exports.TokenMiddleware = (req, res, next) => {
  // We will look for the token in two places:
  // 1. A cookie in case of a browser
  // 2. The Authorization header in case of a different client
  let token = null;
  if(!req.cookies[TOKEN_COOKIE_NAME]) {
    //No cookie, so let's check Authorization header
    const authHeader = req.get('Authorization');
    if(authHeader && authHeader.startsWith("Bearer ")) {
      //Format should be "Bearer token" but we only need the token
      token = authHeader.split(" ")[1].trim();
    }
  }
  else { //We do have a cookie with a token
    token = req.cookies[TOKEN_COOKIE_NAME]; //Get session Id from cookie
  }

  if(!token) { // If we don't have a token
    res.status(401).json({error: 'Not authenticated'});
    return;
  }

  //If we've made it this far, we have a token. We need to validate it

  try {


    // MAKE CHANGES HERE
    // const decoded = jwt.verify(token, API_SECRET);

    const tokenArr = token.split('.');

    const tokenH = tokenArr[0];
    const tokenP = tokenArr[1];
    const tokenS = tokenArr[2];

    const passedSig = `${tokenH}.${tokenP}`;

    const verify = crypto.createHmac( 'sha256', API_SECRET).update(passedSig).digest('base64url');

    if ( verify !== tokenS ) {
      throw new Error( "Signature did not match :( some is being malicious");
    }

    // otherwise we have proven we are the correct person


    const decoded = JSON.parse(base64urlDecode(tokenP));

    const currentTime = Math.floor( Date.now() / 1000 );
    if ( !decoded.exp || decoded.exp < currentTime ) {
      throw new Error( "Token was expired" );
    }


    req.user = decoded.user;
    next(); //Make sure we call the next middleware
  }
  catch(err) { //Token is invalid
    res.status(401).json({error: 'Not authenticated'});
    return;
  }


}

function base64urlDecode(string) {
  return Buffer.from(string, 'base64url').toString('utf8');
}


exports.generateToken = (req, res, user) => {
  let data = {
    user: user,
    // Use the exp registered claim to expire token in 2 minutes
    exp: Math.floor(Date.now() / 1000) + (2 * 60)
  }

    // MAKE CHANGES HERE

  // const token = jwt.sign(data, API_SECRET);


  let tokenHeader = {
    alg: "HS256",
    typ: "JWT"
  };


  const encodedH = base64urlEncode(tokenHeader);

  const encodedP = base64urlEncode(data);

  const startingSig = `${encodedH}.${encodedP}`;

  const encodedSig = crypto.createHmac( 'sha256', API_SECRET).update(startingSig).digest('base64url');

  const token = `${encodedH}.${encodedP}.${encodedSig}`;

  //send token in cookie to client
  res.cookie(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    maxAge: 2 * 60 * 1000
  });
};

function base64urlEncode(obj) {
  const objString = JSON.stringify(obj);

  return Buffer.from(objString, 'utf8').toString('base64url');
}


exports.removeToken = (req, res) => {
  //send session ID in cookie to client
  res.cookie(TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    maxAge: -360000 //A date in the past
  });

}

