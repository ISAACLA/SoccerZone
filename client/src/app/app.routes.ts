import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { IndexComponent} from './index/index.component';
import { RegLogComponent } from './reg-log/reg-log.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventComponent } from './event/event.component';
import { TeamComponent } from './team/team.component';
import { EventShowComponent } from './event/event-show/event-show.component';
import { TeamShowComponent } from './team/team-show/team-show.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileShowComponent } from './profile/profile-show/profile-show.component'
import { ProfileNewComponent } from './profile/profile-new/profile-new.component'

const APP_ROUTES: Routes=[
  {path: '', component:IndexComponent},
  {path: 'reglog', component:RegLogComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'events', component:EventComponent},
  {path: 'teams', component:TeamComponent},
  {path: 'event/:id', component:EventShowComponent},
  {path: 'team/:id', component:TeamShowComponent},
  {path: 'profile', component:ProfileComponent, children:[
    {path:'profile-new', component:ProfileNewComponent}
  ]},
  {path: 'profile/:id', component:ProfileShowComponent}

];

export const routing = RouterModule.forRoot(APP_ROUTES)
