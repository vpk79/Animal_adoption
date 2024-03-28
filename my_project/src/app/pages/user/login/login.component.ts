import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  openLogin(){
    const loginDiv = document.getElementById('loginModal');
    if(loginDiv != null ){
      loginDiv.style.display = 'block';
    }
   
  }

  closeLogin() {
    const loginDiv = document.getElementById('loginModal');
    if (loginDiv != null) {
      loginDiv.style.display = 'none';
    }

  }

}
