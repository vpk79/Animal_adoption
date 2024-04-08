import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfilComponent } from './user-profil.component';
import { HomeModule } from '../home/home.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';
import { LikedCarouselComponent } from './liked-carousel/liked-carousel.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UserProfilComponent,
    LikedCarouselComponent
  ],
  imports: [
    CommonModule, HomeModule, ReactiveFormsModule, RouterModule
  ],
  exports: [UserProfilComponent, LikedCarouselComponent]
})
export class UserProfilModule { }
