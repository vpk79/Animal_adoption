import { Component } from '@angular/core';
import { Animals } from '../../../../types/animals';

@Component({
  selector: 'app-available-pets',
  templateUrl: './available-pets.component.html',
  styleUrl: './available-pets.component.css'
})
export class AvailablePetsComponent {
  animalsData: Animals[] = [];

}
