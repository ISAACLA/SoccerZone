import { Component, OnInit } from '@angular/core';
import { TeamService } from './team.service';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  errors: any;
  constructor(
    private _teamService:TeamService
  ) { }

  ngOnInit() {
  }

  newteam(formData){
    this._teamService.newteam(formData.value)
    .then( response=>formData.reset() )
    .catch( (err)=>this.errors=err._body.split(","))
  }

}
