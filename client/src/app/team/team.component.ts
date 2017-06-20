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
    this.allteams()
  }

  newteam(formData){
    this._teamService.newteam(formData.value)
    .then( response=>{
      formData.reset();
      this.allteams();
    } )
    .catch( (err)=>this.errors=err._body.split(","))
  }

  allteams(){
    this._teamService.allteams()
    .then( (response)=>this.teams=response )
    .catch( (err)=>console.log(err) )
  }

  jointeam(team_id){
    this._teamService.jointeam(team_id)
    .then( (response:Response)=>this.allteams() )
    .catch( (err)=>console.log(err))
  }
}
