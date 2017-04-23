import { DeleteuserComponent } from './deleteuser.component';
import { ErrorpageComponent } from './errorpage.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserItemComponent } from './user-item/user-item.component';
import { UserlistComponent } from './userlist/userlist.component';
import {Routes, RouterModule} from '@angular/router';

const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'user', pathMatch: 'full' },
  {path: 'user', component: UserlistComponent},
  {path: 'userDetailes/:id', component: UserDetailsComponent},
  {path: 'newUser', component: UserEditComponent},
  {path: 'userEdit/:id', component: UserEditComponent},
  {path: 'deleted/:data', component: DeleteuserComponent},
  {path: 'error', component: ErrorpageComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
