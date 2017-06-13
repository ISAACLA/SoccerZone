let controller = require('./../controller/controller');

module.exports=(app)=>{
  app.post('/api/register', controller.register)
  app.post('/api/login', controller.login)
  app.get('/logout', controller.logout)
  app.get('/api/currentuser', controller.currentuser)

}
