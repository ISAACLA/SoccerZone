import { Component, OnInit } from '@angular/core';
import { RegLogService } from './../reg-log/reg-log.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(
    private _reglogService: RegLogService,
    private _router:Router
  ) { }

  ngOnInit() {
    this.currentuser()
  }

  currentuser(){
    this. _reglogService.currentuser()
    .then( (response)=>this.user=response )
    .catch( (err)=>this._router.navigate(['']) )
  }
}
