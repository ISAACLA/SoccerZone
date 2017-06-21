import { Component, OnInit } from '@angular/core';
import { RegLogService } from './../reg-log/reg-log.service';
import { TeamService } from './../team/team.service';
import { EventService } from './../event/event.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  teams: any;
  events: any;
  constructor(
    private _reglogService: RegLogService,
    private _teamService: TeamService,
    private _eventService: EventService,
    private _router:Router
  ) { }

  ngOnInit() {
    this.currentUser(),
    this.zipcodeTeams(),
    this.zipcodeEvents()
  }

  currentUser(){
    this. _reglogService.currentUser()
    .then( (response)=>this.user=response )
    .catch( (err)=>this._router.navigate(['']) )
  }

  zipcodeTeams(){
    this._teamService.zipcodeTeams()
    .then( (response)=>this.teams= response )
    .catch( (err)=>console.log(err) )
  }

  zipcodeEvents(){
    this._eventService.zipcodeEvents()
    .then( (response)=>this.events=response )
    .catch( (err)=>console.log(err) )
  }

  joinTeam(team_id){
    this._teamService.joinTeam(team_id)
    .then( (response)=>this.zipcodeTeams() )
    .catch( (err)=>console.log(err))
  }

  joinEvent(event_id){
    this._eventService.joinEvent(event_id)
    .then( (respnose)=>this.zipcodeEvents() )
    .catch( (err)=>console.log(err))
  }
}
