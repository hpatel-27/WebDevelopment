const AccountDAO = require('./AccountDAO');
let providers = require('./data/providers.json');

module.exports = {

    getAllProviders: () => {
        return new Promise((resolve, reject) => {
            resolve(providers);
        })
    },
    
    getProviderById: (providerId) => {
        return new Promise((resolve, reject) => {
            
            const provider = providers.find(provider => provider.id === providerId);
            
            if (provider) {
                resolve(provider);
            } else {
                reject({ status: 404, error: `Provider with id ${providerIdToFind} not found` });
            }
        });
    },

    createProvider: (newProvider) => {
        return new Promise((resolve, reject) => {
            try {
                let id = providers.length > 0 ? providers[providers.length - 1].id + 1 : 1
                newProvider.id = id;
                newProvider.accounts = [];

                if( !newProvider.name ) {
                    reject({ status:400, error: "A provider must be given a name"});
                }

                providers.push(newProvider);
                resolve(newProvider);
            } catch(error) {
                reject(error);
            }
        })
    },

    deleteProvider: (providerId) => {
        return new Promise((resolve, reject) => {
            try {
                providerId = parseInt(providerId);
                let providerToRemoveIndex = -1;
    
                providers.forEach((provider, index) => {
                    if (provider.id === providerId) {
                        providerToRemoveIndex = index;
                    }
                });
    
                if (providerToRemoveIndex !== -1) {
                    let providerToRemove = providers[providerToRemoveIndex];
                    providers.splice(providerToRemoveIndex, 1);
                    resolve(providerToRemove);
                } else {
                    reject({ status: 404, error: `Provider with id ${providerId} not found` });
                }
            } catch (error) {
                reject({ status: 500, error: 'Internal server error' });
            }
        });
    },

    changeProviderName: async (providerId, newName) => {
        return new Promise (async(resolve, reject) => {
            providerId = parseInt(providerId);

            if( !newName ) {
                reject({ status: 404, error: `Provider name cannot be empty.` });
            }

            const provider = providers.find(provider => provider.id === providerId);

            provider.name = newName;

            resolve({ message: 'Provider name updated successfully' });
        })
    },

    //Make it so that this and get User Accounts returns the actual array of account objects
    getProviderAccounts: (providerId) => {
        return new Promise((resolve, reject) => {
            try {
                providerId = parseInt(providerId);
                const provider = providers[providerId];
      
                if (!provider) {
                    reject({ status: 404, error: `Provider with id ${providerId} not found` });
                }
      
                const providerAccounts = provider.accounts || [];
                resolve(providerAccounts);
            } catch (error) {
                reject(error);
            }
        });
    },

    addAccount: async (providerId, newAccount) => {
        return new Promise(async (resolve, reject) => {
            const returnedAccount = await AccountDAO.createAccount(newAccount);
            providerId = parseInt(providerId);
            const provider = providers.find(provider => provider.id === providerId);
            provider.accounts.push(returnedAccount.id);
            resolve(provider);
        })
    },

    deleteAccount: async (providerId, accountId) => {
        return new Promise(async (resolve, reject) => {
            try {
                providerId = parseInt(providerId);
                accountId = parseInt(accountId);
    
                const provider = providers.find(provider => provider.id === providerId);
    
                if (!provider) {
                    reject({ status: 404, error: `Provider with id ${providerId} not found` });
                    return;
                }
    
                let accountIndex;
    
                provider.accounts.forEach((account, index) => {
                    if (account === accountId) {
                        accountIndex = index;
                    }
                });
    
                if (accountIndex !== -1) {
                    provider.accounts.splice(accountIndex, 1);
                    await AccountDAO.deleteAccount(accountId);
                    resolve({ message: 'Account deleted successfully' });
                } else {
                    reject({ status: 404, error: `Account with id ${accountId} not found in provider's accounts` });
                }
            } catch (error) {
                reject({ status: 500, error: 'Internal server error' });
            }
        })
    },

}