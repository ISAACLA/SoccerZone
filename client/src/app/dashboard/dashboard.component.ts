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
    this.currentuser(),
    this.zipcodeteams(),
    this.zipcodeevents()
  }

  currentuser(){
    this. _reglogService.currentuser()
    .then( (response)=>this.user=response )
    .catch( (err)=>this._router.navigate(['']) )
  }

  zipcodeteams(){
    this._teamService.zipcodeteams()
    .then( (response)=>this.teams= response )
    .catch( (err)=>console.log(err) )
  }

  zipcodeevents(){
    this._eventService.zipcodeevents()
    .then( (response)=>this.events=response )
    .catch( (err)=>console.log(err) )
  }

}
