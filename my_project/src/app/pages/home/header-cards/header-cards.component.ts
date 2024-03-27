import { Component } from '@angular/core';

@Component({
  selector: 'app-header-cards',
  templateUrl: './header-cards.component.html',
  styleUrl: './header-cards.component.css'
})
export class HeaderCardsComponent {
  dogs: string = "dogs";
  cats: string = "cats";
}
