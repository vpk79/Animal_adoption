import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfilComponent } from './user-profil.component';
import { HomeModule } from '../home/home.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';
import { LikedCarouselComponent } from './liked-carousel/liked-carousel.component';



@NgModule({
  declarations: [
    UserProfilComponent,
    LikedCarouselComponent
  ],
  imports: [
    CommonModule, HomeModule, ReactiveFormsModule
  ],
  exports: [UserProfilComponent, LikedCarouselComponent]
})
export class UserProfilModule { }
