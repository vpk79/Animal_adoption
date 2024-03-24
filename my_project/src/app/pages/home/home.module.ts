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



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    HeaderCardsComponent,
    AvailablePetsComponent,
    LastViewedPetsComponent,
    AdoptionArticlesComponent,
    UsefullAdoptionLinksComponent,
    CommentarySectionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [HomeComponent]

})
export class HomeModule { }
