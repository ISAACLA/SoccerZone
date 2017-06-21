import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import 'rxjs'

@Injectable()
export class RegLogService {

  constructor(
    private _http:Http
  ) { }

  register(data){
    return this._http.post('/api/register', data)
    .map( (response:Response)=>response.json() )
    .toPromise()
  }

  login(data){
    return this._http.post('/api/login', data)
    .map( (response:Response)=>response.json() )
    .toPromise()
  }

  currentUser(){
    return this._http.get('/api/currentUser')
    .map( (response:Response)=>response.json() )
    .toPromise()
  }
}
