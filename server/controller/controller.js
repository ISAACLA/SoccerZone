let mongoose = require('mongoose');

let User = mongoose.model("User");
let Profile = mongoose.model("Profile");
let Team = mongoose.model("Team");
let Event = mongoose.model("Event");
let Post = mongoose.model("Post");
let Comment = mongoose.model("Comment");

module.exports = {
  register: (req, res)=>{
    User.findOne({email:req.body.email}, (err, theuser)=>{
      if(theuser === null){
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
    User.findOne({username:req.body.username},(err, user)=>{
      if(user === null){
        return res.status(500).send("Username does not exist.")
      }else{
        req.session.user = user
        return res.json(user)
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
      return res.status(500).send("You haven't logged in yet.")
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
      return res.status(500).send("You haven't logged in yet.")
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
      return res.status(500).send("You haven't logged in yet.")
    }else{
      Team.find({zipcode:req.session.user.zipcode}).populate('_user').exec((err,theteams)=>{
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
      return res.status(500).send("You haven't logged in yet.")
    }else{
      Event.find({zipcode:req.session.user.zipcode}).populate('_user').exec((err,theevents)=>{
        if(err){
          console.log(err)
        }else{
          return res.json(theevents)
        }
      })
    }
  },

  jointeam: (req,res)=>{
    if(!req.session.user){
      return res.status(500).send("You haven't logged in yet.")
    }else{
      Team.findOne({_id:req.params.id},(err,theteam)=>{
        if(err){
          console.log(err)
        }else{
          theteam.players += 1;
          theteam.squad.push(req.session.user)
          theteam.save( (err,savedteam)=>{
            if(err){
              console.log(err)
            }else{
              //
              User.findOne({_id:req.session.user._id},(err,theuser)=>{
                if(err){
                  console.log(err)
                }else{
                  theuser.teams.push(savedteam)
                  theuser.save((err,saveduser)=>{
                    if(err){
                      console.log(err)
                    }else{
                      return res.json(savedteam)
                    }
                  })
                }
              })
              //
              // return res.json(savedteam)
            }
          })
        }
      })
    }
  },

  joinevent: (req, res)=>{
    if(!req.session.user){
      return res.status(500).send("You haven't logged in yet.")
    }else{
      Event.findOne({_id:req.params.id},(err, theEvent)=>{
        if(err){
          console.log("first",err)
        }else{
          for(var i = 0; i<theEvent.attendees.length; i++){
            console.log(theEvent)
            if(theEvent.attendees[i] === req.session.user){
                return res.status(500).send("User Already Attending")
            }
          }
          theEvent.attendees.push(req.session.user);
          theEvent.save( (err,savedevent)=>{
            if(err){
              console.log("second",err)
            }else{
              //
              User.findOne({_id:req.session.user._id},(err,theuser)=>{
                if(err){
                  console.log("third",err)
                }else{
                  theuser.events.push(savedevent)
                  theuser.save((err,saveduser)=>{
                    if(err){
                      console.log("forth",err)
                    }else{
                      return res.json(savedevent)
                    }
                  })
                }
              })
              // return res.json(savedevent)
            }
          })
        }
      })
    }
  },

  theteam: (req,res)=>{
    Team.findOne({_id:req.params.id})
    .populate('_user')
    .populate({path:'squad',populate:{path:'user'}})
    .populate({path:'posts', populate:{path:'_user'}})
    .populate({path:'posts', populate:{path:'_user'}, populate:{path:'comments',populate:{path:'_user'}}})
    .exec( (err,theteam)=>{
      if(err){
        console.log(err)
      }else{
        return res.json(theteam)
      }
    })
  },

  theevent: (req,res)=>{
     Event.findOne({_id:req.params.id})
     .populate('_user')
     .populate({path:'attendees', populete:{path:'user'}})
     .populate({path:'posts', populate:{path:'_user'}})
     .populate({path:'posts', populate:{path:'_user'}, populate:{path:'comments',populate:{path:'_user'}}})
     .exec((err,theevent)=>{
       if(err){
         console.log(err)
       }else{
         return res.json(theevent)
       }
     })
   },

  allteams: (req,res)=>{
    Team.find({}).populate('_user').sort({zipcode:1}).exec((err,teams)=>{
      if(err){
        console.log(err)
      }else{
        return res.json(teams)
      }
    })
  },

  allevents: (req,res)=>{
    Event.find({}).populate('_user').sort({zipcode:1}).exec((err,events)=>{
      if(err){
        console.log(err)
      }else{
        return res.json(events)
      }
    })
  },

  newpost: (req,res)=>{
    if(!req.session.user){
      return res.status(500).send("You haven't logged in yet.")
    }else{
      let newpost = new Post (req.body);
      newpost._event = req.params.id;
      newpost._user = req.session.user._id;
      newpost.save((err, savedpost)=>{
        if(err){
          let errors=""
          for (let i in err.errors){
            errors += err.errors[i].message+","
          }
          return res.status(500).send(errors)
        }else{
          Event.findOne({_id:req.params.id},(err,theevent)=>{
            if(err){
              console.log(err)
            }else{
              theevent.posts.push(savedpost)
              theevent.save((err,savedevent)=>{
                if(err){
                  console.log(err)
                }else{
                  return res.json(savedpost)
                }
              })
            }
          })
        }
      })
    }
  },

  newcomment: (req, res)=>{
    if(!req.session.user){
      return res.status(500).send("You haven't logged in yet.")
    }else{
      let newcommnet = new Comment (req.body)
      newcommnet._post = req.params.id;
      newcommnet._user = req.session.user._id
      newcommnet.save((err,savedcomment)=>{
        if(err){
          let errors = ""
          for (let i in err.errors){
            errors += err.errors[i].message+","
          }
          return res.status(500).send(errors)
        }else{
          Post.findOne({_id:req.params.id},(err,thepost)=>{
            if(err){
              console.log(err)
            }else{
              thepost.comments.push(savedcomment);
              thepost.save((err,savedpost)=>{
                if(err){
                  console.log(err)
                }else{
                  return res.json(savedcomment)
                }
              })
            }
          })
        }
      })
    }
  },

  teampost: (req, res)=>{
    if(!req.session.user){
      return res.status(500).send("You haven't logged in yet.")
    }else{
      let newpost = new Post(req.body);
      newpost._team = req.params.id;
      newpost._user = req.session.user._id;
      newpost.save( (err,savedpost)=>{
        if(err){
          let errors="";
          for (let i in err.errors){
            errors += err.errors[i].message + ","
          }
          return res.status(500).send(errors)
        }else{
          Team.findOne({_id:req.params.id},(err,theteam)=>{
            if(err){
              console.log(err)
            }else{
              theteam.posts.push(savedpost)
              theteam.save( (err,savedteam)=>{
                if(err){
                  console.log(err)
                }else{
                  return res.json(savedpost)
                }
              })
            }
          })
        }
      })
    }
  },

  teamcomment: (req, res)=>{
    if(!req.session.user){
      return res.status(500).send("You haven't logged in yet.")
    }else{
      let newcomment = new Comment (req.body);
      newcomment._user = req.session.user._id;
      newcomment._team = req.params.id;
      newcomment.save( (err,savedcomment)=>{
        if(err){
          let errors =""
          for (let i in err.errors){
            errors += err.errors[i].message + ","
          }
          return res.status(500).send(errors)
        }else{
          Post.findOne({_id:req.params.id},(err,thepost)=>{
            if(err){
              console.log(err)
            }else{
              thepost.comments.push(savedcomment);
              thepost.save( (err,savedpost)=>{
                if(err){
                  console.log(err)
                }else{
                  return res.json(savedcomment)
                }
              })
            }
          })
        }
      })
    }
  },

  usershowprofile: (req, res)=>{
    User.findOne({_id:req.params.id})
    .populate({path:'profiles', populete:{path:'profile'}})
    .populate({path:'teams', populete:{path:'team'}})
    .populate({path:'events', populete:{path:'event'}})
    .exec((err,theuser)=>{
      if(err){
        console.log(err)
      }else{
        return res.json(theuser)
      }
    })
  },

  myactivities: (req,res)=>{
    User.findOne({_id:req.session.user._id})
    .populate({path:'profiles', populete:{path:'profile'}})
    .populate({path:'teams', populete:{path:'team'}})
    .populate({path:'events', populete:{path:'event'}})
    .exec( (err,mine)=>{
      if(err){
        console.log(err)
      }else{
        return res.json(mine)
      }
    })
  }
}
