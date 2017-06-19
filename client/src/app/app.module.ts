import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RegLogService } from './reg-log/reg-log.service';
import { ProfileService } from './profile/profile.service';
import { TeamService } from './team/team.service';
import { EventService } from './event/event.service';

import { AppComponent } from './app.component';
import { RegLogComponent } from './reg-log/reg-log.component';

import { routing } from './app.routes';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { TeamComponent } from './team/team.component';
import { EventComponent } from './event/event.component'

@NgModule({
  declarations: [
    AppComponent,
    RegLogComponent,
    IndexComponent,
    DashboardComponent,
    ProfileComponent,
    TeamComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    RegLogService,
    ProfileService,
    TeamService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
