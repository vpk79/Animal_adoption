import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Animals } from '../../../../types/animals';
import { Observable, filter, switchMap } from 'rxjs';
import { UserProfil } from '../../../../types/users';
import { Service } from '../../../services/service';
import { UserDataService } from '../../../services/user-data.service';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-owned-carousel',
  templateUrl: './owned-carousel.component.html',
  styleUrl: './owned-carousel.component.css'
})
export class OwnedCarouselComponent implements OnInit{

  showSection = false;
  isLoggedIn = false;
  userData: any = [];
  ownedAnimalsArray: [] = [];
  ownedAnimals: any = [];
  arrayOfSortedAnimals: any[] = [];
  userData$!: Observable<UserProfil | undefined>;

  @ViewChild('btnNext3') btnNext3!: ElementRef;
  animalsData: Animals[] = [];
  animalsDataArray: any[][] = [];
  animalData: Animals[] = [];

  constructor(private userDataService: UserDataService,
    private service: Service,
    private localStorageService: LocalStorageService, private renderer: Renderer2) { }

  ngOnInit(): void {
    

    this.service.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    this.userData$ = this.service.isLoggedIn$.pipe(
      filter(isLoggedIn => isLoggedIn),
      switchMap(() => this.userDataService.userData$)
    );


    this.userData$.subscribe(data => {
      if (data) {
        this.userData = data;
        this.ownedAnimalsArray = Object.values(this.userData.animalsOwned!) as []

        // console.log(this.ownedAnimalsArray);

        for (let i = 0; i < this.ownedAnimalsArray.length; i += 4) {
          this.ownedAnimals = [...this.ownedAnimals, this.ownedAnimalsArray.slice(i, i + 4)];
        }
        this.arrayOfSortedAnimals = [...this.ownedAnimals];
        if (this.arrayOfSortedAnimals.length > 0) {
          this.showSection = true;
        } else {
          this.showSection = false;
        }
        // console.log(this.arrayOfSortedAnimals);
        this.ownedAnimals = [];

        // console.log(data);
        // console.log(this.ownedAnimals);
      }
    });
  }



  // Load animal data
  getAnimalData(name: string, type: string): void {

    if (type == "Dog") {
      type = 'dogs'
    } else {
      type = 'cats';
    }

    this.service.getItemsAsObject('/animals/' + type + "/" + name).subscribe({
      next: (data: any) => {
        this.animalData = data;
        // console.log(this.animalData); 
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
