let controller = require('./../controller/controller');

module.exports=(app)=>{
  app.post('/api/register', controller.register)
  app.post('/api/login', controller.login)
  app.get('/logout', controller.logout)
  app.get('/api/currentUser', controller.currentuser)

  app.post('/api/profile', controller.newprofile)

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

}
