# User Giphy
This project was done as part of a coding challenge.  
The goal was to design and build a web app that allows a user to search Gifs using the [Giphy API](https://developers.giphy.com/) and save them to their profile.

## Capabilities/Features

- [x] Search functionality with a 'g' rating
- [x] Save functionality
- [x] Registration/Login
- [x] Categorize the Gifs
- [x] Stored in a database

## Tech
### Server
For my server I used a [Nodejs](https://nodejs.org/) backend with [expressjs](http://expressjs.com/) for my APIs/routing.  
I also integrated with Google OAuth using [passportjs](http://www.passportjs.org/) for authentication.

####Advantages
Really quick start up for Nodejs and express, you can have a simple API hooked up in less than 15 minutes.  
Nodejs is also able to host the client code as well, so it was easy to structure the whole project together and keep them in the same codebase.  
Lots of open source support and functionality

####Disadvantages
For this project, there was not any real disadvantages I saw to using Nodejs.

### Database
For my database, I used [MongoDB](https://www.mongodb.com/) and connected it using [Mongoosejs](https://mongoosejs.com/).

#### Advantages
Really quick creation and testing.  
Quick read/write/search capabilities  
Plays really well with JSON

#### Disadvantages
Mongoose documentation is not that great, I spent a lot of time trying out different things to make it work

### UI
For the UI, I used [ReactJS](https://reactjs.org/), [Redux](https://redux.js.org/), and [React Router](https://reacttraining.com/react-router/).  
For the styling, I used [materializecss](https://materializecss.com/).

#### Advantages
Create React App was used and it provides out of the box functionality with webpack.  
I am very familiar with both React and Redux so I was able create the application quickly.  
React Router made it very easy to have the different pages and redirect to all of them.  
Very quick rerendering of the application so changes were visible immediately.

#### Disadvantages
No real disadvantages that I experienced.

## Use
### Local
For local development, clone the project  
`git clone git@github.com:castonhilcher/user-giphy.git`  
`cd user-giphy`  
`npm run dev` This starts both the local UI server and the node server by using concurrently.

#### Things to note:  
The keys used for local development are not checked into GitHub as I am using pipeline variables so running this locally will not work unless you generate your own Giphy API key and MongoDB test db.

### Production
The application is deployed out in production and can be found at https://user-giphy.herokuapp.com  
I used heroku because it is free and can connect/listen to GitHub for hooks so it deploys everytime I push to master.  
Currently I only authenticated using Google Oauth so you will need a Google account to save gifs to your profile.

## Hindsight
I plan to discuss more about decisions at a later point but in general I wanted to mention a two things regarding my development for this project.

1. You will notice I don't have any tests. Usually in practice I use TDD to develop. I estimated the requirements and measured it against the time I had and I felt like I would not have had as many of the features if I had practiced TDD.
2. You will notice a had a HUGE commit with basically all my code. The reason for this is I did not yet have my .gitignore setup completely and I was hardcoding my API keys where I needed them. I did not want to check those into GitHub and since I productionized it later in development, that is when I removed them to use them as variables.
