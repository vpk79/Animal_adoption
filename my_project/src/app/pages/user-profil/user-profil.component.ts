import { Component } from '@angular/core';
import { Service } from '../../services/service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.css'
})
export class UserProfilComponent {
  constructor(public service: Service){}

  upload(event: Event) {
    this.service.uploadFile(event, 'profile/')
  }
}
