import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeaderCardsComponent } from './header-cards/header-cards.component';
import { HomeComponent } from './home.component';
import { AvailablePetsComponent } from './available-pets/available-pets.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HeaderCardsComponent,
    HomeComponent,
    AvailablePetsComponent
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
