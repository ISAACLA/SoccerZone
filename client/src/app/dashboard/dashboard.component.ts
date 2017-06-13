import { Component, OnInit } from '@angular/core';
import { RegLogService } from './../reg-log/reg-log.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any
  constructor(
    private _reglogService: RegLogService,
    private _router:Router
  ) { }

  ngOnInit() {
  }

  currentuser(){
    this. _reglogService.currentuser()
    .then( (response)=>this.user=response )
    .catch( (err)=>this._router.navigate(['']) )
  }
}
