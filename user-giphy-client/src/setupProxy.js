const proxy = require('http-proxy-middleware');

//Proxy for API calls when building with create-react-app
//Docs -> https://github.com/facebook/create-react-app/issues/5103
module.exports = function(app) {
  //When react app needs the express app, it takes the request and forwards it to
  //the next target(our server URI and port)
  //Only used during dev; in production, there is no create-react-app server
  app.use(proxy('/auth/google', {target: 'http://localhost:3000/'}));
  app.use(proxy('/api/*', {target: 'http://localhost:3000/'}));
  app.use(proxy('/api/*/*', {target: 'http://localhost:3000/'}));
  app.use(proxy('/api/*/*/*', {target: 'http://localhost:3000/'}));
  app.use(proxy('/api/*/*/*/*', {target: 'http://localhost:3000/'}));
};
