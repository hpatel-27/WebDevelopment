# Password Protector
## Group L: Milestone 2


### What is done
The login, profile, and landing page is complete. The Signup page also is complete but we need to fix the functionality for posting a user to the database.


### What is not done
We need to implement the dynamic functionality for the homepage so that it can interact with all of the content stored in the database. This involves completing the api client and debugging the endpoints. Offline functionality also needs to be implemented.


### A brief description of your authentication and authorization processes. What techniques are you using? What data is being stored where and how? How are you making sure users only access what they are allowed to?
We are using the same techniques from homework 5. There is a jwt that is verified across all pages and whenever there is a call to a specific endpoint. The data is being stored in the database using the sql file and query commands to each endpoint. Users can only request if they have the token on their browser.

# Current Progress
| Pages | Status | Wireframe |
| ------ | --------------------- | --------- |
| Landing | 100% | Page to allow the user to choose between logging into their account, given that they have made one before, or creating a new account within our application |
| Login | 100% | [**Login Pages**](../Proposal/Wireframes/loginpages.png) |
| Sign Up  | 95% | [**Create New User**](../Proposal/Wireframes/loginpages.png) |
| Home | 70% |  [**This link will take you to a folder where you can choose between wireframe views**](../Proposal/Wireframes/) |
| Profile  | 100% | [**This link will take you to a folder where you can choose between wireframe views**](../Proposal/Wireframes/) |

# API endpoints

Method | Route                 | Description |
------ | --------------------- | --------- |
`GET` | `/users`              | Get the list of all users
`GET` | `/users/:userId`           | Get a user by id
`POST`  | `/users`              | Create a user
`DELETE`  | `/users/:userId`      | Delete a user
`PUT`  | `/users/:userId`      | Change a users password
`GET`  | `/users/:userId/providers`      | Get a list of a users providers
`PUT`  | `/users/:userId/providers`      | Add a provider for the user
`DELETE`  | `/users/:userId/providers/:providerId`      | Delete a provider for the user
`GET`  | `/providers/:providerId`      | Get aprovider by id
`PUT`  | `/providers/:providerId`      | Change the name of a given provider
`PUT`  | `/providers/:providerId/accounts`      | Add an account to a provider
`DELETE`  | `/providers/:providerId/accounts/:accountId`      | Delete an account from a provider
`GET`  | `/accounts`      | Get all accounts
`GET`  | `/accounts/:accountId`      | Get an account by id
`PUT`  | `/accounts/:accountId`      | Update an accounts information

# ER Diagram
![Blank board](https://media.github.ncsu.edu/user/24486/files/b8622585-79c1-4bf9-855f-296475414905)


### Team Member Contributions

#### Harsh Patel

* Made the .env file and updated the compose.yml to use the database and .env file
* Completed the sql file to intialize the data in our tables
* Completed the user, provider, and account model class
* Completed the DBConnection file to make the connection to the database from the api
* Added salts and passwords for 10 users that works for sha256, 10000 iterations, and 32 key length
* Updated the front end pages to delete the static data and removed unnecessary functionality (changing user's password, main menu button, sidebar on the profile page, etc. )
* Updated the profile page to dynamically update the user's username and email

#### Luke Thompson

* Reworked the structure of the project to not use react anymore
* Created the ER diagram for database representation
* Added a frontend server and router
* Debugged docker issues
* Implemented authentication across all pages
* Implemented account creation for sign up
* Made data changes to the sql file
* Rewrote all dao methods to incorporate sql queries to interact with the database

#### Furkan Karablut

* Reworked the frontend pages to look identical to the ones from the project proposal

#### Milestone Effort Contribution

Harsh Patel | Luke Thompson | Furkan Karablut
------------- | ------------- | -------------
40%           | 40%          | 20%
