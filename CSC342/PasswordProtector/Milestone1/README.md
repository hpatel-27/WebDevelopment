# Password Protector
## Group [L]: Milestone 1

# Current Progress
| Pages | Status | Wireframe |
| ------ | --------------------- | --------- |
| Landing | 60% | Page to allow the user to choose between logging into their account, given that they have made one before, or creating a new account within our application |
| Login | 60% | [**Login Pages**](Proposal/Wireframes/loginpages.png) |
| Sign Up  | 60% | [**Create New User**](Proposal/Wireframes/loginpages.png) |
| Home | 60% |  [**This link will take you to a folder where you can choose between wireframe views**](Proposal/Wireframes/) |
| Profile  | 60% | [**This link will take you to a folder where you can choose between wireframe views**](Proposal/Wireframes/) |

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


### Team Member Contributions

#### [Luke Thompson]

* Skeleton setup with react
* Frontend routes
* Docker configuration/ compose/ proxy
* API readme (decide on how data will be setup)
* Dummy files (user, provider, account).json
* AccountDAO, ProviderDAO, UserDAO
* APIrouter and server setup
* All api endpoints

#### [Harsh Patel]

* Login Page ( with media queries for various view types )
* Account Creation Page ( with media queries for various view types )
* Debugging issues related to bootstrap imports for the frontend pages
* Fixed issues with file paths and not loading various imports, css, etc. 
* Skeleton for the landing page

#### [Furkan Karabulut]

* Profile page
* Home page

#### Milestone Effort Contribution

Luke Thompson | Harsh Patel | Furkan Karabulut
------------- | ------------- | -------------
40%            | 30%            | 30%
