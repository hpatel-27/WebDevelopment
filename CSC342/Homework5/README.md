Passwords for the Users if the Teaching Staff want to login with any of the users:

User with id 1 has password1, user with id 2 has password2, so on and so forth
password1
password2
password3
password4
password5


1. When the token is being verified to check the signature and stuff, afterwards we have to decode the payload which comes back as a string. Something interesting I had to do was use JSON.parse to turn that string into a json object so that we could set it in req.user. I also had a funny issue where I thought my token wasn't authenticating properly but it was just my adblocker preventing something from happening, so I just tried it on Chrome instead and it started working.

2. In terms of security risks, I think if someone was able to get a hold of the API SECRET KEY from the .env file they would be able to get the valid signature and that would allow them to be malicious, but I'm not sure how difficult it would be to access that normally. Also, the passwords I chose for my users aren't the most complex thing (password1, password2, ... ), so I could incorporate special characters, different case of letters, and not use words from the dictionary. I also had my hash use 10000 iterations and sha256, whereas the lecture materials used 100000 iterations and sha512, so i could use more iterations and a hashing method with more bits if I wanted to make it more secure that way. 