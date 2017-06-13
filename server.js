let express = require ('express');
let app = express();
let bodyparser = require('body-parser');
const path = require ('path');

let session = require('express-session');
var whateverWeWant = {
 secret:'themostsecuresecretkeyever', // Secret name for decoding secret and such
 resave:false, // Don't resave session if no changes were made
 saveUninitialized: true, // Don't save session if there was nothing initialized
 name:'myCookie', // Sets a custom cookie name
 cookie: {
  secure: false, // This need to be true, but only on HTTPS
  httpOnly:false, // Forces cookies to only be used over http
  maxAge: 3600000
 }
}

app.use(session(whateverWeWant));
app.use(express.static(path.join(__dirname,'client','dist')));

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

require('./server/config/mongoose');
require('./server/config/routes')(app);

app.get('*', function (req, res) {
  res.sendFile(path.resolve('client/dist/index.html'));
})

app.listen(8888,()=>{console.log('server is listening on 8888')})
