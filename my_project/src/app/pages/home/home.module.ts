import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { HeaderCardsComponent } from './header-cards/header-cards.component';
import { AvailablePetsComponent } from './available-pets/available-pets.component';
import { LastViewedPetsComponent } from './last-viewed-pets/last-viewed-pets.component';
import { AdoptionArticlesComponent } from './adoption-articles/adoption-articles.component';
import { UsefullAdoptionLinksComponent } from './usefull-adoption-links/usefull-adoption-links.component';
import { CommentarySectionComponent } from './commentary-section/commentary-section.component';
import { DonationSectionComponent } from './donation-section/donation-section.component';
import { OverFooterLineComponent } from './over-footer-line/over-footer-line.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { HeaderCarouselComponent } from './header-carousel/header-carousel.component';
import { UserModule } from '../user/user.module';
import { LoginComponent } from '../user/login/login.component';
import { Service } from '../../services/service';
import { ReactiveFormsModule } from '@angular/forms';






@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    HeaderCardsComponent,
    AvailablePetsComponent,
    LastViewedPetsComponent,
    AdoptionArticlesComponent,
    UsefullAdoptionLinksComponent,
    CommentarySectionComponent,
    DonationSectionComponent,
    OverFooterLineComponent,
    FooterComponent,
    HeaderCarouselComponent,
   
  ],
  imports: [
    CommonModule, RouterModule, UserModule, ReactiveFormsModule
  ],
  exports: [HomeComponent,
     HeaderComponent,
     FooterComponent,
      DonationSectionComponent, AvailablePetsComponent, HeaderCardsComponent, HeaderCarouselComponent, OverFooterLineComponent]

})
export class HomeModule { }
