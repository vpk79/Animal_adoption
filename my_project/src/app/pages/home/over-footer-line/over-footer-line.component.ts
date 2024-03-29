import { Component } from '@angular/core';
import { Service } from '../../../services/service';

@Component({
  selector: 'app-over-footer-line',
  templateUrl: './over-footer-line.component.html',
  styleUrl: './over-footer-line.component.css'
})
export class OverFooterLineComponent {
  constructor(public service: Service){

  }
}
