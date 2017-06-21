import { Component, OnInit } from '@angular/core';
import { TeamService } from './team.service';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  errors: any;
  teams: any;
  constructor(
    private _teamService:TeamService
  ) { }

  ngOnInit() {
    this.allTeams()
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
}
