import { Subscription } from 'rxjs';
import { LocalStorageService } from './../../services/local-storage.service';
import { ImageValidateService } from './../../services/image-validate.service';
import { Component, OnInit } from '@angular/core';
import { Service } from '../../services/service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.css'
})


export class UserProfilComponent implements OnInit {
  toggle: boolean = true;
  isVisible: boolean = false;
  toggleImgErr: boolean = false;
  userID: string = ''
  imageUrl: any;

  ngOnInit(): void {

    if (this.service.isLoggedIn == true) {
      const userInfo = this.localStorage.getItem('userInfo');
      this.userID = userInfo.userID;

      this.service.getUserProperty('users', this.userID, 'profile_img').subscribe({
        next: (data) => {
          console.log(data); // Тук получавате данните от базата данни
          // return data;
           this.imageUrl = data;
        },
        error: (error) => {
          console.error('Error fetching user property:', error);
        }
      });

      // console.log(this.imageUrl);
      
    }
  }

  // imageUrl: string = 'https://firebasestorage.googleapis.com/v0/b/animaladoption-95397.appspot.com/o/main%2Fprofile%2Fprofile_pic?alt=media&token=1cc19d05-685a-4d03-9d9e-5aa6f2aa22d6';

  constructor(public service: Service, public imageValidateService: ImageValidateService, private localStorage: LocalStorageService) { }

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
            this.service.uploadFile(event, 'userProfileImg/' + this.userID, +'/' + 'profile_pic').subscribe(
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
