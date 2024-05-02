let users = require('./data/users.json');
let ProviderDAO = require('./ProviderDAO');


module.exports = {

   //getUsers
   getUsers: () => {
       return new Promise((resolve, reject) => {
           resolve(Object.values(users))
       })
   },


   //getUserById
   getUserById: (userId) => {
       return new Promise((resolve, reject) => {
           const user = users[userId];
           if(user) {
               resolve(user);
           }
       })
   },


   //createUser
   createUser: (newUser) => {
       return new Promise((resolve, reject) => {
            try {
                let usersArray = Object.values(users);
                let id = usersArray.length > 0 ? usersArray[usersArray.length - 1].id + 1 : 1
                newUser.id = id;
                newUser.providers = [];
                users[id] = newUser;
                resolve(newUser);
            } catch(error) {
                reject(error);
            }
       })
   },


   //removeUser
   removeUser: (userId) => {
       return new Promise((resolve, reject) => {
           try {
               userId = parseInt(userId);
               const userToRemove = users[userId];

               if(!userToRemove) {
                   reject({ status: 404, error: `User with id ${userId} not found` });
               }

               delete users[userId];
               resolve(userToRemove);


           } catch(error) {
               reject(error);
           }
       })
   },


   changePassword: (userId, newPassword) => {
       return new Promise((resolve, reject) => {
           try {
               userId = parseInt(userId);
               const user = users[userId];
  
               if (!user) {
                   reject({ status: 404, error: `User with id ${userId} not found` });
               }
               user.password = newPassword;
               resolve(user);
           } catch (error) {
               reject(error);
           }
         });
   },


   //getUserProviders
   getUserProviders: (userId) => {
        return new Promise((resolve, reject) => {
            try {
                userId = parseInt(userId);
                const user = users[userId];
      
                if (!user) {
                    reject({ status: 404, error: `User with id ${userId} not found` });
                }
      
                const userProviders = user.providers || [];
                resolve(userProviders);
            } catch (error) {
                reject(error);
            }
        });
   },


   //addProvider
    addProvider: async (userId, newProvider) => {
        return new Promise(async (resolve, reject) => {
            const returnedProvider = await ProviderDAO.createProvider(newProvider);
            userId = parseInt(userId);
            const user = users[userId];
      
            if (!user) {
                reject({ status: 404, error: `User with id ${userId} not found` });
            }

            user.providers.push(returnedProvider.id);
            resolve(user);
        })
    },


    //deleteProvider
    deleteProvider: async (userId, providerId) => {
        return new Promise(async (resolve, reject) => {
            try {
                userId = parseInt(userId);
                providerId = parseInt(providerId);
    
                const user = users[userId];
    
                if (!user) {
                    reject({ status: 404, error: `User with id ${userId} not found` });
                    return;
                }
    
                let providerIndex = -1;

                for (let i = 0; i < user.providers.length; i++) {
                    if (user.providers[i] === providerId) {
                        providerIndex = i;
                        break;
                    }
                }
    
                if (providerIndex !== -1) {
                    user.providers.splice(providerIndex, 1);
                    await ProviderDAO.deleteProvider(providerId);
                    resolve({ message: 'Provider deleted successfully' });
                } else {
                    reject({ status: 404, error: `Provider with id ${providerId} not found in user's providers` });
                }
            } catch (error) {
                reject({ status: 500, error: 'Internal server error' });
            }
        })
    }


}
