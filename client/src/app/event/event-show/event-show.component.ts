import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { RegLogService } from '../../reg-log/reg-log.service'

declare var google: any;

@Component({
  selector: 'app-event-show',
  templateUrl: './event-show.component.html',
  styleUrls: ['./event-show.component.css']
})
export class EventShowComponent implements OnInit {
  user:any;
  event:any;
  event_id: String;

  constructor(
    private _reglogService: RegLogService,
    private _eventService: EventService,
    private _route:ActivatedRoute,
    private _router:Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((param)=>{
      this.event_id = param.id
    })
    this.getEvent(this.event_id)
    this.currentUser()
    var mapProp = {
        center: new google.maps.LatLng(34.0522, -118.2437),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  }

  currentUser(){
    this. _reglogService.currentUser()
    .then( (user) => this.user = user)
    .catch( (err) => this._router.navigate(['']) )
  }

  getEvent(id){
    this._eventService.getEvent(id)
    .then( (response)=>this.event=response )
    .catch( (err)=>console.log(err) )
  }

  joinEvent(event_id){
    this._eventService.joinEvent(event_id)
    .then( (response)=>this.getEvent(event) )
    .catch( (err)=>console.log(err))
  }

}
