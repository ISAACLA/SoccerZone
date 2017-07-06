import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { RegLogService } from '../reg-log/reg-log.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  user:any;
  errors:any;
  events: any;
  constructor(
    private _eventService:EventService,
    private _reglogService:RegLogService,
    private _router:Router
  ) { }

  ngOnInit() {
    this.allEvents()
    this.currentUser()
  }

  currentUser(){
    this. _reglogService.currentUser()
    .then( (user) => this.user = user)
    .catch( (err) => this._router.navigate(['']) )
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
    .then( (response)=>{
        this.events=response.sort(function(a, b) {
            a = new Date(a.date);
            b = new Date(b.date);
            return b>a ? -1 : b<a ? 1 : 0;
    })})
    .catch( (err)=>console.log(err))
  }

  joinEvent(event_id){
    this._eventService.joinEvent(event_id)
    .then( (response)=>this.allEvents() )
    .catch( (err)=>console.log(err) )
  }

  containsUser(user, attendees) {
    for (var i = 0; i < attendees.length; i++) {
        if (attendees[i].username === user.username) {
            return true;
        }
    }
    return false;
  }
}
