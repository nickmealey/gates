var app;

(function(){
  app = new Gates();
  
  app.defaultTemplate('templates/basic.html');
  
  app.routes(['home.html']);
  
  console.log(app);
})();