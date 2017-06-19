import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs'

@Injectable()
export class TeamService {

  constructor(
    private _http:Http
  ) { }

  newteam(data){
    return this._http.post('/api/teams', data)
    .map( (response:Response)=>response.json() )
    .toPromise()
  }

  zipcodeteams(){
    return this._http.get('/api/zipcodeteams')
    .map( (response:Response)=>response.json() )
    .toPromise()
  }
}
