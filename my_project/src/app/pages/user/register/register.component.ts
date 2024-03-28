import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  closeRegister() {
    const loginDiv = document.getElementById('signup-form');
    if (loginDiv != null) {
      loginDiv.style.display = 'none';
    }

  }

}
