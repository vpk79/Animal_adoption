import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { HomeModule } from '../home/home.module';
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule, HomeModule, RouterModule
  ],
  exports:[ DetailsComponent]
})
export class DetailsModule { }
