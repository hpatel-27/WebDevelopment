import api from './APIClient.js';

const loginButton = document.querySelector('#loginButton');
const username = document.querySelector('#username');
const password = document.querySelector('#password');

const errorBox = document.querySelector('#errorbox');


loginButton.addEventListener('click', e => {

  errorBox.classList.add("hidden");

  api.logIn(username.value, password.value).then(userData => {
    document.location = "./";
  }).catch((err) => {
    errorBox.classList.remove("hidden");
    if(err.status === 401) {
      errorBox.innerHTML = "Invalid username or password";
    }
    else {
      errorBox.innerHTML = err;
    }
  });
});


api.getCurrentUser().then(user => {
  document.location = './';

})
.catch(error => {
  if(error.status === 401) {
    console.log("We are not logged in");
  }
  else {
    console.log(`${error.status}`, error);
  }
});
