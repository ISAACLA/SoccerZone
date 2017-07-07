let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema ({
  first_name: {
    type:String,
    required:[true, "First Name is required!"],
    minlength: [2, "First Name should be at least 2 characters"],
    maxlength: [25, "First Name have at most 25 characters"]
  },
  last_name: {
    type:String,
    required:[true, "Last Name is required!"],
    minlength: [2, "Last Name should be at least 2 characters"],
    maxlength: [25, "Last Name have at most 25 characters"]
  },
  username: {
    type:String,
    required:[true, "Username is required!"],
    unique: [true, "This username is already taken"],
    minlength: [2, "Username should have at least 2 characters"],
    maxlength: [25,"Username have at most 25 characters"]
  },
  email: {
    type:String,
    required:[true,"Email is required!"],
    unique: [true,"This email has already taken"],
    lowercase:true,
    validate: function(email){
      return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    }
  },
  password: {
    type:String,
    required: [true, "Password is required!"],
    minlength: [8,"Your password must have at least 5 characters"],
  },
  zipcode: {
    type: Number,
    required:[true, "Zipcode is required"],
    length:[5,"Zipcode should have 5 digits exactly"]
  },
  teams: [{type:Schema.Types.ObjectId, ref:"Team"}],
  events: [{type:Schema.Types.ObjectId, ref:"Event"}],
  profiles: [{type:Schema.Types.ObjectId, ref: "Profile"}],
  // password_confirmation:
}, {timestamps:true})

mongoose.model("User", UserSchema)
