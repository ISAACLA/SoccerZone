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
}
