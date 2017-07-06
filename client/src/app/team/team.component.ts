import { Component, OnInit } from '@angular/core';
import { TeamService } from './team.service';
import { RegLogService } from '../reg-log/reg-log.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  user:any;
  errors: any;
  teams: any;
  constructor(
    private _teamService:TeamService,
    private _reglogService:RegLogService,
    private _router:Router
  ) { }

  ngOnInit() {
    this.allTeams()
    this.currentUser()
  }

  currentUser(){
    this. _reglogService.currentUser()
    .then( (user) => this.user = user)
    .catch( (err) => this._router.navigate(['']) )
  }

  newTeam(formData){
    this._teamService.newTeam(formData.value)
    .then( response=>{
      formData.reset();
      this.allTeams();
    } )
    .catch( (err)=>this.errors=err._body.split(","))
  }

  allTeams(){
    this._teamService.allTeams()
    .then( (response)=>this.teams=response )
    .catch( (err)=>console.log(err) )
  }

  joinTeam(team_id){
    this._teamService.joinTeam(team_id)
    .then( (response:Response)=>this.allTeams() )
    .catch( (err)=>console.log(err))
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
