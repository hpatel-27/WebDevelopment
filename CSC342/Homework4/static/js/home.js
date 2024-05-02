import api from './APIClient.js';
import common from './common.js';

const cardContainer = document.querySelector('#howl-container');
// Get the list of people that the user is following
// and amass the howls from all of them and present them
let outputHowls = [];
let authenticatedUser;
function display() {
    api.getCurrentUser().then(user => {
        let userId = user.id;
        authenticatedUser = user.id;
        
        api.getHowlsByUserId(userId).then( howls => {
    
            // i followed this person's explanation on how to merge two arrays using the push operator
            // https://dmitripavlutin.com/javascript-merge-arrays/
            outputHowls.push(...howls);
    
        });
    
    
    
    
        api.getFollowingById( userId ).then(follows => {
            let followList = follows.following;
            // console.log("following " , followList);
    
            // for each userid that is in the list, get all their howls and put them into a list of howls that we will output
            followList.forEach(element => {
                
                api.getHowlsByUserId(element).then( howls => {
    
                  // i followed this person's explanation on how to merge two arrays using the push operator
                  // https://dmitripavlutin.com/javascript-merge-arrays/
                  outputHowls.push(...howls);
                });
    
            });
        });
    
        // slow execution so that the length and values of the outputHowls array can keep up
        setTimeout( displayHowls, 1000)
    
    
    });
}

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
        
        howlInfo.appendChild(img);
        howlInfo.appendChild(user_name);
        howlInfo.appendChild(dateElement);
        
        cardBody.appendChild(howlInfo);
        cardBody.appendChild(document.createElement('br'));
        cardBody.appendChild(mainText);
        
        card.appendChild(cardBody);
        cardContainer.appendChild(card);

        card.addEventListener( 'click', (e) => {

            common.storeUser(userId);
            document.location = "/profile";
        });


    }
}

display();

// function clickImg( event) {
//     document.addEventListener( 'DOMContentLoaded', (e) => {
//         // trying to submit the form data when a user's avatar is selected
    
//         // Check if the clicked element is a linkableImg
//         if (event.target && event.target.getAttribute('user-id')) {
//             const userId = event.target.getAttribute('user-id');
            
//             window.location.href = `/profile/${userId}`;
//         }
//     })
// }

window.addEventListener('DOMContentLoaded', (e) => {
    const form = document.getElementById('howlerform');
    const area = document.getElementById('send-howl');

    form.addEventListener( 'submit', function( event ) {
        event.preventDefault();
        const currentDate = new Date();
        const howlText = area.value;

        console.log( howlText );

        area.value = '';

        makeHowl( event, currentDate, howlText );
    });


});


async function makeHowl( event, currentDate, howlText) {
    console.log ( " The event that got passed ", event );
    console.log ( " The date that got passed ", currentDate );

    console.log ( " The text that got passed ", howlText );


    api.newHowl( authenticatedUser, currentDate, howlText ).then(howl => {
        for ( let i = 0 ; i < outputHowls.length; i++ ) {

            const currentHowl = outputHowls[i];
            const userId = currentHowl.userId;
            const date = currentHowl.datetime;
            const text = currentHowl.text;
    
            let tempUser;
            api.getUserById(userId).then( found => {
                tempUser = found;

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
                
                cardContainer.appendChild(card);
            });
        
        }
    });

    // display thte new howl

}