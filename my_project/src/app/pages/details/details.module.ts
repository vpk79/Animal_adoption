import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { HomeModule } from '../home/home.module';



@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule, HomeModule
  ],
  exports:[ DetailsComponent]
})
export class DetailsModule { }
