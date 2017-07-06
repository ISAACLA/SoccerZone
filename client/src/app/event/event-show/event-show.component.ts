import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { RegLogService } from '../../reg-log/reg-log.service';
import "rxjs";

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
  errors:any;
  commenterrors:any;

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
  }

  currentUser(){
    this. _reglogService.currentUser()
    .then( (user) => this.user = user)
    .catch( (err) => this._router.navigate(['']) )
  }

  getEvent(id){
    this._eventService.getEvent(id)
    .then( (event)=>{
        this.event=event;
        this.generateMap(this.event.zipcode)
    })
    .catch( (err)=>console.log(err) )
  }

  joinEvent(event_id){
    this._eventService.joinEvent(event_id)
    .then( (response)=>this.getEvent(this.event_id) )
    .catch( (err)=>console.log(err))
  }

  newpost(formData, eventid){
   this._eventService.newPost(formData.value, eventid)
   .then( (response)=>{
     this.getEvent(this.event_id);
     formData.reset()
   })
   .catch( (err)=>this.errors=err._body.split(",") )
 }
 newcomment(formData, p_id){
   this._eventService.newComment(formData.value, p_id)
   .then( (response)=>{
     this.getEvent(this.event_id );
     formData.reset()
   })
   .catch( (err)=>this.commenterrors= err._body.split(",") )
 }

 generateMap(location){
     var zip = location.toString();
     var geocoder = new google.maps.Geocoder();
     var position = {lat: 34.0522, lng: -118.2437}
     var mapProp = {
         center: new google.maps.LatLng(34.0522, -118.2437),
         zoom: 11,
         radius: 10000,
         mapTypeId: google.maps.MapTypeId.ROADMAP
     };
     var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

     function codeAddress(location) {
     var address = location;
     geocoder.geocode( { 'address': address}, function(results, status) {
       if (status == 'OK') {
         map.setCenter(results[0].geometry.location);
         var cityMarker = new google.maps.Marker({
               map: map,
               position: results[0].geometry.location,
               title: name,
         });
       } else {
         alert('Geocode was not successful for the following reason: ' + status);
       }
     });
    }
    console.log(zip);
    codeAddress(zip);
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
