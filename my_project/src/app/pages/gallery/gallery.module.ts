import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { RouterModule } from '@angular/router';
import { HomeModule } from '../home/home.module';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    GalleryComponent
  ],
  imports: [
    CommonModule, RouterModule, HomeModule, ReactiveFormsModule
  ],
  exports: [GalleryComponent]
})



export class GalleryModule {

  
}

 
