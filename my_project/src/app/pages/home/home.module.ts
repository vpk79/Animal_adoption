import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { HeaderCardsComponent } from './header-cards/header-cards.component';



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    HeaderCardsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [HomeComponent, HeaderComponent]

})
export class HomeModule { }
