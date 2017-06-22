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
  errors:any;
  commentErrors:any;

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
    var geocoder = new google.maps.Geocoder();
    var position = {lat: 34.0522, lng: -118.2437}
    var mapProp = {
        center: new google.maps.LatLng(34.0522, -118.2437),
        zoom: 11,
        radius: 10000,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    function codeAddress() {
    var address = "91605";
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var cityCircle = new google.maps.Circle({
              fillColor: '#2200CC',
              fillOpacity: 0.35,
              strokeWeight: 1,
              strokeColor: '#2200CC',
              strokeOpacity: 0.7,
              map: map,
              center: results[0].geometry.location,
              radius: 4000
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  codeAddress();
  }

  currentUser(){
    this. _reglogService.currentUser()
    .then( (user) => this.user = user)
    .catch( (err) => this._router.navigate(['']) )
  }

  getEvent(id){
    this._eventService.getEvent(id)
    .then( (event)=>this.event=event)
    .catch( (err)=>console.log(err) )
  }

  joinEvent(event_id){
    this._eventService.joinEvent(event_id)
    .then( (response)=>this.getEvent(event) )
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
   .catch( (err)=>this.commentErrors= err._body.split(",") )
 }

}
