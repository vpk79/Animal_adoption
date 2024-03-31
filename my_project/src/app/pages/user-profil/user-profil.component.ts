import { ImageValidateService } from './../../services/image-validate.service';
import { Component } from '@angular/core';
import { Service } from '../../services/service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.css'
})


export class UserProfilComponent {
  toggle: boolean = true; 
  isVisible = false;

  imageUrl: string = 'https://firebasestorage.googleapis.com/v0/b/animaladoption-95397.appspot.com/o/main%2Fprofile%2Fprofile_pic?alt=media&token=1cc19d05-685a-4d03-9d9e-5aa6f2aa22d6';

  constructor(public service: Service, public imageValidateService: ImageValidateService){}

  uploadFile(event: any) {
    const file = event.target.files[0];
    const maxSizeInBytes = 1024 * 1024; // максимален размер в байтове (тук 1 MB)
    const maxWidth = 321; // максимална ширина на изображението
    const maxHeight = 321; // максимална височина на изображението
    
    this.imageValidateService.validateImage(file, maxSizeInBytes, maxWidth, maxHeight)
      .then(isValid => {
        if (isValid) {
          this.service.uploadFile(event, 'profile/', 'profile_pic').subscribe(
            downloadURL => {
              this.imageUrl = downloadURL; // Присвояване на URL адреса на каченото изображение
            },
            error => {
              console.error('Error uploading image:', error);
            }
          );
        } else {
          console.error('Image validation failed.');
        }
      })
      .catch(error => {
        console.error('Error validating image:', error);
      });
  }

  isDisabled(): boolean {
    this.isVisible = true;
    return this.toggle = false; 
  }
  
}
