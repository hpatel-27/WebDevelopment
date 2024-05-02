import api from './APIClient.js';

api.getCurrentUser().then(user => {
  let link = document.getElementById('sign-out');
  link.addEventListener("click", e => {
    e.preventDefault();
    api.logOut().then(() => {
      document.location = "./login";
    });
  })


  console.log( "username: ", user.username );
  console.log( "\n\n\n\n");
  document.getElementById('user-field').value = user.username;
  document.getElementById('email-field').value = user.email;

})
.catch(error => {
  if(error.status === 401) {
    console.log("We are not logged in");
    document.location = './login';
  }
  else {
    console.log(`${error.status}`, error);
  }
});