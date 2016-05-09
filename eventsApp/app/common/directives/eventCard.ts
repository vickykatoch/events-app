module events.common{
    
    interface IEventCardController{
        
    }
    
    class EventCardController implements IEventCardController{
        
    }
    
    
    class EventCardDirective implements ng.IDirective{
        static instance(): ng.IDirective {
            return new EventCardDirective;
        }
        restrict='E';
        templateUrl='app/common/directives/templates/eventCardTemplate.html';
        controller: EventCardController;
        scope = {
          event:'='  
        };
        link(scope: ng.IScope, 
                element: ng.IAugmentedJQuery,
                attribs: ng.IAttributes,
                controller: IEventCardController,
                transclude: ng.ITranscludeFunction):void {
            console.log(scope);
        }
        
        
    }
    
    angular
        .module('eventsApp')
        .directive('eventCard', EventCardDirective.instance);
}