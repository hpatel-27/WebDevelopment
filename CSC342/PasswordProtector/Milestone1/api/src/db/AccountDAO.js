let accounts = require('./data/accounts.json');

module.exports = {

    getAllAccounts: () => {
        return new Promise((resolve, reject) => {
            resolve(accounts);
        })
    },


    getAccountById: (accountId) => {
        return new Promise((resolve, reject) => {
            
            const account = accounts.find(account => account.id === accountId);
            
            if (account) {
                resolve(account);
            } else {
                reject({ status: 404, error: `Account with id ${accountId} not found` });
            }
        });
    },

    createAccount: (newAccount) => {
        return new Promise((resolve, reject) => {
            try {
                let id = accounts.length > 0 ? accounts[accounts.length - 1].id + 1 : 1
                newAccount.id = id;

                if( !newAccount.username || !newAccount.password || !newAccount.notes) {
                    reject({ status:400, error: "Incomplete fields"});
                }

                accounts.push(newAccount);
                resolve(newAccount);
            } catch(error) {
                reject(error);
            }
        })
    },

    deleteAccount: (accountId) => {
        return new Promise((resolve, reject) => {
            try {
                accountId = parseInt(accountId);
                let accountToRemoveIndex = -1;
    
                accounts.forEach((account, index) => {
                    if (account.id === accountId) {
                        accountToRemoveIndex = index;
                    }
                });
    
                if (accountToRemoveIndex !== -1) {
                    let accountToRemove = accounts[accountToRemoveIndex];
                    accounts.splice(accountToRemoveIndex, 1);
                    resolve(accountToRemove);
                } else {
                    reject({ status: 404, error: `Account with id ${accountId} not found` });
                }
            } catch (error) {
                reject({ status: 500, error: 'Internal server error' });
            }
        });
    },

    updateAccount: (accountId, newAccount) => {
        return new Promise((resolve, reject) => {
            try {
                accountId = parseInt(accountId);
                let account = accounts.find(account => account.id === accountId);

                    if (newAccount.username) {
                        account.username = newAccount.username;
                    }
                    if (newAccount.password) {
                        account.password = newAccount.password;
                    }
                    if (newAccount.notes) {
                        account.notes = newAccount.notes;
                    }
                
                resolve(account);
            } catch {
                reject({ status: 500, error: 'Internal server error' });
            }
        })
    }

}