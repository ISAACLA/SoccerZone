import { Component, OnInit } from '@angular/core';
import { TeamService } from './../team.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-team-show',
  templateUrl: './team-show.component.html',
  styleUrls: ['./team-show.component.css']
})
export class TeamShowComponent implements OnInit {
  team: any;
  team_id: String;
  constructor(
    private _teamService:TeamService,
    private _route:ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.params.subscribe((param)=>{
      this.team_id = param.id
    })
    this.gettheteam(this.team_id)
  }

  gettheteam(id){
    this._teamService.gettheteam(id)
    .then( (response)=>this.team=response)
    .catch( (err)=>console.log(err) )
  }
}