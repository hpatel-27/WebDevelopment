const express = require('express');
const apiRouter = express.Router();


const UserDAO = require('./db/UserDAO');
const ProviderDAO = require('./db/ProviderDAO');
const AccountDAO = require('./db/AccountDAO');


apiRouter.use(express.json());

////////////
//USER API//
////////////

// Get the list of users (for display upon login)
apiRouter.get('/users', (req, res) => {
   UserDAO.getUsers().then(users => {
       res.json(users);
   })
   .catch(err => {
       res.status(500).json({error: 'Internal server error'});
   })
});

//HTTP Method: GET
// Get a user by id
apiRouter.get('/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    UserDAO.getUserById(userId).then(user => {
        if(user) {
            res.json(user);
        }
        else {
            res.status(404).json({error: 'User not found'});
        }
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    })
});


// Note: This may be unnecessary depending on the authentication endpoint.
// HTTP Method: GET
// Authenticate a user


// Note: More information will be learned about this in class.
// HTTP Method: (Likely POST)
// Create a user
apiRouter.post('/users', (req, res) => {

   let newUser = req.body;
   console.log(newUser.body);

   if (!newUser.username || !newUser.email || !newUser.password) {
       return res.status(400).json({ error: 'Missing required fields.' });
   }

   UserDAO.createUser(newUser).then(user => {
       res.json(user);
   })
   .catch(error => {
       res.status(500).json({error: 'Internal server error'});
   })
});


// Note: More information will be learned about this in class.
// HTTP Method: DELETE
// Consideration: Whether this account has previously existed and we are just getting it back and reclaiming its data, or always create a new one from scratch.
// Remove a user account from the interface
apiRouter.delete('/users/:userId', (req, res) => {
   const userId = req.params.userId;

   UserDAO.removeUser(userId)
     .then((removedUser) => {
       res.json({ message: `User with id ${userId} has been removed.`, removedUser });
     })
     .catch((error) => {
       if (error.status && error.error) {
         res.status(error.status).json({ error: error.error });
       } else {
         res.status(500).json({ error: 'Internal server error' });
       }
     });
});


// Note: Unsure whether to remove from the database in case they want to log back in.
// HTTP Method: PUT
// Update a user account (change the password)
apiRouter.put('/users/:userId', (req, res) => {
   const userId = req.params.userId;
   const newPassword = req.body.password;
    UserDAO.changePassword(userId, newPassword)
       .then((user) => {
           res.json({ message: `Password changed for user with id ${userId}.`, user });
       })
       .catch((error) => {
           if (error.status && error.error) {
               res.status(error.status).json({ error: error.error });
           } else {
               res.status(500).json({ error: 'Internal server error' });
           }
   });
});


// HTTP Method: GET
// Get a list of the users providers
apiRouter.get('/users/:userId/providers', (req, res) => {
    const userId = req.params.userId;

    UserDAO.getUserProviders(userId)
        .then((userProviders) => {
            res.json(userProviders);
        })
        .catch((error) => {
            if (error.status && error.error) {
                res.status(error.status).json({ error: error.error });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
});


// HTTP Method: PUT
// Add a provider for the user
apiRouter.put('/users/:userId/providers', (req, res) => {
    const userId = req.params.userId;
    let newProvider = req.body;

    UserDAO.addProvider(userId, newProvider)
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
            if (error.status && error.error) {
                res.status(error.status).json({ error: error.error });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        })
});


// HTTP Method: DELETE
// Delete a provider for the user
apiRouter.delete('/users/:userId/providers/:providerId', (req, res) => {
    const userId = req.params.userId;
    const providerId = req.params.providerId;

    UserDAO.deleteProvider(userId, providerId)
        .then((removedProvider) => {
            res.json({ message: `provider with id ${providerId} has been removed.`, removedProvider });
        })
        .catch((error) => {
            if (error.status && error.error) {
                res.status(error.status).json({ error: error.error });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
});

////////////////
//PROVIDER API//
////////////////

// HTTP Method: GET
// Get the array of all providers in the system
apiRouter.get('/providers', (req, res) => {
    ProviderDAO.getAllProviders().then(providers => {
        res.json(providers);
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    })
 });


//HTTP Method: GET
// Get a provider by id
apiRouter.get('/providers/:providerId', (req, res) => {
    const providerId = parseInt(req.params.providerId);
    ProviderDAO.getProviderById(providerId)
        .then(provider => {
            if(provider) {
                res.json(provider);
            }
            else {
                res.status(404).json({error: 'Provider not found'});
            }
        })
        .catch(err => {
            res.status(500).json({error: 'Internal server error'});
        })
});

// Change the name of a given provider
apiRouter.put('/providers/:providerId', (req, res) => {
    const providerId = req.params.providerId;
    const newName = req.body.name;
    ProviderDAO.changeProviderName(providerId, newName)
        .then(response => {
            res.json(response);
        })
        .catch((error) => {
            if (error.status && error.error) {
                res.status(error.status).json({ error: error.error });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        })
});

// Add an account to a provider
apiRouter.put('/providers/:providerId/accounts', (req, res) => {
    const providerId = req.params.providerId;
    let newAccount = req.body;
    ProviderDAO.addAccount(providerId, newAccount)
        .then((provider) => {
            res.json(provider);
        })
        .catch((error) => {
            if (error.status && error.error) {
                res.status(error.status).json({ error: error.error });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        })
});

// Delete an account from a provider
// BUG HERE
apiRouter.delete('/providers/:providerId/accounts/:accountId', (req, res) => {
    const providerId = req.params.providerId;
    const accountId = req.params.accoundId;

    ProviderDAO.deleteAccount(providerId, accountId)
        .then((removedAccount) => {
            res.json({ message: `account with id ${accountId} has been removed.`, removedAccount });
        })
        .catch((error) => {
            if (error.status && error.error) {
                res.status(error.status).json({ error: error.error });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
})

///////////////
//ACCOUNT API//
///////////////

// Get all accounts
apiRouter.get('/accounts', (req, res) => {
    AccountDAO.getAllAccounts()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({error: 'Internal server error'});
        })
});

// Get an account by id
apiRouter.get('/accounts/:accountId', (req, res) => {
    const accountId = parseInt(req.params.accountId);
    AccountDAO.getAccountById(accountId)
        .then(account => {
            if(account) {
                res.json(account);
            }
            else {
                res.status(404).json({error: 'Account not found'});
            }
        })
        .catch(err => {
            res.status(500).json({error: 'Internal server error'});
        })
})

// Update an account field
apiRouter.put('/accounts/:accountId', (req, res) => {
    const accountId = req.params.accountId;
    const newAccount = req.body;
    AccountDAO.updateAccount( accountId, newAccount )
        .then(account => {
            if(account) {
                res.json(account);
            }
            else {
                res.status(404).json({error: 'Account not found'});
            }
        })
        .catch(err => {
            res.status(500).json({error: 'Internal server error'});
        })
})

module.exports = apiRouter;
