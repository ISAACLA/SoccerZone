import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { IndexComponent} from './index/index.component';
import { RegLogComponent } from './reg-log/reg-log.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { TeamComponent } from './team/team.component';
import { EventComponent } from './event/event.component'

const APP_ROUTES: Routes=[
  {path: '', component:IndexComponent},
  {path: 'reglog', component:RegLogComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'team', component:TeamComponent},
  {path: 'event', component:EventComponent},

];

export const routing = RouterModule.forRoot(APP_ROUTES)
