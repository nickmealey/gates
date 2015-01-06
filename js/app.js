var app;

(function(){
  app = new Gates;
  
  app.defaultTemplate('templates/basic');
  
  app.options({
    transition: 'fade',
    transitionSpeed: 300
  });
  
  app.routes(['/about', '/contact']);
  
  app.gate('/', 'home');
  
  app.gate('/blog', 'blog', 'templates/minimal');
})();