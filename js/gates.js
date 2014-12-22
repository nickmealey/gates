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
    };
    
    // Create a gate
    this.newGate = function(path, template){
      // Check if a template was given, if not set from default
      if(template){
        template = new Template(template);
      } else {
        template = self.defaultTemplate();
      }
      // Create a new gate
      var gate = new Gate(path, template);
      
      // Push it to gates
      this.gates.push(gate);
    };
    
    // Find a gate
    this.find = function(q){
      // Loop through gates and find the 'one'
      for (var i=0; i < self.gates.length; i++) {
        var gate = self.gates[i];
        if(gate.path == q){
          return gate;
        }
      };
      
      // If we couldn't find it, throw an error
      throw("route for "+q+" was not found.");
    };
    
    // Setup basic routes
    this.routes = function(routes){
      for (var i=0; i < routes.length; i++){
        var path = routes[i];
        var template = this.defaultTemplate();
        
        // Create the gate
        self.newGate(path, template);
      };
    };
    
    this.route = function(path){
      var route = self.find(path);
    };
    
    $(window).on('hashchange', function(){
      self.route(wdinow.location.hash);
    });
  };
  return Gates;
})(jQuery);