import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { RegLogService } from './../reg-log/reg-log.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  // errors: any;
  profile: any;
  constructor(
    private _reglogService: RegLogService,
    private _router:Router,
    private _profileService:ProfileService
  ) { }

  ngOnInit() {
    this.currentUser()
    this.myActivities()
  }

  currentUser(){
    this. _reglogService.currentUser()
    .then( (response)=>{
        this.user=response
        console.log(this.user)
    })
    .catch( (err)=>this._router.navigate(['']) )
  }

  myActivities(){
    this._profileService.myactivities()
    .then( (response)=>this.profile = response )
    .catch( (err)=>console.log(err) )
  }

}
