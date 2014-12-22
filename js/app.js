var app;

(function(){
  app = new Gates();
  
  app.defaultTemplate('basic');
  
  app.routes(['home', 'about', 'contact', 'portfolio']);
})();