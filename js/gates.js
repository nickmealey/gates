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
    
    // Route to page
    this.route = function(path){
      // First, find that route
      var route = self.find(path);
      
      if(route){
        
        // Get view file
        function getView(callback){
          $.ajax({
            url: "views/" + route.path,
            method: 'GET',
            success: function(response){
              callback(response);
            },
            error: function(err){
              console.log(err);
            }
          });
        }
        
        // Get a partial
        function getPartial(path, callback){
          $.ajax({
            url: path,
            method: 'GET',
            success: function(response){
              callback(response);
            },
            error: function(err){
              console.log(err);
            }
          });
        }
        
        
        // Get the template file
        $.ajax({
          url: route.template.path,
          method: 'GET',
          success: function(templateResponse){
            // Get the view
            getView(function(viewResponse){
              // Set template
              var template = $('<wrapper/>').html(templateResponse);
              
              // Set view
              var view = template.find('*[data-gates-render]').html(viewResponse).end();
              
              // Remove the wrapper we created
              view = view.children();
              
              // Append it all to the page
              $('*[data-gates-template]').html(view)
              
              // Find any partials
              .find('*[data-gates-partial]').each(function(index, _partial){
                var path = $(this).attr('data-gates-partial');
                getPartial(path, function(partialResponse){
                  $(_partial).html(partialResponse);
                });
              });
            });
            
            
          },
          error: function(err){
            console.log(err);
          }
        });
      }
    };
    
    // Setup basic routes
    this.routes = function(routes){
      for (var i=0; i < routes.length; i++){
        var path = routes[i];
        
        // Create the gate
        self.newGate(path);
      };
      
      self.route(currentRoute);
    };
    
    // Get the route from url
    var currentRoute = window.location.hash.replace("#", '');
    
    $(window).on('hashchange', function(){
      self.route(currentRoute);
    });
  };
  return Gates;
})(jQuery);