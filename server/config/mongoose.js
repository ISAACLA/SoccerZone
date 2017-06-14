let mongoose = require('mongoose');
let fs = require('fs');
let path = require('path');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/SoccerZone');
let models_path = path.join(__dirname, './../model');

fs.readdirSync(models_path).forEach((file)=>{
  if (file.indexOf('.js')>=0){
    require(models_path+'/'+file);
  }
})
