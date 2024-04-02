import { Component } from '@angular/core';
import { Service } from '../../../services/service';

@Component({
  selector: 'app-welcome-msg',
  templateUrl: './welcome-msg.component.html',
  styleUrl: './welcome-msg.component.css'
})
export class WelcomeMsgComponent {
  constructor(public service: Service){}
}
