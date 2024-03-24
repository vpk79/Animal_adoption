import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { HeaderCardsComponent } from './header-cards/header-cards.component';
import { AvailablePetsComponent } from './available-pets/available-pets.component';



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    HeaderCardsComponent,
    AvailablePetsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [HomeComponent,
     HeaderComponent,
     HeaderCardsComponent,
     AvailablePetsComponent
    ]

})
export class HomeModule { }
