import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: PagesComponent },
  { path: 'gallery', component: GalleryComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'dasboard', component: DashboardComponent },
  // { path: 'register', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
