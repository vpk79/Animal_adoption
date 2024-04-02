import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { UserProfil } from '../../types/users';
import { Service } from './service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router, public service: Service) { }

  newUser: UserProfil = {
    'ID': '',
    'firstName': '',
    'lastName': '',
    'email': '',
    'phone': null,
    'age': null,
    'country': null,
    'city': null,
    'gender': '',
    'balance': null,
    'donation': null,
    'comentary': [],
    'liked_animals': [],
    'adopted_animals': []
  };

  // Login function

  login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fireauth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            const userID = user.uid;
            const userEmail = user.email;
          
            user.getIdToken().then(token => {
              const userToken = token;
              const logged = true;



              localStorage.setItem('userInfo', JSON.stringify({userID, userEmail, userToken, logged }));
            
            }).catch(err => {
              console.error('Error getting user token:', err);
            });

            resolve({ success: true }); 
          }
        })
        .catch(err => {
         
          reject({ success: false, code: err.code }); 
        });
    });
  }


  // Register function

  register(email: string, password: string, firstname: string, lastname: string, gender: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      
      const user = userCredential.user;

      
      if (user) {
        this.newUser.ID = user.uid;
        this.newUser.firstName = firstname;
        this.newUser.email = user.email!;
        this.newUser.balance = 5000;
        this.newUser.lastName = lastname;
        this.newUser.gender = gender;

        this.newUser.phone = null;
        this.newUser.age = null;
        this.newUser.country = null;
        this.newUser.city = null;
        this.newUser.donation = 0;
        this.newUser.comentary = [];
        this.newUser.liked_animals = [];
        this.newUser.adopted_animals = [];


        this.service.addItem('/users/', this.newUser);

        console.log('User ID:', user.uid);
        console.log('Email:', user.email);
       

        // user.getIdToken().then(token => {

        //   console.log('User Token:', token);
        //   
        // }).catch(err => {
        //   console.error('Error getting user token:', err);
        // });
      }

      alert('Registration Successful');
      this.router.navigate(['/home']);
    }).catch(err => {
      alert(err.message);
      this.router.navigate(['/home']);
    });
  }

  // Logout function

  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('userInfo');
      this.service.isLoggedIn = false;
      this.router.navigate(['/home']);
    }, err => {
      alert(err.message);
    })
  }

  async deleteAccount() {
    const user = await this.fireauth.currentUser;
    if (user) {
      try {
        await user.delete();
        console.log('User account deleted successfully.');
        // Изтрийте други асоциирани данни или извършете други действия след успешно изтриване на акаунта
      } catch (error) {
        console.error('Error deleting user account:', error);
      }
    } else {
      console.error('No user currently signed in.');
    }
  }





}

