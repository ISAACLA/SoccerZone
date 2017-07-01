import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../profile.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-show',
  templateUrl: './profile-show.component.html',
  styleUrls: ['./profile-show.component.css']
})
export class ProfileShowComponent implements OnInit {

  profileuser:any
  user_id: String;
  constructor(
    private _profileService:ProfileService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.params.subscribe( (param)=>{
      this.user_id = param.id
    })
    this.gettheuser(this.user_id)
  }

  gettheuser(id){
    this._profileService.gettheuser(id)
    .then( (response)=>this.profileuser=response)
    .catch( (err)=>console.log(err) )
  }
}
