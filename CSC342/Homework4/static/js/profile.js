import api from './APIClient.js';
import common from './common.js';

const userContainer = document.querySelector('#user-container');
const userHeader = document.querySelector('#user-header');
const userHeaderImg = document.querySelector('#user-header-img');
const userName = document.querySelector('#user-name');
const userID = document.querySelector('#user-id');
const followButton = document.querySelector('#follow-button');

const userHowls = document.querySelector('#user-howls');
const following = document.querySelector('#follow-list');

let outputHowls = [];
let followingList = [];
let authFollowing = [];
// Get the list of people that the user is following
// and amass the howls from all of them and present them

let userId = common.getSelectedUser();
let authId;

await api.getCurrentUser().then( user => {
    authId = user.id;
});

await api.getFollowingById( userId ).then(follows => {
    followingList = follows.following;
    // console.log("following " , followList);

});

await api.getFollowingById( authId ).then(follows => {
    authFollowing = follows.following;
    // console.log("following " , followList);

});

if ( userId == authId ) {
    followButton.style.display = 'none';
}

for ( let j = 0; j < authFollowing.length; j++ ) {
    if ( authFollowing[j] == userId ) {
        followButton.innerHTML = 'Following';

    }
}

followButton.addEventListener( 'click' , (e) => {

    if ( followButton.innerHTML === 'Follow' ) {
        followButton.innerHTML = 'Following';

    }
    else {
        followButton.innerHTML = 'Follow';

    }

});
api.getUserById(userId).then(user => {
    userHeaderImg.src = user.avatar;
    userHeaderImg.alt = "user avatar";
    userName.textContent = `${user.first_name} ${user.last_name}`;
    userID.textContent = `@${user.username}`;



});

api.getHowlsByUserId(userId).then( howls => {

    // i followed this person's explanation on how to merge two arrays using the push operator
    // https://dmitripavlutin.com/javascript-merge-arrays/
    outputHowls.push(...howls);

});

// slow execution so that the length and values of the outputHowls array can keep up
setTimeout( displayHowls, 1000);

async function displayHowls() {

    // HERE LIES ALL THE HOWLS FOR THE USER AND THEIR EVIL FOLLOWERS ;)

    for ( let i = 0 ; i < outputHowls.length; i++ ) {

        const currentHowl = outputHowls[i];
        const userId = currentHowl.userId;
        const date = currentHowl.datetime;
        const text = currentHowl.text;

        let tempUser;
        await api.getUserById(userId).then( found => {
            tempUser = found;
        });


        let card = document.createElement( 'div' );
        card.className = 'card';
        card.classList.add('card-body');

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        cardBody.classList.add('card-body');
        
        const howlInfo = document.createElement('div');
        howlInfo.className = 'howl-info';
        howlInfo.classList.add('howl-info');

        const linkableImg = document.createElement('a');
        linkableImg.href = `/profile`
        linkableImg.classList.add('card-img-top-link');

        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.src = tempUser.avatar;
        img.classList.add('card-img-top');
        img.alt = 'user avatar';
        
        const user_name = document.createElement('p');
        user_name.className = 'card-text';
        user_name.classList.add('card-text');
        user_name.textContent = `${tempUser.first_name} ${tempUser.last_name} @${tempUser.username}`;
        
        const dateElement = document.createElement('p');
        dateElement.className = 'howl-date';
        dateElement.classList.add('howl-date');

        const dateObj = new Date( date );
        const dateString = dateObj.toLocaleDateString( 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

        dateElement.textContent = dateString;
        
        const mainText = document.createElement('p');
        mainText.className = 'card-text';
        mainText.classList.add('card-text');
        mainText.textContent = text;
        
        linkableImg.appendChild(img);
        howlInfo.appendChild(linkableImg);
        howlInfo.appendChild(user_name);
        howlInfo.appendChild(dateElement);
        
        cardBody.appendChild(howlInfo);
        cardBody.appendChild(document.createElement('br'));
        cardBody.appendChild(mainText);
        
        card.appendChild(cardBody);
        
        userHowls.appendChild(card);
    }
}

async function displayFollowing() {

    // for each userid that is in the list, get all their howls and put them into a list of howls that we will output
    for ( let i = 0; i < followingList.length; i++ ) {

        let currUserId = followingList[i];
        let tempUser;
        await api.getUserById(currUserId).then( found => {
            tempUser = found;
        });

        const li = document.createElement('li');
        
        // i dont think i need the a tag anymore since im using the session storage for the profile stuff
        // but its too late to go back and i don't want to mess up the styling :(
        const a = document.createElement('a');
        a.className = 'dropdown-item';
        
        const img = document.createElement('img');
        img.src = tempUser.avatar;
        img.className = 'card-img-top';
        img.alt = "user's avatar"; 
        
        a.appendChild(img);
        
        const text = document.createTextNode(` ${tempUser.first_name} ${tempUser.last_name} @${tempUser.username}`);
        a.appendChild(text);
        
        li.appendChild(a);
        
        li.addEventListener( 'click', (e) => {

            common.storeUser(currUserId);
            document.location = "/profile";
        });

        following.appendChild(li);
    }
}

displayFollowing();