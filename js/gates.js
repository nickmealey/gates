/*
 Gates
 Author: Nick Mealey
*/
(function($){
  if (!$){
    throw "Gates requires jQuery as a dependency";
  }
  
  // Template object
  function Template(path){
    this.path = path;
  }
  
  // Create a new gate
  function Gate(path, template){
    this.path = path;
    this.template =  template;
  }
  
  // Main Gates contructor
  Gates = function(){
    // Self object
    self = this;
    
    // A collection of gates
    this.gates = [];
    
    // Set base template
    this.defaultTemplate = function(template){
      if(template){
        self.template = new Template(template);
      }
      
      return self.template;
    }
    
    // Setup basic routes
    this.routes = function(routes){
      for (var i=0; i < routes.length; i++){
        var route = routes[i];
        var template = this.defaultTemplate();
        this.gates.push(new Gate(route, template));
      };
    };
  };
  return Gates;
})(jQuery);