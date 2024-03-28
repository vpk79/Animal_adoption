import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';



@NgModule({
  declarations: [
    UserComponent,
   LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  exports: [
    UserComponent,
    LoginComponent,
    RegisterComponent]
})
export class UserModule { }
