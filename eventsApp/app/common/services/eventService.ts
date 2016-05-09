module events.services{
    
    
    interface IEventResource extends ng.resource.IResource<events.domain.IEvent> {
        
    }
    
    interface IDataService{
        getEventResource() : ng.resource.IResourceClass<IEventResource>;
    }
    
    
    export class DataAccessService implements IDataService{
        
        static $inject = ['$resource'];
        constructor(private $resource: ng.resource.IResourceService){
        }
        
        getEventResource() : ng.resource.IResourceClass<IEventResource> {
            return this.$resource('api/events/:eventid');
        }
    }
    
    angular
        .module('eventsApp')
        .service('dataAccessService',DataAccessService);
}