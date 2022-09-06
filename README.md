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

## Setting up Database MongoDB:

- 1- Create a project into the organisation in the mongoDB console.
- 2- Create a Database and a Cluster as well in the project.
- 3- Create user and password to access the cluster of mongoDB.
- 4- Creating current ip-address for that particular time just!
- 5- Connect application to cluster by updating config files by putting passwords as well with the username!

### connecting database to the application:

- It will be done by using mongoose, create a file called db.js in the config folder and import mongoose there.
- Here we are calling the function mongoose.connect(config.get("mongoURI"))     --   which if connected logs something on the screen else not.

## Extra Information

- Starting to write the backend of the applications, so we must have the server,routes and apis all the way!

- npm init -- to get package.json in the empty file

- We will install nodemon as we don't need to run the server again and again so we will going to install nodemon here in the developer dependencies not in dependencies by:
- npm install nodemon --save-dev -- installing in developer dependencies nodemon here!

- Development dependencies, or devDependencies are packages that are consumed by requiring them in files or run as binaries, during the development phase. These are packages that are only necessary during development and not necessary for the production build.

- scripts add krrhe hain hm package.json mein.

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

## Building APIs For Social Media Application:

- Created the boiler structure for the Application by making config and adding mongoDB credentials;
- Creating folder for Apis to be routed -- creating routes folder
- We will going to create folder for routes in routes we will create 3 folders for auth,users,posts as well for the apis, thats we will going to create.

- We have created routes as well in the app.use("path","and the file that is coming from a particular place.

- We called the connectDB() function from the main server.js file so that it is connected all the way.
 
