let mongoose = require('mongoose');

let User = mongoose.model("User");
let Profile = mongoose.model("Profile");
let Team = mongoose.model("Team");
let Event = mongoose.model("Event");

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

  newprofile: (req, res)=>{
    let newprofile = new Profile (req.body)
    newprofile._user=req.session.user._id
    newprofile.save((err,savedprofile)=>{
      if (err){
        let errors = "";
        for (let i in err.errors){
          errors += err.errors[i].message +","
        }
        return res.status(500).send(errors)
      }else{
        User.findOne({_id:req.session.user._id},(err, theuser)=>{
          if(err){
            console.log(err)
          }else{
            theuser.profiles.push(savedprofile)
            theuser.save((err,saveduser)=>{
              if(err){
                console.log(err)
              }else{
                return res.json(saveduser)
              }
            })
          }
        })
      }
    })
  },

  newteam: (req,res)=>{
    if(!req.session.user){
      return res.status(500).send("No user")
    }else{
      let newteam = new Team (req.body);
      newteam._user=req.session.user._id
      newteam.save((err,savedteam)=>{
        if(err){
          let errors = "";
          for (let i in err.errors){
            errors += err.errors[i].message+","
          }
          return res.status(500).send(errors)
        }
        else{
          return res.json(savedteam)
        }
      })
    }
  },

  newevents: (req,res)=>{
    if(!req.session.user){
      return res.status(500).send("No user")
    }else{
      let newevent = new Event (req.body);
      newevent._user = req.session.user._id;
      newevent.save((err, savedevent)=>{
        if(err){
          let errors=""
          for (let i in err.errors){
            errors += err.errors[i].message+","
          }
          return res.status(500).send(errors)
        }else{
          return res.json(savedevent)
        }
      })
    }
  },

  zipcodeteams: (req,res)=>{
    if(!req.session.user){
      return res.status(500).send("No user")
    }else{
      Team.find({zipcode:req.session.user.zipcode},(err,theteams)=>{
        if(err){
          console.log(err)
        }else{
          return res.json(theteams)
        }
      })
    }
  },

  zipcodeevents: (req,res)=>{
    if(!req.session.user){
      return res.status(500).send("No User")
    }else{
      Event.find({zipcode:req.session.user.zipcode},(err,theevents)=>{
        if(err){
          console.log(err)
        }else{
          return res.json(theevents)
        }
      })
    }
  }

}
