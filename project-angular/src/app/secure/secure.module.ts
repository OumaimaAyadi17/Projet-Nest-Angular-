import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { MenuComponent } from './menu/menu.component';
import { SecureComponent } from './secure.component';
import { UsersComponent } from './users/users.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { RouterModule } from '@angular/router';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    NavComponent,
    MenuComponent,
    SecureComponent,
    UsersComponent,
    DashbordComponent,
    UserEditComponent,
    UserCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SecureModule { }
