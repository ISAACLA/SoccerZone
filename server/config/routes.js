let controller = require('./../controller/controller');

module.exports=(app)=>{
  app.post('/api/register', controller.register)
  app.post('/api/login', controller.login)
  app.get('/logout', controller.logout)
  app.get('/api/currentUser', controller.currentuser)
  app.get('/api/myactivities', controller.myactivities)

  app.post('/api/profile', controller.newprofile)
  app.get('/api/theuser/:id', controller.usershowprofile)

  app.post('/api/teams', controller.newteam)
  app.get('/api/zipcodeTeams', controller.zipcodeteams)
  app.get('/api/joinTeam/:id', controller.jointeam)
  app.get('/api/team/:id', controller.theteam)
  app.get('/api/teams', controller.allteams)

  app.post('/api/events', controller.newevents)
  app.get('/api/zipcodeEvents',controller.zipcodeevents)
  app.get('/api/joinEvent/:id', controller.joinevent)
  app.get('/api/event/:id', controller.theevent)
  app.get('/api/events', controller.allevents)

  app.post('/api/posts/:id', controller.newpost)
  app.post('/api/comments/:id', controller.newcomment)

  app.post('/api/teamposts/:id', controller.teampost)
  app.post('/api/teamcomments/:id', controller.teamcomment)

}
