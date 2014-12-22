var app;

(function(){
  app = new Gates();
  
  app.defaultTemplate('templates/basic.html');
  
  app.routes(['home', 'about', 'contact', 'portfolio']);
  
  console.log(app);
})();