import api from './APIClient.js';

function storeUser(userId ) {
  sessionStorage.setItem('selectedUserId', userId );
}

function getSelectedUser() {
  return sessionStorage.getItem('selectedUserId');
}

api.getCurrentUser().then(user => {
    let link = document.createElement('a');
    link.href = '#';
    link.innerHTML = "Log Out";
    link.addEventListener("click", e => {
        e.preventDefault();
        api.logOut().then(() => {
        document.location = "/login";
        });
    })

    document.getElementById('user').innerHTML = `@${user.username}`;


    
    const linkableImg = document.createElement('a');
    storeUser(user.id );
    linkableImg.href = `/profile`
    linkableImg.classList.add('card-img-top-link');


    let img = document.createElement('img');
    img.src = user.avatar;
    img.alt = "users avatar";

    linkableImg.appendChild(img);

    document.getElementById('user').appendChild(linkableImg);

    document.getElementById('user').appendChild(document.createElement('br'));
    document.getElementById('user').appendChild(link);
    })
    .catch(error => {
      if(error.status === 401) {
        console.log("We are not logged in");
        document.location = '/login';

      }
      else {
        console.log(`${error.status}`, error);
      }
});

export default {
  storeUser,
  getSelectedUser
};
