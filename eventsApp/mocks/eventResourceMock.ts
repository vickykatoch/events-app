module events.mocks{
    
    var evtMockResource = angular
                            .module("eventResourceMock",["ngMockE2E"]);
                            
    evtMockResource.run(mockRun);     
    
    mockRun.$inject = ["$httpBackend"];
    function mockRun($httpBackend: ng.IHttpBackendService) : void {
        var events: events.domain.IEvent[] =[];
        
        events.push({id:1, name: 'AngularJS Dev Week', 
                        duration: 1,
                        location: 'New York (NY)',
                        when: new Date()
                    });
        events.push({id:2, name: 'C# Best Practices', 
                        duration: 5,
                        location: 'New York (NY)',
                        when: new Date(2016,7,11)
                    }); 
        events.push({id:3, name: 'WPF Templating', 
                        duration: 3,
                        location: 'London (UK)',
                        when: new Date(2016,9,10)
                    });  
        
        var eventsUrl = "/api/events";     
        $httpBackend.whenGET(eventsUrl).respond(events);  
        
        var editingRegex = new RegExp(eventsUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex).respond(function(method, url, data) {
            var event = { "id": 0 };
            var parameters = url.split('/');
            var length = parameters.length;
            var id = +parameters[length - 1];

            if (id > 0) {
                for (var i = 0; i < events.length; i++) {
                    if (events[i].id == id) {
                        event = events[i];
                        break;
                    }
                }
            }
            return [200, event, {}];
        });  
        
        // Catch all for testing purposes
        $httpBackend.whenGET(/api/).respond(function(method, url, data) {
            return [200, events, {}];
        });
                
        // Pass through any requests for application files
        $httpBackend.whenGET(/app/).passThrough();             
        
    }                      
}