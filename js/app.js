var app;

(function(){
  app = new Gates();
  
  app.defaultTemplate('templates/basic');
  
  app.routes(['home', 'about', 'contact']);
})();