import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Service } from '../../services/service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Animals } from '../../../types/animals';
import { Observable, filter, switchMap, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserProfil } from '../../../types/users';
import { UserDataService } from '../../services/user-data.service';




@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})

export class GalleryComponent implements OnInit {

  userData$!: Observable<UserProfil | undefined>;
  choosedAnimal!: any;
  animalsData: Animals[] = [];
  animalData = {};
  likes: string = '';
  oldValue: number = 1;
  searchData: Animals[] = [];
  isLoggedIn = false;
  userData: Partial<UserProfil> = {};
  likedAnimalsArray: any[] = [];


  constructor(public service: Service,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userDataService: UserDataService) {
    this.route.params.subscribe(params => {
      this.ngOnInit();
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getAnimalsData(this.getAnimalChoice());
    });
  }

  toggleLikeError = false;

  form: FormGroup = new FormGroup({});



  showAlert() {
    this.toggleLikeError = true;
    setTimeout(() => {
      this.toggleLikeError = false;
    }, 6000);
  }

  ngOnInit(): void {


    this.service.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    this.form = this.fb.nonNullable.group({
      animalGender: ['', Validators.required],
      animalSize: ['', Validators.required],
      animalAge: ['', Validators.required]
    });

    

    this.userData$ = this.service.isLoggedIn$.pipe(
      filter(isLoggedIn => isLoggedIn),
      switchMap(() => this.userDataService.userData$)
    );

    // get animals liked by this user
    this.userData$.subscribe(data => {
      if (data !== undefined) {
        this.userData = data;
        this.likedAnimalsArray = Object.keys(data.animalLikes!);
        // console.log(data);
        // console.log(this.likedAnimalsArray);

      }
    });

  }


  //  Taking user animal choice from previous page
  getAnimalChoice() {
    this.route.queryParams.subscribe(params => {
      this.choosedAnimal = params['animalChoice'];
      // console.log(this.choosedAnimal); 
    });
    return this.choosedAnimal;
  }


  // Loading gallery data from database by url + user choice

  getAnimalsData(choice: string) {
    // console.log(choice);

    this.service.getItemsAsArray('/animals/' + choice).subscribe({
      next: (data: any) => {
        // console.log(data);

        this.animalsData = data.filter((x: any) => x.Status === 'Available');
        // console.log(this.animalsData);

      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  // Search animals in database

  onSubmit(): void {

    let animalGenderValue = this.form.get('animalGender')?.value;
    let animalSizeValue = this.form.get('animalSize')?.value;
    let animalAgeValue = this.form.get('animalAge')?.value;

    if (animalGenderValue != '') {


      this.service.getAnimalsDataByKeyAndValue('Sex', animalGenderValue, this.choosedAnimal).subscribe({
        next: (data: any) => {
          this.searchData = data;
          // console.log(this.searchData);

          if (animalSizeValue != '') {
            if (animalSizeValue == 'Small') { animalSizeValue = 'SMALL' }
            if (animalSizeValue == 'Medium') { animalSizeValue = 'MED' }
            if (animalSizeValue == 'Large') { animalSizeValue = 'LARGE' }
            this.searchData = this.searchData.filter(x => x.Size == animalSizeValue);
            // console.log(this.searchData);
          }

          if (animalAgeValue != '') {
            if (animalAgeValue == '1 year') { animalAgeValue = '1year' }
            if (animalAgeValue == '2 years') { animalAgeValue = '2year' }
            if (animalAgeValue == '3 years') { animalAgeValue = '3year' }
            if (animalAgeValue == '4 years') { animalAgeValue = '4year' }
            this.searchData = this.searchData.filter(x => x.Age == animalAgeValue);
            // console.log(this.searchData);
          }

          this.animalsData = this.searchData.filter(x => x.Status == 'Available');
          // console.log(this.animalsData);

        },
        error: (error) => {
          console.error(error);
        }
      });

    } else if (animalSizeValue != '') {
      if (animalSizeValue == 'Small') { animalSizeValue = 'SMALL' }
      if (animalSizeValue == 'Medium') { animalSizeValue = 'MED' }
      if (animalSizeValue == 'Large') { animalSizeValue = 'LARGE' }

      this.service.getAnimalsDataByKeyAndValue('Size', animalSizeValue, this.choosedAnimal).subscribe({
        next: (data: any) => {
          this.searchData = data;

          if (animalAgeValue != '') {
            if (animalAgeValue == '1 year') { animalAgeValue = '1year' }
            if (animalAgeValue == '2 years') { animalAgeValue = '2year' }
            if (animalAgeValue == '3 years') { animalAgeValue = '3year' }
            if (animalAgeValue == '4 years') { animalAgeValue = '4year' }
            this.searchData = this.searchData.filter(x => x.Age == animalAgeValue);
            console.log(this.searchData);
          }

          this.animalsData = this.searchData.filter(x => x.Status == 'Available');

        },
        error: (error) => {
          console.error(error);
        }
      });

    } else if (animalAgeValue != '') {
      if (animalAgeValue == '1 year') { animalAgeValue = '1year' }
      if (animalAgeValue == '2 years') { animalAgeValue = '2year' }
      if (animalAgeValue == '3 years') { animalAgeValue = '3year' }
      if (animalAgeValue == '4 years') { animalAgeValue = '4year' }
      this.service.getAnimalsDataByKeyAndValue('Age', animalAgeValue, this.choosedAnimal).subscribe({
        next: (data: any) => {
          this.searchData = data;
          this.animalsData = this.searchData.filter(x => x.Status == 'Available');
        },
        error: (error) => {
          console.error(error);
        }
      });

    } else {

      this.service.getItemsAsArray('/animals/' + this.choosedAnimal).subscribe({
        next: (data: any) => {
          this.animalsData = data.filter((x: any) => x.Status == 'Available');
          // console.log(this.animalsData);

        },
        error: (error) => {
          console.error(error);
        }
      });


    }

    // if (this.searchData.length > 0) {
    //   this.animalsData = this.searchData;
    //   console.log(this.animalsData);
    // }

  }


  // Load animal data
  getAnimalData(name: string): void {

    this.service.getItemsAsObject('/animals/' + this.choosedAnimal + "/" + name).subscribe({
      next: (data: any) => {
        this.animalData = data;
        // console.log(this.animalData);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }



  // Gallery likes functions

  updateLikes(event: Event, animal:Animals): void {
    event.stopImmediatePropagation();
    const userInfo = this.localStorageService.getItem('userInfo');
    if (animal.Liked == "0") {
      this.service.updateItemLikes('animals', this.choosedAnimal, animal.ID, "1");
      animal.Liked = '1';
      this.service.updateUserPropertyByValue('users', userInfo.userID, `animalLikes/${animal.ID}`, animal);
    } else {
      this.service.updateItemLikes('animals', this.choosedAnimal, animal.ID, "0");
      this.service.deleteUserProperty('users', userInfo.userID, 'animalLikes', animal.ID);
    }
  }

  // getLikes(name: string): Observable<any> {
  //   return this.service.getItemLikes('animals', this.choosedAnimal, name)
  // }
}
