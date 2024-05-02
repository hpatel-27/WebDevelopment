# CSC 342: Group Project - Password Protector

### REASONS FOR MAKING THIS PWA

Everyday, individuals find themselves storing passwords in various note applications, scattered across multiple locations, leading to difficulties in access and organization. Recognizing this challenge, we aim to develop a Progressive Web App (PWA) that encourages users to consolidate and manage their passwords and related information in a centralized application. Our goal is to streamline organization and enhance accessibility, providing users with a secure and user-friendly platform to efficiently store and access their password data.

### USERS & APPLICATION DEMAND

Considering that a lot of people also need to have access to their passwords when logging into websites and authentication services while using their mobile devices, this PWA addresses users’ desire for quick and easy access to passwords even when they are not able to currently access one of their devices. Users would also prefer to use applications that can provide one place from which they can retrieve all of their passwords/data. This PWA will be able to fulfill these desires for them and be accessible to them across the multiple platforms that they may need to access their passwords from. 

### APPLICATION OVERVIEW

The password manager application facilitates the management of user accounts for various websites and applications. On the landing page, users can effortlessly scroll through a list of websites and applications, with the option to add new sites using the "+" button in the top right corner. Selecting a specific site reveals a scrollable list of associated accounts, each featuring fields for username, password, and additional notes. Users can seamlessly modify account details or delete entries. The application allows for the creation of new accounts directly from this page, offering the choice between generating a unique "safe" password for the database or inputting a custom password. A password generation feature encourages the adoption of strong, secure passwords for improved account protection. The application ensures user security through encryption and adheres to best practices for password management. With a user-friendly interface and cross-platform accessibility, this password manager provides a streamlined experience across various devices.

### CAPABILITIES

For the password manager to work, we will need to store data related to the website or application the user account is associated with, the username of that user, and the password for that user. We will also provide an optional field for the user to add notes related to that account to allow for further specification. The user of the application will also need to have their username and password to login to the application, to begin with. This information, as well as the session token for the user when logged in, will all need to be safely stored in a database. Luckily for the current version of the application, we will not need to retrieve any data from other third-party APIs as everything that we are storing will be provided or changed by the user inside of the application. Of course, sensitive data, such as passwords, will need to be hashed before being stored inside the database.

### TAKING ADVANTAGES OF CAPABILITIES

A large advantage of creating the password protector as a PWA is that it will allow us to create accessibility across multiple different devices such as mobile phones and desktops. This enhances the functionality of a password manager by allowing users who may need to log in to the same account across multiple platforms to access the manager from the device they choose. 
Another advantage is that PWAs can utilize modern web security features. For example, the app can be served over HTTPS, ensuring that data exchanged between the user's device and the server is encrypted, adding an extra layer of security to the password manager. This is especially important for creating a password manager as sensitive data must be secured in the PWA.

### TEAM CONTRIBUTIONS

Harsh - Completed the REASONS FOR MAKING THIS PWA and USERS & APPLICATION DEMAND sections of the project proposal. Completed the mobile wireframes for creating a new group, adding accounts to a group, editing and removing an account for a group.

Luke - Completed the APPLICATION OVERVIEW, CAPABILITIES, TAKING ADVANTAGES OF CAPABILITIES sections of the project proposal. Completed all the website application wireframes.

Furkan - Created the sign up and login wireframes for the both the website and mobile applications. Completed the mobile profile page and the mobile changing password page.


### WIREFRAMES

#### Login Pages

![alt text](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupL/blob/main/Proposal/Wireframes/loginpages.png?raw=true)

#### Mobile Pages
![alt text](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupL/blob/main/Proposal/Wireframes/mobilepages.png?raw=true)

#### Web Pages
![alt text](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupL/blob/main/Proposal/Wireframes/webpage.png?raw=true)
