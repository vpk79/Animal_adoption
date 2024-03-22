import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeaderCardsComponent } from './header-cards/header-cards.component';
import { HomeComponent } from './home.component';
import { AvailablePetsComponent } from './available-pets/available-pets.component';
import { LastViewedPetsComponent } from './last-viewed-pets/last-viewed-pets.component';
import { AdoptionArticlesComponent } from './adoption-articles/adoption-articles.component';
import { UsefullAdoptionLinksComponent } from './usefull-adoption-links/usefull-adoption-links.component';
import { CommentarySectionComponent } from './commentary-section/commentary-section.component';
import { DonationSectionComponent } from './donation-section/donation-section.component';
import { OverFooterLineComponent } from './over-footer-line/over-footer-line.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HeaderCardsComponent,
    HomeComponent,
    AvailablePetsComponent,
    LastViewedPetsComponent,
    AdoptionArticlesComponent,
    UsefullAdoptionLinksComponent,
    CommentarySectionComponent,
    DonationSectionComponent,
    OverFooterLineComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent,
    HeaderCardsComponent,
    HomeComponent
  ]

})
export class HomeModule { }
