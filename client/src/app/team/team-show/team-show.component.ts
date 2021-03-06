import { Component, OnInit } from '@angular/core';
import { TeamService } from './../team.service';
import { RegLogService } from './../../reg-log/reg-log.service';
import { Router, ActivatedRoute } from '@angular/router'

declare var google: any;

@Component({
  selector: 'app-team-show',
  templateUrl: './team-show.component.html',
  styleUrls: ['./team-show.component.css']
})
export class TeamShowComponent implements OnInit {
  user: any;
  team: any;
  team_id: string;
  errors: any;
  commenterrors: any;
  constructor(
    private _teamService:TeamService,
    private _reglogService:RegLogService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.params.subscribe((param)=>{
      this.team_id = param.id
    })
    this.getTeam(this.team_id)
    this.currentUser()
  }

  currentUser(){
    this. _reglogService.currentUser()
    .then( (user) => this.user = user)
    .catch( (err) => this._router.navigate(['']) )
  }

  getTeam(id){
    this._teamService.getTeam(id)
    .then( (response)=>{
        this.team=response;
        this.generateMap(this.team.zipcode)
    })
    .catch( (err)=>console.log(err) )
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
     codeAddress(zip)
  }

  joinTeam(team_id){
    this._teamService.joinTeam(team_id)
    .then( (response:Response)=>this.getTeam(this.team_id) )
    .catch( (err)=>console.log(err))
  }

  teampost(formData,team_id){
    this._teamService.teampost(formData.value, team_id)
    .then( (response)=>{
      this.getTeam(this.team_id);
      formData.reset()
    })
    .catch( (err)=>this.errors=err._body.split(","))
  }

  teamcomment(formData,p_id){
    this._teamService.teamcomment(formData.value, p_id)
    .then( (response)=>{
      this.getTeam(this.team_id);
      formData.reset()
    })
    .catch( (err)=>this.commenterrors=err._body.split(",") )
  }

  containsUser(user, squad) {
    for (var i = 0; i < squad.length; i++) {
        if (squad[i].username === user.username) {
            return true;
        }
    }
    return false;
  }

}
