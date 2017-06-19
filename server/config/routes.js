let controller = require('./../controller/controller');

module.exports=(app)=>{
  app.post('/api/register', controller.register)
  app.post('/api/login', controller.login)
  app.get('/logout', controller.logout)
  app.get('/api/currentuser', controller.currentuser)

  app.post('/api/profile', controller.newprofile)

  app.post('/api/teams', controller.newteam)
  app.get('/api/zipcodeteams', controller.zipcodeteams)
  app.get('/api/jointeam/:id', controller.jointeam)
  app.get('/api/theteam/:id', controller.theteam)

  app.post('/api/events', controller.newevents)
  app.get('/api/zipcodeevents',controller.zipcodeevents)
  app.get('/api/joinevent/:id', controller.joinevent)
  app.get('/api/theevent/:id', controller.theevent)

}
