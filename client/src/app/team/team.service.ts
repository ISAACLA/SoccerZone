import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs'

@Injectable()
export class TeamService {

  constructor(
    private _http:Http
  ) { }

  newTeam(data){
    return this._http.post('/api/teams', data)
    .map( (response:Response)=>response.json() )
    .toPromise()
  }

  zipcodeTeams(){
    return this._http.get('/api/zipcodeTeams')
    .map( (response:Response)=>response.json() )
    .toPromise()
  }

  joinTeam(id){
    return this._http.get('/api/joinTeam/'+id)
    .map( (response:Response)=>response.json() )
    .toPromise()
  }

  getTeam(id){
    return this._http.get('/api/team/'+id)
    .map( (response:Response)=>response.json() )
    .toPromise()
  }

  allTeams(){
    return this._http.get('/api/teams')
    .map( (response:Response)=>response.json() )
    .toPromise()
  }
}
