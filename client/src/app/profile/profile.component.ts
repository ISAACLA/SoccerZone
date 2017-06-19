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
  errors: any;
  constructor(
    private _reglogService: RegLogService,
    private _router:Router,
    private _profileService:ProfileService
  ) { }

  ngOnInit() {
    this.currentuser()
  }

  currentuser(){
    this. _reglogService.currentuser()
    .then( (response)=>this.user=response )
    .catch( (err)=>this._router.navigate(['']) )
  }

  profile(formData){
    this._profileService.profile(formData.value)
    .then( (response)=>console.log(response) )
    .catch( (err)=>this.errors=err._body.split(",") )
  }
}
