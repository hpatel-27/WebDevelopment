let howls = require('./howls.json');

module.exports = {
    getHowls: () => {
        return new Promise(( resolve, reject ) => {
            resolve(Object.values(howls));
        });
    },

    getHowlsByUserId: (userId) => {
        return new Promise ((resolve, reject) => {
            // get the list of howls made by a user given their userid
            const howl = getUserHowlArray(userId);
            if ( howl ) {
                resolve(howl);

            }
            else {
                reject();
            }
        })
    },

    newHowl: (howlUser, howlDate, howlText) => {
        return new Promise( ( resolve, reject ) => {
            // get the largest howl id and add 1 
            let id = Object.keys(howls).length + 1;
            // create the new howl object
            const howl = {
                id: id,
                userId: howlUser,
                datetime: howlDate,
                text: howlText
            };
            howls[id] = howl;
            resolve( howl );
        })
    }
};

// helper function to get all the howls from a user
function getUserHowlArray(userId) {
    let allHowls = Object.values(howls);
    let userHowls = [];
    allHowls.forEach(howl => {
        // for each howl, check the userid and see if it matches the one we want and add it to the list if so
        if ( howl.userId == userId ) {
            userHowls.push(howl);
        }
    });

    return userHowls;
}