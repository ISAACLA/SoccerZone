import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../profile.service'

@Component({
  selector: 'app-profile-new',
  templateUrl: './profile-new.component.html',
  styleUrls: ['./profile-new.component.css']
})
export class ProfileNewComponent implements OnInit {
  errors:any
  constructor(
    private _profileService:ProfileService
  ) { }

  ngOnInit() {
  }

  profile(formData){
    this._profileService.profile(formData.value)
    .then( (response)=>console.log(response) )
    .catch( (err)=>this.errors=err._body.split(",") )
  }

}
