import { Route } from '@angular/router';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';

export const UserRoutes: Route[] = [
  {
    path: '',
    title: 'User list',
    component: UserListComponent,
  },
  {
    path: 'add',
    title: 'Add new user',
    component: UserAddComponent,
  },
  {
    path: 'edit',
    title: 'Edit user',
    component: UserEditComponent,
  },
];
