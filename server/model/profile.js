let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProfileSchema = new Schema ({
  address: {type:String},
  city: {type:String},
  state: {type:String},
  age: {type:Number},
  zipcode: {
    type:Number,
    required: [true,"Zipcode is required"],
    min:[5,"Zipcode should be 5 numbers"],
    max: [5, "Zipcode should be 5 numbers"],
  }
})
