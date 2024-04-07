import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { UserProfil } from '../../types/users';
import { Service } from './service';
import { UserDataService } from './user-data.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  defaultProfileImg = 'https://firebasestorage.googleapis.com/v0/b/animaladoption-95397.appspot.com/o/main%2Fprofile%2Fuser_profile?alt=media&token=be227233-2374-4bcc-ad6f-1bdc02f405ec';
  errorMessage: string = ' Please, fill all required fields!';
  errorStatus: boolean = false;

  constructor(private fireauth: AngularFireAuth, private router: Router, public service: Service, public userDataService: UserDataService, public localStorageService: LocalStorageService) { }

  newUser: UserProfil[] = [];

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
              const userObject = { userID, userEmail, userToken, logged }

              this.localStorageService.setItem('userInfo', userObject );

              this.userDataService.getOneUserAsObject(userID).subscribe((userData: any) => {
                // console.log(userData);
                this.userDataService.setUserData(userData);
              });

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
        this.newUser[0].ID = user.uid;
        this.newUser[0].firstName = firstname;
        this.newUser[0].email = user.email!;
        this.newUser[0].balance = 5000;
        this.newUser[0].lastName = lastname;
        this.newUser[0].gender = gender;

        this.newUser[0].phone = null;
        this.newUser[0].age = null;
        this.newUser[0].country = null;
        this.newUser[0].city = null;
        this.newUser[0].donation = 0;
        this.newUser[0].comentary = [];
        this.newUser[0].animalLikes = [];
        this.newUser[0].adopted_animals = [];


        this.service.updateDatabaseAsObject('users', this.newUser[0].ID, this.newUser[0]);

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
          this.service.loggedIn();
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
      localStorage.clear();
      this.service.loggedOut();
      this.userDataService.changeUserDataProperty('profile_img', this.defaultProfileImg)
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

