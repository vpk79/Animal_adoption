import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeComponent } from './src/home/home.component';
import { GalleryComponent } from './src/gallery/gallery.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
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
