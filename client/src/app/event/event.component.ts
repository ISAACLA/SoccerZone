import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  errors:any
  constructor(
    private _eventService:EventService
  ) { }

  ngOnInit() {
  }

  newevent(formData){
    this._eventService.newevent(formData.value)
    .then( (response)=>formData.reset() )
    .catch( (err)=>this.errors=err._body.split(","))
  }

}
