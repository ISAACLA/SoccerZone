import { Component, OnInit } from '@angular/core';
import { RegLogService } from './reg-log.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-reg-log',
  templateUrl: './reg-log.component.html',
  styleUrls: ['./reg-log.component.css']
})
export class RegLogComponent implements OnInit {
  errors: any
  constructor(
    private _reglogService: RegLogService,
    private _router:Router
  ) { }

  ngOnInit() {
  }

  register(registerData){
    this._reglogService.register(registerData.value)
    .then( (response)=>this._router.navigate(['/dashboard']) )
    .catch( (err)=> this.errors=err._body )
  }

  login(formData){
    this._reglogService.login(formData.value)
    .then( (response)=>this._router.navigate(['/dashboard']) )
    .catch( (err)=>console.log(err) )
  }
}
