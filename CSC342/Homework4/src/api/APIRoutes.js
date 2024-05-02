const express = require('express');
const cookieParser = require('cookie-parser');

const apiRouter = express.Router();

apiRouter.use(cookieParser());
apiRouter.use(express.json());

const {SessionMiddleware, initializeSession, removeSession} = require('../middleware/SessionCookieMiddleware');

/************\
* API ROUTES *
\************/

const FollowDAO = require('../data/FollowDAO');
const HowlDAO = require('../data/HowlDAO');
const UserDAO = require('../data/UserDAO');

// make a new howl
apiRouter.post('/howls', SessionMiddleware, (req,  res) => {
    HowlDAO.newHowl(req.body.howlUser, req.body.howlDate, req.body.howlText).then(howl => {
        res.json(howl);
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    });
});

//Get all howls
apiRouter.get('/howls', SessionMiddleware, (req,  res) => {
    HowlDAO.getHowls().then(howls => {
        res.json(howls);
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    });
});

//Get all howls for a user
apiRouter.get('/howls/:userId', SessionMiddleware, (req,  res) => {
    HowlDAO.getHowlsByUserId(req.params.userId).then(howls => {
        res.json(howls);
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    });
});

//Get all the followings for all the users
apiRouter.get('/follows', SessionMiddleware, (req, res ) => {
    FollowDAO.getFollowing().then(follows => {
        res.json(follows);
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    });
});

//Get all following for a user
apiRouter.get('/follows/:userId', SessionMiddleware, (req,  res) => {
    FollowDAO.getFollowingById(req.params.userId).then(follows => {
        res.json(follows);
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    });
});


// Unfollow someone
apiRouter.delete('/follows/:userId', SessionMiddleware, (req,  res) => {
    res.status(501).json({error: 'Not implemented'});
});

apiRouter.get( '/profile/:userId', SessionMiddleware, ( req, res ) => {
    UserDAO.getUserById(req.params.userId).then(user => {
        res.json(user);
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    });

});




/* USER ROUTES */

apiRouter.post('/users/login', (req,  res) => {
    if(req.body.username) {
        UserDAO.getUserByCredentials(req.body.username).then(user => {
        let result = {
            user: user
        }

        initializeSession(req, res, user);

        res.json(result);
        }).catch(err => {
        console.log(err);
        res.status(err.code).json({error: err.message});
        });
    }
    else {
        res.status(401).json({error: 'Not authenticated'});
    }
});

apiRouter.post('/users/logout', (req,  res) => {
    removeSession(req, res);

    res.json({success: true});
});


apiRouter.get('/users/current', SessionMiddleware, (req,  res) => {
    res.json(req.session.user);
});

// For testing purposes, get all the users
apiRouter.get('/users', SessionMiddleware, (req, res) => {
    UserDAO.getAllUsers().then(allUsers => {
        res.json(allUsers);
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    });
});

// Get a  user
apiRouter.get('/users/:userId', SessionMiddleware, (req, res) => {
    UserDAO.getUserById(req.params.userId).then(user => {
        res.json(user);
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    });
});

module.exports = apiRouter;
