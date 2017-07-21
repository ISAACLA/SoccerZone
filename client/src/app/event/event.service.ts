import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http'
import 'rxjs'

@Injectable()
export class EventService {

  constructor(
    private _http:Http
  ) { }

  newEvent(data){
    return this._http.post('/api/events', data)
    .map( (response:Response)=>response.json() )
    .toPromise()
  }

  zipcodeEvents(){
    return this._http.get('/api/zipcodeEvents')
    .map( (response:Response)=>response.json() )
    .toPromise()
  }

  joinEvent(id){
    return this._http.get('/api/joinEvent/'+id)
    .map( (response:Response)=>response.json() )
    .toPromise()
  }

  getEvent(id){
    return this._http.get('/api/event/'+id)
    .map( (response:Response)=>response.json() )
    .toPromise()
  }

  allEvents(){
    return this._http.get('/api/events')
    .map( (response:Response)=>response.json() )
    .toPromise()
  }

  newPost(data, eventid){
   return this._http.post('/api/posts/'+ eventid, data)
   .map( (response:Response)=>response.json() )
   .toPromise()
  }

  newComment(data, postid){
   return this._http.post('/api/comments/'+ postid, data)
   .map( (response:Response)=>response.json() )
   .toPromise()
  }
  
}
