let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TeamSchema = new Schema ({
  name: {type:String,required:[true,"Name is required!"]},
  zipcode: {type:Number,required: [true,"Zipcode is required"]},
  players: {type: Number,max: [18,'Sorry, this team is full already.'],default:0},
  squad:[{type:Schema.Types.ObjectId, ref: "User"}],
  posts: [{type:Schema.Types.ObjectId, ref:"Post"}],
  _user: {type:Schema.Types.ObjectId, ref: "User"}
}, {timestamps:true})

mongoose.model("Team", TeamSchema)
