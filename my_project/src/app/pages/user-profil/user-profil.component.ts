import { Subscription } from 'rxjs';
import { LocalStorageService } from './../../services/local-storage.service';
import { ImageValidateService } from './../../services/image-validate.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Service } from '../../services/service';
import { UserDataService } from '../../services/user-data.service';
import { UserProfil } from '../../../types/users';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.css'
})


export class UserProfilComponent implements OnInit {
  @ViewChild('firstname')firstName!: ElementRef;
  @ViewChild('lastname') lastName!: ElementRef;
  @ViewChild('country') country!: ElementRef;
  @ViewChild('city') city!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('phone') phone!: ElementRef;

  toggle: boolean = true;
  isVisible: boolean = false;
  toggleImgErr: boolean = false;
  userID: string = '';
  imageUrl: string = '';
  userName: string = '';
  

  constructor(public service: Service, public imageValidateService: ImageValidateService, 
    private userDataService: UserDataService) { }


  ngOnInit(): void {

    this.service.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn == true) {
        setTimeout(() => {
          this.userID = this.userDataService.getUserID()!;
          this.userDataService.userData$.subscribe((userData: UserProfil) => {
            this.imageUrl = userData.profile_img!;
            this.userName = userData.firstName;

            this.firstName.nativeElement.placeholder = userData.firstName;
            this.lastName.nativeElement.placeholder = userData.lastName;
            this.country.nativeElement.placeholder = userData.country || 'Country:';
            this.city.nativeElement.placeholder = userData.city || 'City:';
            this.email.nativeElement.placeholder = userData.email;
            this.phone.nativeElement.placeholder = userData.phone || 'Phone:';

          });

        }, 1200);

      }
    });
    
  }

  // imageUrl: string = 'https://firebasestorage.googleapis.com/v0/b/animaladoption-95397.appspot.com/o/main%2Fprofile%2Fprofile_pic?alt=media&token=1cc19d05-685a-4d03-9d9e-5aa6f2aa22d6';


  uploadFile(event: any) {
    const file = event.target.files[0];
    const maxSizeInBytes = 1024 * 1024; // максимален размер в байтове (тук 1 MB)
    const maxWidth = 321; // максимална ширина на изображението
    const maxHeight = 321; // максимална височина на изображението
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']; // Масив с разрешени MIME типове
    const files = event.target.files;
    if (files.length === 0) {
      // Не е избран файл за качване
      return;
    }
    if (file && allowedTypes.includes(file.type)) {

      this.imageValidateService.validateImage(file, maxSizeInBytes, maxWidth, maxHeight)
        .then(isValid => {
          if (isValid) {
            this.service.uploadFile(event, 'userProfileImg/' + this.userID, '/profile_pic').subscribe(
              downloadURL => {
                this.imageUrl = downloadURL; // Присвояване на URL адреса на каченото изображение
                this.service.updateUserProperty('users', this.userID, 'profile_img', downloadURL);
              },
              error => {
                this.toggleImgErr = true;
                setTimeout(() => {
                  this.toggleImgErr = false;
                }, 5000);
                console.error('Error uploading image:', error);
              }
            );
          } else {
            this.toggleImgErr = true;
            setTimeout(() => {
              this.toggleImgErr = false;
            }, 5000);
            console.error('Image validation failed.');
          }
        })
        .catch(error => {
          this.toggleImgErr = true;
          setTimeout(() => {
            this.toggleImgErr = false;
          }, 5000);
          console.error('Error validating image:', error);
        });

    } else {

      this.toggleImgErr = true;
      setTimeout(() => {
        this.toggleImgErr = false;
      }, 5000);
      // Файлът не е снимка или е в непозволен формат
      console.error('Invalid file format. Please select an image file.');
    }

  }


  // toggle save button
  isDisabled(): boolean {
    this.isVisible = true;
    return this.toggle = false;
  }

}
