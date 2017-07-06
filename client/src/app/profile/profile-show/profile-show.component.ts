import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../profile.service';
import { RegLogService } from './../../reg-log/reg-log.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-show',
  templateUrl: './profile-show.component.html',
  styleUrls: ['./profile-show.component.css']
})
export class ProfileShowComponent implements OnInit {
  user: any;
  profileUser:any;
  user_id: string;

  constructor(
    private _profileService:ProfileService,
    private _reglogService: RegLogService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.params.subscribe( (param)=>{
      this.user_id = param.id
    })
    this.getProfile(this.user_id)
  }

  currentUser(){
    this. _reglogService.currentUser()
    .then( (user) => this.user = user)
    .catch( (err) => this._router.navigate(['']) )
  }

  getProfile(id){
    this._profileService.getProfile(id)
    .then( (response)=>{
        this.profileUser=response;
        console.log(this.profileUser)
    })
    .catch( (err)=>console.log(err) )
  }
}
