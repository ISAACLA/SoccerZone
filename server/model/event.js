let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let EventSchema = new Schema ({
  events: {type:String,required:[true,"Name is required!"]},
  zipcode: {type:Number,required: [true,"Zipcode is required"]},
  attendees: [{type:Schema.Types.ObjectId, ref: "User"}],
  location:{type:String,required:[true,"Location is required!"]},
  date: {type:Date,required:[true,"Date is required!"]},
  time: {type:String,required: [true, "Time is required!"]},
  _user: {type:Schema.Types.ObjectId, ref: "User"}
}, {timestamps:true})

mongoose.model("Event", EventSchema)
