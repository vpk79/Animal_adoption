import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfilComponent } from './user-profil.component';
import { HomeModule } from '../home/home.module';



@NgModule({
  declarations: [
    UserProfilComponent
  ],
  imports: [
    CommonModule, HomeModule
  ],
  exports: [UserProfilComponent]
})
export class UserProfilModule { }
