import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { UserProfil } from '../../types/users';
import { Service } from './service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errorMessage: string = ' Please, fill all required fields!';
  errorStatus: boolean = false;

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


        this.service.updateUser('/users/', this.newUser.ID, this.newUser);

        // console.log('User ID:', user.uid);
        // console.log('Email:', user.email);
       

        // user.getIdToken().then(token => {

        //   console.log('User Token:', token);
        //   
        // }).catch(err => {
        //   console.error('Error getting user token:', err);
        // });
      }
      this.errorMessage = ' Registration Successful! Welcome to us!';
      this.login(email, password).then((result: any) => {
        if (result.success) {
          this.service.isLoggedIn = true;
          console.log('Login successful');
          setTimeout(() => {
          }, 1500);
        } else {
          console.error('Login error:', result.status);
        }
      })
      setTimeout(() => {
        this.service.toggleRegisterForm();
        this.router.navigate(['/home']);

      }, 1500);
      
    }).catch(err => {
      
      this.errorStatus = true;
      this.errorMessage = ' Registration FAILED! '
      if (err.message.includes('already in use')) {
        this.errorMessage += 'This email is aready in use!'
      } 
      setTimeout(() => {
        this.errorStatus = false;
        this.errorMessage =' Please, fill all required fields!';
      }, 4000);
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

      } catch (error) {
        console.error('Error deleting user account:', error);
      }
    } else {
      console.error('No user currently signed in.');
    }
  }
}

