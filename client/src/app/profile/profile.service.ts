import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs'

@Injectable()
export class ProfileService {

  constructor(
    private _http:Http
  ) { }

  profile(data){
    return this._http.post('/api/profile', data)
    .map( (response:Response)=>response.json() )
    .toPromise()
  }

  getProfile(id){
    return this._http.get('/api/theuser/'+id)
    .map( (response:Response)=>response.json() )
    .toPromise()
  }

  myactivities(){
    return this._http.get('/api/myactivities')
    .map( (response:Response)=>response.json())
    .toPromise()
  }
}
