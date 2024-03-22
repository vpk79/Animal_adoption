import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeaderCardsComponent } from './header-cards/header-cards.component';
import { HomeComponent } from './home.component';
import { AvailablePetsComponent } from './available-pets/available-pets.component';
import { LastViewedPetsComponent } from './last-viewed-pets/last-viewed-pets.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HeaderCardsComponent,
    HomeComponent,
    AvailablePetsComponent,
    LastViewedPetsComponent
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
