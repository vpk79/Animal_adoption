import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HomeModule } from './home/home.module';
import { GalleryModule } from './gallery/gallery.module';
import { UserModule } from './user/user.module';
import { DetailsModule } from './details/details.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [
    PagesComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule, HomeModule, GalleryModule, UserModule, DetailsModule, RouterModule
  ],
  exports: [
    PagesComponent, ErrorPageComponent
  ]
})
export class PagesModule { }
