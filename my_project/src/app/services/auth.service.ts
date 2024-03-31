import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then((userCredential) => {
      // Вземете данните за текущия потребител
      const user = userCredential.user;

      // Проверка дали текущия потребител съществува
      if (user) {
        user.getIdToken().then(token => {
          console.log('User Token:', token);
          // Тук може да използвате токена по ваше усмотрение
        }).catch(err => {
          console.error('Error getting user token:', err);
        });
        
        console.log('User ID:', user.uid);
        console.log('Email:', user.email);
        // Други полета, които може да има в обекта User
      }

      alert('Login Successful');
      // localStorage.setItem('token', 'true');
      this.router.navigate(['/home']);
    }).catch(err => {
      alert(err.message);
      this.router.navigate(['/home']);
    });
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
