# REST API

This is a test api to show CRUD functionality for users. Can be uased via Postman

## Before using

- Please make sure that you have:
 - Node.js installed (https://nodejs.org/)
 - MongoDB installed and running locally (https://www.mongodb.com/)
   - Using Windows, just open the terminal at where you installed mongo and run `mongod.exe`
 - Run `npm install` or `yarn` in your root project folder

## Usage

To run the project, please use a command line the following:
 - `npm start`
    - It will run the server at port 3600.
    
 - Endpoints
    -   POST  
    
            http://localhost:3600/users/
        
            example post: 
            {
               "firstName" : "John",
               "familyName" : "Doe"
            }
     
     After a POST request the ID of new user is returned.
    -   GET
     
            http://localhost:3600/users/
         
        Retrieves list of users added.
        
    -   PATCH
    
            http://localhost:3600/users/:ID
        
        Update the individual record by ID
        
    -   DELETE
      
            http://localhost:3600/users/:ID
        
        Delete the individual record by ID
        
    
        
