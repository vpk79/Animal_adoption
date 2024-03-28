import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      alert('Login Successful');
      localStorage.setItem('token', 'true');
      this.router.navigate(['/home']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/home']);
    })
  }

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      alert('Registration Successful');
      this.router.navigate(['/home']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/home']);
    })
  }

  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/home']);
    }, err => {
      alert(err.message);
    })
  }
}
