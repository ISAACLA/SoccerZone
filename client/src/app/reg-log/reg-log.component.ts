import { Component, OnInit } from '@angular/core';
import { RegLogService } from './reg-log.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-reg-log',
  templateUrl: './reg-log.component.html',
  styleUrls: ['./reg-log.component.css']
})
export class RegLogComponent implements OnInit {
  registererrors: any
  constructor(
    private _reglogService: RegLogService,
    private _router:Router
  ) { }

  ngOnInit() {
  }

  register(formData){
    this._reglogService.register(formData.value)
    .then( (response)=>this._router.navigate(['/dashboard']) )
    .catch( (err)=> this.registererrors=err._body.split(',') )
  }

  login(formData){
    this._reglogService.login(formData.value)
    .then( (response)=>this._router.navigate(['/dashboard']) )
    .catch( (err)=>console.log(err) )
  }
}
