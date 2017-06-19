import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from './../event.service';

@Component({
  selector: 'app-event-show',
  templateUrl: './event-show.component.html',
  styleUrls: ['./event-show.component.css']
})
export class EventShowComponent implements OnInit {
  event:any;
  event_id: String;

  constructor(
    private _eventService: EventService,
    private _route:ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.params.subscribe((param)=>{
      this.event_id = param.id
    })
    this.gettheevent(this.event_id)
  }

  gettheevent(id){
    this._eventService.gettheevent(id)
    .then( (response)=>this.event=response )
    .catch( (err)=>console.log(err) )
  }

}
