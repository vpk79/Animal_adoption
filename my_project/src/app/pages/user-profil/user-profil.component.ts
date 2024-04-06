import { ImageValidateService } from './../../services/image-validate.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Service } from '../../services/service';
import { UserDataService } from '../../services/user-data.service';
import { UserProfil } from '../../../types/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.css'
})


export class UserProfilComponent implements OnInit, AfterViewInit {
  // @ViewChild('firstname')firstName!: ElementRef;
  // @ViewChild('lastname') lastName!: ElementRef;
  // @ViewChild('country') country!: ElementRef;
  // @ViewChild('city') city!: ElementRef;
  // @ViewChild('email') email!: ElementRef;
  // @ViewChild('phone') phone!: ElementRef;

  toggle: boolean = true;
  isVisible: boolean = false;
  toggleImgErr: boolean = false;
  userID: string = '';
  imageUrl: string = '';
  userName: string = '';
  userData: UserProfil[] = [];
  firstName: string = '';
  lastName: string | null = '';
  email: string = '';
  city: string | null = 'City';
  country: string | null = 'Country';
  phone: number | '' = 0;

  constructor(public service: Service, public imageValidateService: ImageValidateService, private userDataService: UserDataService,
     private fb: FormBuilder
    ) { }
  userData$!: Observable<UserProfil | undefined>;

  form: FormGroup = this.fb.group({});

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      country: ['',],
      city: ['',],
      phone: ['',]
    });


    this.userData$ = this.service.isLoggedIn$.pipe(
      filter(isLoggedIn => isLoggedIn),
      switchMap(() => this.userDataService.userData$)
    );
    


    // this.service.isLoggedIn$.pipe(
    //   filter(isLoggedIn => isLoggedIn), // филтрираме само когато потребителят е влязъл
    //   switchMap(() => this.userDataService.userData$) // превключваме към потока с данни за потребителя
    // ).subscribe((userData: UserProfil) => {
    //   // console.log(userData);

    //   this.userData = [userData];
    //   console.log(this.userData);

    //   this.email = userData.email;
    //   this.imageUrl = this.userData[0].profile_img!;
    //   this.firstName = this.userData[0].firstName;
    //   this.lastName = this.userData[0].lastName;
    //   this.city = this.userData[0].city;
    //   this.country = this.userData[0].country;
      
    //   this.phone = this.userData[0]?.phone || '';

    //   console.log(this.phone);
    //   console.log(this.email);
    // });

    // this.service.isLoggedIn$.subscribe(isLoggedIn => {
    //  if(isLoggedIn){
    //   setTimeout(() => {
    //     this.userID = this.userDataService.getUserID()!;
    //     this.userDataService.userData$.subscribe((userData: UserProfil) => {
    //       console.log(userData);
          
    //       this.userData = [userData];
    //       this.imageUrl = this.userData[0].profile_img!;
    //       this.firstName = this.userData[0].firstName;
    //       this.lastName = this.userData[0].lastName!;
    //       this.city = this.userData[0].city!;
    //       this.country = this.userData[0].country!;
    //       this.email = this.userData[0].email;
    //       this.phone = this.userData[0].phone!;

    //       console.log(this.phone);
    //       console.log(this.email);
          
          
    //     });
    //   }, 2200);
    //  }
    // })
    
    // this.firstName.nativeElement.placeholder = userData.firstName;
    // this.lastName.nativeElement.placeholder = userData.lastName;
    // this.country.nativeElement.placeholder = userData.country || 'Country:';
    // this.city.nativeElement.placeholder = userData.city || 'City:';
    // this.email.nativeElement.placeholder = userData.email;
    // this.phone.nativeElement.placeholder = userData.phone || 'Phone:';







  }

  ngAfterViewInit(): void {

  }

  onSubmit() {

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
