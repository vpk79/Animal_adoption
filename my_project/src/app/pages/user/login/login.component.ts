import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('loginform') loginform!: ElementRef;

  // closeLogin() {
  //   if (this.loginform != null && this.loginform.nativeElement != null) {
  //     this.loginform.nativeElement.style.display = 'none';
  //   }
    
    
  //   // const loginDiv = document.getElementById('login-form');
  //   // console.log(loginDiv);

  //   // if (loginDiv != null) {
  //   //   loginDiv.style.display = 'none';
  //   //   console.log('wdddddd');
      
  //   // }
  // }
}
