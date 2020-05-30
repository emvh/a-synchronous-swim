const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
// const messageQueue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'GET' && req.url === '/') {

    // generate random function
    // function generateRandom(){
    //   var direction = ['left', 'right', 'up', 'down'];
    //   var randomIndex = Math.floor(Math.random() * direction.length);
    //   return direction[randomIndex];
    // }
    // console.log('test get');
    res.writeHead(200, headers);
    var command = messageQueue.dequeue();
    if(command) {
      res.end(command);
    } else {
      res.end();
    }
    // res.end(generateRandom());
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    next(); // invoke next() at the end of a request to help with testing!
  }
};
