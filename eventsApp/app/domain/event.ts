module events.domain{
    export interface IEvent{
        id:number;
        name: string;
        duration : number;
        location: string;
        when: Date;
    }
}