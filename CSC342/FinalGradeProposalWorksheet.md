# CSC 342 Final Grade Proposal Worksheet
## [Harsh Patel] ([hpatel27])

## Contents

* [Individual Assignments](#individual-assignments)
  * [Homework 1](#-homework-1)
  * [Homework 2](#-homework-2)
  * [Homework 3](#-homework-3)
  * [Homework 4](#-homework-4)
  * [Homework 5](#-homework-5)
* [Team Project](#-team-project)
  * [Individual Contributions](#individual-contributions)
  * [Peer Evaluations](#peer-evaluations)


## Individual Assignments

### [Homework 1](Homework1)

| Submission | Date Submitted | Self-Rating | Summary of Feedback Received | Changes Made Based on Feedback |
|------------|----------------|-------------|------------------------------|---------------------------------|
| Original   | 2024-01-26     | Exceeds nns | Pages looked good, suggested improving the layout in part 2 to fill unused space around the "revenue by location" section | None |


### [Homework 2](Homework2)

| Submission | Date Submitted | Self-Rating | Summary of Feedback Received | Changes Made Based on Feedback |
|------------|----------------|-------------|------------------------------|---------------------------------|
| Original   | 2024-02-09     | Meets Expectations | Code Improvement: Suggested an easier way to add the same event listener to the buttons; Keyboard event handling: It is meant to allow keyboard input without having to click into the output field; Handling Error State: The error state is not being handled correctly (Error should be displayed and not entered in the history) | None |

### [Homework 3](Homework3)

| Submission | Date Submitted | Self-Rating | Summary of Feedback Received | Changes Made Based on Feedback |
|------------|----------------|-------------|------------------------------|---------------------------------|
| Original   | 2024-02-23     | Meets Expectations | UI Appearance: UI looks good, big image overflows the container; Card Expiration Date: change the expiration format to MM/YYYY; Card Number Format: You require the user to manually add hyphens to the number, you could just not require hyphens in the number; Data Validation: CCV and amount should not accept characters, date must also be in a valid date format, notify field is required; Overall did a great job, but these issues need fixing | None |
| Rework 1   | Not submitted  | N/A | N/A | Added a max width and height for the provided pictures, changed the input tag to type month for the expiration date, Removed the need for hyphens in the implementation, updated some paths for the styling since hw4 broke it later on  |

### [Homework 4](Homework4)

| Submission | Date Submitted | Self-Rating | Summary of Feedback Received | Changes Made Based on Feedback |
|------------|----------------|-------------|------------------------------|---------------------------------|
| Original   | 2024-02-22     | Does Not Meet Expectations | Major requirements were met, most api routes and frontend content was finished, code structure on the right track, implementation incomplete regarding authentication and creating howls so couldn't log in | None |


### [Homework 5](Homework3)

| Submission | Date Submitted | Self-Rating | Summary of Feedback Received | Changes Made Based on Feedback |
|------------|----------------|-------------|------------------------------|---------------------------------|
| Original   | 2024-03-29     | Meets Expectations | Part 1: if you are logged in and move to the /login page, you are supposed to be moved to the home page; Page 2: middle doesn't check for token expiration, have the session and token expire in a similar timeframe | None |
| Rework 1   | 2024-04-08      | N/A | All the comments were addressed, marked as done | Checked if the user was logged in while on the login page, changed the session and token to expire at the same time, and check for token expiration |


## [Team Project](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupL)

### Individual Contributions

| Milestone   | My Contributions       | My Effort %   | Self-Rating        | Summary of Feedback Received |
|-------------|------------------------|------------|--------------------|------------------------------|
| Proposal    | On this milestone I did the REASONS and DEMAND sections of the proposal, along with the mobile wireframes for creating a new provider, adding accounts for a provider, and editing and removing an account for a provider. | 33.3%         | Exceeds Expectations | Making a password manager is a good exercise, it was great that everyone participated in the recording, and included both mobile and desktop views. Consider the security issues of password encryption. Calling websites "groups" is strange, "providers" is more appropriate. Offline functionality plans are reasonable, overall the scope of the project is appropriate, just make sure you keep security in mind. |
| Milestone 1 | On this milestone I wrote the html and css (with the media queries) for the login and account creation page, debugged issues with bootstrap import on the frontend pages, fixed errors with file paths and not loading various imports, css, etc. , made a simple skeleton for the landing page                   | 30%         | Meets Expectations | Made significant progress and met the requirements. Unsure if the login/signup pages are complete because they need some work. There is too much blank space between the inputs, and do not look like the wireframes, which was better looking. |
| Milestone 2 | On this milestone I made the .env file, updated the compose file for the database and .env, completed the sql file, completed the model (user, provider, account) classes, completed the DBConnection file, added salts and passwords for 10 users, updated the frontend pages to remove the static data and some unnecessary functionality, updated the profile page to display the username and email from the current user                    | 40%         | Meets Expectations | Lot of UI stuff is still pending, node_modules should not be in source code, fix the folder structure (there was 2 milestone2 folders), make sure you are checking for duplicate usernames, there is a lot to complete for the final milestone |
| Final       | On this milestone I completed all the dynamic content for the home and profile page, debugged the home page to find t he error states (deleting the last provider, trying to delete an account before saving the account, etc. ), updated buttons on home page to be cleaner and match the rest of the design, added buttons for updating and deleting providers, updated signup, login, and landing page styling to look cleaner and usable for mobile, worked together with Luke to debug the serviceWorker and cache all the accounts for all the user's providers so that we could display them offline                    | 47.5%         | Meets Expectations | Good job!, Site and app look good and responsive, offline modification limitations are appropriate considering the sensitivity of the app, there were some get request offline functionality issues in the demo, could consider phone features like FaceId to offer protection when viewing the passwords for accounts |
| Overall     | N/A                    | 150.8% | Meets Expectations | N/A |

### Peer Evaluations

Evaluation Criteria                                                                     | [Luke Thompson] | [Furkan Karablut]
----------------------------------------------------------------------------------------|---------------|--------------
On a scale of 1-5, rate the team member's contribution to the project                   | 5             | 2
On a scale of 1-5, rate the team member's dependability                                 | 5             | 2
On a scale of 1-5, rate the team member's contribution to the team's success            | 5             | 2
On a scale of 1-5, rate the team member's overall performance as a peer on this project | 5             | 2