let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PostSchema = new Schema ({
  post: {type:String, required:[true, "Post is required!"]},
  likes: {type: Number, default:0},
  dislikes: {type: Number, default:0},
  comments: [{type:Schema.Types.ObjectId, ref:"Comment"}],
  _event: {type:Schema.Types.ObjectId, ref:"Event"},
  _team: {type:Schema.Types.ObjectId, ref:"Team"},
  _user: {type:Schema.Types.ObjectId, ref:"User"}
}, {timestamps:true})

mongoose.model("Post", PostSchema)
