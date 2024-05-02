Interesting Challenge:
    - An interesting challenge was trying to get all the howls from the logged in user and the users they followed and then displaying all of them. My implementation used a few api calls to get the currentUser, get the howls from a specific user, and getting the following of a given user, so that I could get all the necessary information and send into a helper function. 

Additional Features & Suggestions on Implementation Strategy
    - I still need to fix issues with the features of creating a new howl, since that doesn't work as of right now. I would probably just directly access the howl at the end of the list of all the howls, since we know it should be the newest one and we know the current authenticated user is the one who created it. We just need the posted data to tell us what the date and text in the howl was.  



Citing websites used for coding help:

Learned how to use the push and spread operator to merge arrays 
https://dmitripavlutin.com/javascript-merge-arrays/ 