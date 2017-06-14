let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProfileSchema = new Schema ({
  address: {type:String},
  city: {type:String},
  state: {type:String},
  zipcode: {
    type:Number,
    required; [true,"Zipcode is required"],

  }
})
