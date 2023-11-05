# Posts

This is a simple full stack mern app I have decided to name "Posts". Posts is a simple app with authentication that allows users to login and make posts to the database, which are displayed in a feed for everyone to see. Users can comment on other's posts, and users can edit or delete their posts. Admins are able to edit/ delete everybodies posts.

## How to Use the app

Download the zip file from the Github repository, extract the contents into a folder on your machine. 
Once extracted, navigate to the directory for the frontend and the backend, in each type npm install to install dependencies
After that, type npm start in each terminal, and the application will open on localhost port 3000.
You can modify the connection string for the database in the backend's app.js file
To use the application, make an account. Then login with your account. You will be able to make a post as your signed in account name. Once the post has been made you will see it in the feed. You can delete or edit your post by clicking the buttons rendered on the post. If you want to log in with an admin user, then use the username "John Doe" and password "secret", this will allow you to delete or edit anyone's posts

## JWT authentication
I am making use of JSON Web Tokens for user authentication, where a token is given to a user upon login. The token is decoded via middleware functions for access control, and validated in API requests. Cors middleware has also been implemented to make sure that only specified origins can access the server


 ##Deploying

 I am deploying my react front-end as a static site to Render.com, and my Express Backend as a web service to render.com. I am able to connect the two via environment variables. 
## System Architecture

## Web Stack

I will be using the MERN stack for my application.
The front-end will be handled by the React JavaScript framework. The React framework provides a robust development environment that makes it easy to create a responsive, interactive user interface. 
React offers a component - based approach which is fantastic for making UI elements. React router is also going to be used for managing navigation and routes within the application. 
I will be using Create-React-App to get a skeleton of the front-end setup easily. 
Node.js is a JavaScript runtime environment that enables server-side scripting. It is the N in the MERN Stack For the back-end of the application I will be using the Express Node.js framework. Express is a minimalist and flexible framework that simplifies the process of creating an API. Express makes it easy to implement middleware for various functionalities, such as authentication, logging, error handling, and more. Creating endpoint routes in an express server is relatively straightforward. 
MongoDB, the M in the MERN stack will be used as a database for the application. MongoDB is a NoSQL database, and documents are stored as BSON data, which is essentially just JSON data, which provides an easy way of accessing data in the response of a request to a database. Mongoose will also be used. Mongoose is an object data modeling library for MongoDB and Node.js. Mongoose provides a relatively straightforward schema-based approach to model data and interact with a MongoDB database. For styling the application I will be using the Material UI component library. Material UI provides a vast selection of ready made components that are all styled according to Google’s Material Design principles. This will allow me to make the user interface aesthetically-pleasing. Material UI has a pre made theme which can be customized very easily. Material UI components can be made responsive for different screen sizes very easily, using a similar flex and grid system to bootstrap. Material UI is designed for React, which makes it integrate seamlessly with React’s component-based architecture. I will be deploying my app to Render.com. Render is a cloud platform that provides a nice, user-friendly experience with a focus on automation. Render is great because I can deploy my backend as a web service from one git repository, and I can deploy the front-end as a static site and I can still link the two by configuring the environment variables of the frontend to correlate to the final url of the backend server. Render also is great because when you push an  to the github repository, render can automatically redeploy your app. Render also offers a free tier
## System Requirements

New users will sign up by providing necessary details. Upon successful registration, they can log into their account, allowing them to view the feed, make, edit, and delete their own posts
User’s can view other’s posts, like them and comment on them. 
Admins have special privileges allowing them to edit, or delete anyone’s post
Who would use the application 
People interested in sharing their thoughts online, and viewing other peoples thoughts while being able to engage with them. 

## User Benefits
Users could benefit from the application by connecting with other people using the application. The application would allow them to engage in discussion with others. 

Content creators could potentially use it as a platform to showcase their content

Admins will benefit from the ability to edit/ delete everyone’s post, as it allows them to moderate the content on the platform.

## User Stories

As a user, I want to see other’s posts, so that I can know what other people are thinking about

As a user, I want to be able to comment on other’s posts, so that I can leave my thoughts about theirs, and potentially create a discussion

