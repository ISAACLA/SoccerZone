let mongoose = require('mongoose');

let User = mongoose.model("User");
module.exports = {
  register: (req, res)=>{
    User.findOne({email:req.body.email}, (err, theuser)=>{
      if(theuser == null){
        let newuser = new User (req.body);
        newuser.save((err,saveduser)=>{
          if(err){
            let errors = ""
            for (let i in err.errors){
              errors += err.errors[i].message + ","
            }
            return res.status(500).send(errors)
          }else{
            req.session.user = saveduser;
            return res.json(saveduser)
          }
        })
      }
    })
  },

  login: (req, res)=>{
    User.findOne({username:req.body.username},(err,theuser)=>{
      if(theuser == null){
        return res.status(500).send("No such a username")
      }else{
        req.session.user = theuser
        return res.json(theuser)
      }
    })
  },

  logout: (req,res)=>{
    req.session.destroy();
    res.redirect('/')
  },

  currentuser: (req, res)=>{
    if (req.session.user){
      return res.json(req.session.user)
    }else{
      return res.status(500).send("Where is the user?")
    }
  },

}
