import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http'
import 'rxjs'

@Injectable()
export class EventService {

  constructor(
    private _http:Http
  ) { }

  newevent(data){
    return this._http.post('/api/events', data)
    .map( (response:Response)=>response.json() )
    .toPromise()
  }

  zipcodeevents(){
    return this._http.get('/api/zipcodeevents')
    .map( (response:Response)=>response.json() )
    .toPromise()
  }

  joinevent(id){
    return this._http.get('/api/joinevent/'+id)
    .map( (response:Response)=>response.json() )
    .toPromise()
  }

  gettheevent(id){
    return this._http.get('/api/theevent/'+id)
    .map( (response:Response)=>response.json() )
    .toPromise()
  }

  allevents(){
    return this._http.get('/api/events')
    .map( (response:Response)=>response.json() )
    .toPromise()
  }
}