As a user, I want to be able to make a post onto the website, so I can let others know my thoughts about something

As a user, I want to be able to edit a post I make, for whatever reason. 

As a user, I want to be able to delete a post I make, in the case I don’t want that post displayed on the feed anymore

As an admin, I want to be able to edit all user’s posts, in the case they are inappropriate for whatever reason

As an admin, I want to be able to  delete all user’s posts, in the case they are inappropriate for whatever reason. 


Similar software

Twitter (X) is what I am basing my application off of.  My software will be a simpler version of twitter with less features initially, but I plan on updating the app over time to eventually have all the same features as apps like Twitter or Threads, such as hashtags, the ability to follow others, etc.  Initially the UI will be very clean and easy to use, which will avoid overwhelming users. 
## Functional Requirements

## Adding a user to a database 
The system will require a database to remember a user and their information when they sign up. This requires the program to make use of React’s useState hook in the front end for remembering user input. In order to communicate with a mongo database, an express back-end server will need to be set up and configured to act as the proxy server for the React app. When a user signs up after entering in their details, the frontend will need to make an http post request using the fetch api to the backend server. The server will receive the request in a configured route, and will add the user to the database. The user’s profile on the database will be made using Mongoose’s object modeling for node.js. Using mongoose a schema for a user can be designed, and using mongoose’s built in methods, we can add the user as a mongodb document to the connected database

If a user is an admin, they should have admin privileges. Upon signing up, a JWT token will be generated with the username and password of the user, and an isAdmin property which will be set to false by default to all users, will also be apart of the request payload when generating the jwt. 
The user’s credentials aswell as their admin status will be sent to the frontend of the application after making a post request to the backend when they sign in. The front end will be able to use this information to conditionally render edit/delete buttons on either all posts if they are an admin, or only on the logged in user’s posts if they are a normal user. The database will save the posts in a ‘posts’ collection in the database. The users ID will be attached to the post as a key value so that when the post is rendered on the screen, the user’s id can be passed as an argument to a function call that can decide if the currently logged in user is the user that made the post, in which case the buttons will only render for that post that the person made. 

## Allowing user’s to make posts to the homepage feed

Signed in users will be able to create posts to the homepage of the app. The program will therefore be required to include a ui element that allows the user to create a post. When a user makes a post the frontend of the application will need to make a post request to a route in the back end of the application. This route in the backend of the application will then need to make use of another Mongoose model that will be for posts. The post model will include a content property, and will also take the currently signed in user’s username as an id property. The backend will then make use of the built in save method from mongoose to create a new post document in the connected database belonging to the signed in user

The program needs to display the post documents stored in the db posts collection
The frontend of the application will need to display the posts made by the users that were stored in the database. The component that displays the posts will need to make a get request to the server that will simply fetch all the posts  from the database collection using mongoose

## Allow user’s to edit / delete their own posts on the feed

The frontend of the application will store the currently signed in user in a piece of state which it will receive when a user signs in with the jwt. The piece of state containing their credentials will be used to conditionally check if a post was made by the signed in user or not. The buttons on the posts will have to programmed to have their clicks call either a handleDelete function or a handleDelete function when clicked. The initial fetch from the feed component will also get the _id property of each document in the db. This property will be appended to attributes for the buttons for those particular posts. This way when the buttons are clicked, the _id can be passed as a parameter to these functions 
Which will pass them as query parameters to either to put request to edit, or the delete request to delete the document from the database in the backend
## Non - Functional Requirements
Usability
	
The UI for the application will need to be intuitive and easy to use. 

Reliability
	
Every aspect of the system needs to have proper error handling implemented where necessary. This includes incorrect password attempts, invalid username request, try catch blocks for api requests, and error handling for falsy mongoose return querys in the backend will need to be handled incase one of those methods fails 

Performance

The system should have optimized response times for requests, ensuring that crud requests do not take too long

Security

When logging in, a user will receive a jwt token based on their name and their admin status. Middleware functions will be implemented in the backend when requests are made to edit, add, or delete posts. These functions will check the jwt token and ensure the user is doing what they are allowed to be doing