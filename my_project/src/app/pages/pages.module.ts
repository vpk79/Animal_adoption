import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HomeModule } from './home/home.module';
import { GalleryModule } from './gallery/gallery.module';
import { UserModule } from './user/user.module';





@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule, HomeModule, GalleryModule, UserModule
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
