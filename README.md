# IZ Social Media Using MERN Stack 🏂

- This is the backend of the social media application and it is build using :
  - MongoDb
  - Expressjs
  - Reactjs
  - Nodejs

## Installing packages to write the backend code for this project!

- npm i express -- To create the server, we need express
- npm i config -- It is used to config files for us in development and in production as well
- npm i express-validator -- To Validate data on the server side we use express validator
- npm i mongoose -- It is used to connect the database, by using mongoose database is added
- npm i jsonwebtoken -- jwt for creating sessions on clientside by saving header(tokenn-jwt) in local storage.
- npm i bcrypt -- package for hashing password && authenticating password

## Setting up Database MongoDB:

- 1- Create a project into the organisation in the mongoDB console.
- 2- Create a Database and a Cluster as well in the project.
- 3- Create user and password to access the cluster of mongoDB.
- 4- Creating current ip-address for that particular time just!
- 5- Connect application to cluster by updating config files by putting passwords as well with the username!
- 6- Creating models for users && posts to be added in the database.

### connecting database to the application:

- It will be done by using mongoose, create a file called db.js in the config folder and import mongoose there.
- Here we are calling the function mongoose.connect(config.get("mongoURI")) -- which if connected logs something on the screen else not.

## Extra Information

- Starting to write the backend of the applications, so we must have the server,routes and apis all the way!

- npm init -- to get package.json in the empty file

- We will install nodemon as we don't need to run the server again and again so we will going to install nodemon here in the developer dependencies not in dependencies by:
- npm install nodemon --save-dev -- installing in developer dependencies nodemon here!

- Development dependencies, or devDependencies are packages that are consumed by requiring them in files or run as binaries, during the development phase. These are packages that are only necessary during development and not necessary for the production build.

- scripts add krrhe hain hm package.json mein deploy ki start ki khudse.

- Hm require ke through import kio krrhe hain dosri import ki trhn kio nhi import krrhe hain, is liye kionke import wali hai advanced javascript aur hm node application pe kaam krrhe hain to hm require ki through kaam kreinge.

- Hm backend pe kaam krte we sb kaam kreinge baby steps mein mtlb , app define kreinge, Port define kreinge hmari application khn chalni chahiye hai hmare pass.

- app.listen: The app. listen() function is used to bind and listen the connections on the specified host and port. This method is identical to Node's http

- app.use: Express apps have a use() function. This function adds a new middleware to the app. For example, suppose you want to print the HTTP method (get, post, etc.) and the URL of every request.

- app.use(express.json({ extended: false })); -- by usng this we will going to have the response in json format

- process.env.PORT || 5000 -- locally 5000 else whenever we deploy it to heroku or netlify the port will be the one provided to us by the provider thats why we are using process.env.PORT.

- Config works in such a manner it creates the configuration files that are basically credentials for production and for the development phase as well.

- It is json file where we will add our data.
- Node-config allows you to create configuration files in your Node application for different deployment environments. With it, you can define a default configuration file that you intend to repeat across environments, then extend the default config to other environments, such as development, staging, etc.

- To export in the node application we will going to use the module.exports = connectDB ;

- Exit code 1 is for when unhandled fatal exceptions occur that was not handled by the domain. process for catching error.

- JSON Web Token is an open standard for securely transferring data within parties using a JSON object. JWT is used for stateless authentication mechanisms for users and providers, this means maintaining session is on the client-side instead of storing sessions on the server.

- Bcrypt is a popular and trusted method for salt and hashing passwords. You have learned how to use bcrypt's NodeJS library to salt and hash a password before storing it in a database. You have also learned how to use the bcrypt compare function to compare a password to a hash, which is necessary for authentication.

- In Auth,User,Post Api we will going to call the express.Router().

## Express-Validator

- const { check, validationResult } = require("express-validator"); // to validate the data that is coming as the input

- check =
- validationResult =

## Building APIs For Social Media Application:

- Created the boiler structure for the Application by making config and adding mongoDB credentials;
- Creating folder for Apis to be routed -- creating routes folder
- We will going to create folder for routes in routes we will create 3 files for auth,users,posts as well for the apis.

- We have created routes as well in the app.use("path",require"../..") -- and the file that is coming from a particular place.

- We called the connectDB() function from the main server.js file so that it is connected all the way.

- We will be using the express.Router() inside of the routes folder all the way, and we will be using it inside every file routed from main source file server.js.

- const express = require('express');
  const router = express.Router();

  router.get("/",(req,res)=>{
  res.status(200).json({
  msg: "User API"
  })
  })

  module.exports = router;

- Above code will be the boiler plate for any routes api from server.js
- to get the id of the particular user while creating the schema ----- type: mongoose.Schema.Types.ObjectId

- Database mein add krne ke liye model lazmi hai jo hmne model folder mein files mein bnae hain wo hm use kreinge api folders mein, for example hm users signup api mein User model ko use kreinge aur save kreinge data database mein.

- Database ke anadar hm default date add krdeinge Date.now se to user signup krte we hm frontend se khali name,email aur password send kreinge.

- Api ke andar middlewear use krne ke liye hm [] array ke braces ke andar hm checks lagaeinge aur middlewear pass kreinge.
- Express middleware are functions that execute during the lifecycle of a request to the Express server. Each middleware has access to the HTTP request and response for each route (or path) it's attached to. In fact, Express itself is compromised wholly of middleware functions.

- check is in the express-validator wahan se hmne isko destructure krke import kra hai is mein field btate hain aur message btate hain hm ke kia message return krna hai hmein and we write it like :

- Is mein hm validations bhi lgaskte hain .not(), .isEmpty(), .isLength({min: number}), isEmail() ko use krte we hi middleware-[] ke andar.
- check("name", "Please Enter a Name").not().isEmpty().isLength({ min: 3 }),

- Abhi tak hmne khali check lagae we hain, koi error aega to hm usko check kreinge validationResult ke through -- jo hmne destructure kra wa hai express-validator se. check("name", "Please Enter a Name").not().isEmpty().isLength({ min: 3 }),

- const error = validationResult(req);
  if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

- StatusCode : - success - 200 - failure/error/bad-request - 400 - server Error - 500

- Creating a user by using the Model User that is created from the Schema of the database.
- Saving user inside database ---- user.save();

- jwt uses payload to make the token - user ki id pe payload create krrhe hain aur id uski user ki database se arhi hai.

- const payload = {
  user: {
  id: user.id,
  },
  };

- jwt.sign(
  payload,
  config.get("jwtSecret"),
  {
  expiresIn: 360000,
  },
  // Creating the callback function right after it.
  (err, token) => {
  if (err) throw err;
  res.status(200).json({ token });
  }
  );

- Testing APIs on POSTMAN or RAPID-API extention in vscode!

- Created a validation that user already exists or not!
- const checkUser = await User.findOne({ email }).select({ password: 0 });
  if (checkUser) return res.status(400).json({ msg: "User Alraedy exists" });

- 1- users signup api (post) - sending data from frontend user,email,password,date and saving that data inside the database.
