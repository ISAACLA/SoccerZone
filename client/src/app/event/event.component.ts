import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  errors:any;
  events: any;
  constructor(
    private _eventService:EventService
  ) { }

  ngOnInit() {
    this.allEvents()
  }

  newEvent(formData){
    this._eventService.newEvent(formData.value)
    .then( (response)=>{
      formData.reset();
      this.allEvents()
     })
    .catch( (err)=>this.errors=err._body.split(","))
  }

  allEvents(){
    this._eventService.allEvents()
    .then( (response)=>this.events=response)
    .catch( (err)=>console.log(err))
  }

  joinEvent(event_id){
    this._eventService.joinEvent(event_id)
    .then( (response)=>this.allEvents() )
    .catch( (err)=>console.log(err) )
  }
}
