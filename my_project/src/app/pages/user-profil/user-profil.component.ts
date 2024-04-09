import { LocalStorageService } from './../../services/local-storage.service';
import { ImageValidateService } from './../../services/image-validate.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, isDevMode } from '@angular/core';
import { Service } from '../../services/service';
import { UserDataService } from '../../services/user-data.service';
import { UserProfil } from '../../../types/users';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, filter, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.css'
})


export class UserProfilComponent implements OnInit {

  toggle: boolean = true;
  isVisible: boolean = false;
  toggleImgErr: boolean = false;
  userID: string = '';
  imageUrl: string = '';
  userName: string = '';
  userData: Partial<UserProfil> = {};
  firstName: string = '';
  lastName: string | null = '';
  email: string = '';
  city: string | null = 'City';
  country: string | null = 'Country';
  phone: number | '' = 0;
  submitted: boolean = false;
  isEditErrorVisible = false;
  isSuccess = false;
 

  constructor(public service: Service, public imageValidateService: ImageValidateService, private userDataService: UserDataService,
    private fb: FormBuilder, private authService: AuthService, private localStorageService: LocalStorageService
  ) { }
  userData$!: Observable<UserProfil | undefined>;

  form: FormGroup = this.fb.group({});



  ngOnInit(): void {
    this.form = this.fb.group({
      email: { value: '', disabled: true },
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]],
      country: ['', [Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[a-zA-Z]+$')]],
      city: ['', [Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[a-zA-Z\s]+$')]],
      phone: ['', [Validators.pattern(/^\d{8,18}$/)]]
    });


    this.userData$ = this.service.isLoggedIn$.pipe(
      filter(isLoggedIn => isLoggedIn),
      switchMap(() => this.userDataService.userData$)
    );

    this.userDataService.userData$.subscribe(data => {
      this.userData = data;
    })


    this.userDataService.userData$.subscribe(userData => {
      if (userData) {
        // Задаване на стойности на input полетата
        this.form.patchValue({
          firstname: userData.firstName || '',
          lastname: userData.lastName || '',
          country: userData.country || '',
          city: userData.city || '',
          email: userData.email || '',
          phone: userData.phone || ''
        });
      }
    });

    

  }

  // nameValidator(control: FormControl): { [key: string]: any } | null {
  //   const namePattern = /^[a-zA-Z]+$/;

  //   if (control.value && !namePattern.test(control.value)) {
  //     return { 'invalidName': true };
  //   }
  //   return null;
  // }

 


  onSubmit() {
    this.submitted = true

    if (!this.form) {
      return;
    }

    if (this.form.invalid) {
      // this.markFormGroupTouched(this.form);
      // console.log('form is invalid');
      return;
    }

    // const emailValue = this.form.get('email')?.value;

    

    const firstnameValue = this.form.get('firstname')?.value;
    const lastnameValue = this.form.get('lastname')?.value;
    const countryValue = this.form.get('country')?.value;
    const cityValue = this.form.get('city')?.value;
    const phoneValue = this.form.get('phone')?.value;


    const updateUser: Partial<UserProfil> = {};
    updateUser.firstName = firstnameValue.trim() || this.userData.firstName;
    updateUser.lastName = lastnameValue.trim() || this.userData.lastName;
    countryValue.trim() ? updateUser.country = countryValue.trim() : this.userData.country;
    cityValue.trim() ? updateUser.city = cityValue.trim() : this.userData.city;
    phoneValue ? updateUser.phone = phoneValue : this.userData.phone;

    const userInfo = this.localStorageService.getItem('userInfo');

    // console.log(this.userData);


    // console.log(updateUser);

    try {
      this.service.updateDatabaseAsObject('users', userInfo.userID, updateUser)
        .then(() => {
          this.isSuccess = true;
          this.toggleEditError();
          // console.log('Update successful');
        })
        .catch(error => {
          // console.error('Error updating database:', error);
          // Обработка на грешката тук
          this.isSuccess = false;
          this.toggleEditError();
        });
    } catch (error) {
      this.isSuccess = false;
      this.toggleEditError();

      // console.error('Error updating database:', error);
      // Обработка на грешката тук
    }

    this.isDisabled();
  }





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
      console.error('Invalid file format. Please select an image file.');
    }

  }

  toggleEditError() {
    this.isEditErrorVisible = !this.isEditErrorVisible;
    setTimeout(() => {
      this.isEditErrorVisible = !this.isEditErrorVisible;
    }, 4000);
  }


  // toggle save button
  isDisabled(): void {
    
    this.isVisible = !this.isVisible;
  }
  // form fields
  enableForm() {
  this.isVisible = true;
  }

}
