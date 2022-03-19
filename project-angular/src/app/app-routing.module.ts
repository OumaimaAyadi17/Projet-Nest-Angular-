import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { PublicComponent } from './public/public.component';
import { RegisterComponent } from './public/register/register.component';
import { DashbordComponent } from './secure/dashbord/dashbord.component';
import { SecureComponent } from './secure/secure.component';
import { UserCreateComponent } from './secure/users/user-create/user-create.component';
import { UserEditComponent } from './secure/users/user-edit/user-edit.component';
import { UsersComponent } from './secure/users/users.component';

const routes: Routes = [
  {path: '', 
  component: SecureComponent,
  children: [
    {path: 'dashbord', component: DashbordComponent},
    {path: 'users', component: UsersComponent},
    {path: 'users/create', component: UserCreateComponent},
    {path: 'users/:id/edit', component: UserEditComponent}
  ]
},
  {
    path: '',
    component: PublicComponent,
  children: [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
  ]
 },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
