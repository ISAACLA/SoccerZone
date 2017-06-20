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
    this.allevents()
  }

  newevent(formData){
    this._eventService.newevent(formData.value)
    .then( (response)=>{
      formData.reset();
      this.allevents()
     })
    .catch( (err)=>this.errors=err._body.split(","))
  }

  allevents(){
    this._eventService.allevents()
    .then( (response)=>this.events=response)
    .catch( (err)=>console.log(err))
  }

  joinevent(event_id){
    this._eventService.joinevent(event_id)
    .then( (response)=>this.allevents() )
    .catch( (err)=>console.log(err) )
  }
}
