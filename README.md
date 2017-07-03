Web Development API Task
------------------------

A simple API to update to manage user details
  
* id - A unique user id
* email - A users email address
* forename - A users first name
* surname - A users last name
* created - The date and time the user was added

Build tasks
-----------

npm test - to run the tests
npm start - to run the web server on port 8055
  
Postman
-------

To use the Restful API through POSTMAN first start the webserver (see Build Tasks).
Import into postman the following files:
* user-details.postman_environment.json
* user-details-api.postman_collection.json


| POSTMAN NAME | METHOD | Url          | Action |
|--------------|--------|--------------|--------|
| ALL_USERS    | GET    | /user        | retrieve all user details |
| GET_USER     | GET    | /user/{{id}} | get a specific user details |
| CREATE_USER  | POST   | /user/{{id}} | create a user (email, forename, surname) |
| UPDATE_USER  | PUT    | /user/{{id}} | update a user (email, forename, surname) |
| DELETE_USER  | DELETE | /user{{id}}  | delete a user |


Improvements
------------

* hide the metafields (lokijs)
* put allows new fields to be added
* validate email field
* exception handling could be improved 
** use of specific error types not just error (not good)
** catching everything and treating them all the same (not good)
* incorporate eslint into build

