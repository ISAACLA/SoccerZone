let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let EventSchema = new Schema ({
  events: {type:String,required:[true,"Name is required!"]},
  attendees: [{type:Schema.Types.ObjectId, ref: "User"}],
  location:{type:String,required:[true,"Location is required!"]},
  location2:{type:String},
  city:{type:String},
  state:{
    type:String,
    length: [2,"State should have only two letters"]
  },
  zipcode: {
    type:Number,
    required: [true,"Zipcode is required"],
    length: [5, "Zipcode should have only 5 numbers"]
  },
  date: {type:Date,required:[true,"Date is required!"]},
  time: {type:String,required: [true, "Time is required!"]},
  posts: [{type:Schema.Types.ObjectId, ref:"Post"}],
  _user: {type:Schema.Types.ObjectId, ref: "User"}
}, {timestamps:true})

mongoose.model("Event", EventSchema)
