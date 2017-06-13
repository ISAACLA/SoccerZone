import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { IndexComponent} from './index/index.component';
import { RegLogComponent } from './reg-log/reg-log.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

const APP_ROUTES: Routes=[
  {path: '', component:IndexComponent},
  {path: 'reglog', component:RegLogComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'profile', component:ProfileComponent},

];

export const routing = RouterModule.forRoot(APP_ROUTES)
