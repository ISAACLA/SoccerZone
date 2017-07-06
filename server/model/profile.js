let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProfileSchema = new Schema ({
  address: {type:String},
  city: {type:String},
  state: {type:String},
  age: {type:Number},
  gender: {type: String},
  favplayer:{type:String},
  favteam:{type:String},
  position1:{type:String},
  position2:{type:String},
  position3:{type:String},
  _user: {type:Schema.Types.ObjectId, ref: "User"}
}, {timestamps:true})

mongoose.model("Profile", ProfileSchema)
