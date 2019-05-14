#User Management
### Requirements

- Node v 10
- Mongodb 
- NPM
- PM2
- Express
- MongoBooster Nosql GUI
- Postman (Api testing tool)
- VS Code

### Development Enviroment
- Linux (deb) 16.0.4


**Setup the code**
1- Git clone the repo in your local machine by executing this command (git clone <url>)

2 - Install node_module by this command (npm i)

3 - Change the NODE_ENV in .env file to development or staging

4 - Use command npm test for executing the test cases.

5 - Import the data from the link shared to database use mongoBooster for importing data.

6 - Once data is  successfully imported. Go back to terminal and run this command in root directory (pm2 start server.js --name "usermanagement_backend"). server will start.

Find the postman collection link: https://www.getpostman.com/collections/23554ef21a433037fc69