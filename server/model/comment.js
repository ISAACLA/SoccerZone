let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema ({
  comment: {type:String, required:[true, "Comment is required!"]},
  _user: {type:Schema.Types.ObjectId, ref:"User"},
  _post: {type:Schema.Types.ObjectId, ref:"Post"},
}, {timestamps:true})

mongoose.model("Comment", CommentSchema)
