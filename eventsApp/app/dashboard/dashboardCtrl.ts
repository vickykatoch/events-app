module events.dashboard{
    
    interface IDashboardController{
        events : events.domain.IEvent[];
    }
    
    class DashboardController implements IDashboardController{
        public events : events.domain.IEvent[]
        
        static $inject = ['dataAccessService'];
        constructor(private dataService: events.services.DataAccessService){
            var eventResource = dataService.getEventResource();
            eventResource.query((data: events.domain.IEvent[])=>{
                this.events=data;
            });
        }
    } 
    
    angular
        .module('eventsApp')
        .controller('dashboardCtrl', DashboardController);
    
    
}