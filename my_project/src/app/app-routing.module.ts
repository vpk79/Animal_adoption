import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { UserProfilModule } from './pages/user-profil/user-profil.module';
import { UserProfilComponent } from './pages/user-profil/user-profil.component';
import { DetailsComponent } from './pages/details/details.component';
import { AuthGuard } from './auth.guard';
import { loggedInGuard } from './logged-in.guard';
import { ErrorPageComponent } from './pages/error-page/error-page.component';


const routes: Routes = [
  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: PagesComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'login', component: LoginComponent, canActivate: [loggedInGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [loggedInGuard] },
  { path: 'profile', component: UserProfilComponent, canActivate: [AuthGuard] },
  { path: 'details', component: DetailsComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error' },
 
  
  
  // { path: 'dasboard', component: DashboardComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
