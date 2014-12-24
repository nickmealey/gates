var app;

(function(){
  app = new Gates();
  
  app.defaultTemplate('templates/basic');
  
  app.routes(['/about', '/contact']);
  
  app.gate('/', 'home');
  
  app.gate('blog', 'templates/minimal');
})();