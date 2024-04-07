import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild, Renderer2, SimpleChanges } from '@angular/core';
import { UserDataService } from '../../../services/user-data.service';
import { Observable, delay, filter, switchMap } from 'rxjs';
import { UserProfil } from '../../../../types/users';
import { Service } from '../../../services/service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Animals } from '../../../../types/animals';

@Component({
  selector: 'app-liked-carousel',
  templateUrl: './liked-carousel.component.html',
  styleUrl: './liked-carousel.component.css'
})
export class LikedCarouselComponent implements OnInit{
  
  showSection = false;
  isLoggedIn = false;
  userData: any = [];
  likedAnimalsArray: [] = [];
  likedAnimals: any = [];
  arrayOfSortedAnimals: any[]=[];
  userData$!: Observable<UserProfil | undefined>;
  
  @ViewChild('btnNext3') btnNext3!: ElementRef;
  animalsData: Animals[] = [];
  animalsDataArray: any[][] = [];
  animalData: Animals[] = [];

  toggleLikeError = false;

  showAlert() {
    this.toggleLikeError = true;
    setTimeout(() => {
      this.toggleLikeError = false;
    }, 6000);
  }

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
        this.likedAnimalsArray = Object.values(this.userData.animalLikes!) as []
        
        console.log(this.likedAnimalsArray);
        
        for (let i = 0; i < this.likedAnimalsArray.length; i += 4) {
          this.likedAnimals = [...this.likedAnimals,this.likedAnimalsArray.slice(i, i + 4)];
        }
        this.arrayOfSortedAnimals = [...this.likedAnimals];
        if(this.arrayOfSortedAnimals.length > 0) {
          this.showSection = true;
        }
        console.log(this.arrayOfSortedAnimals);
        this.likedAnimals = [];
        
        // console.log(data);
        // console.log(this.likedAnimals);
      }
    });

    // this.userDataService.userData$.subscribe(data => {
    //   if (data) { // Проверяваме дали има данни и дали има поне един елемент в масива


    //     if(data){
    //       this.userData = data;
    //       this.likedAnimals = Object.values(data.animalLikes)
    //     }

    //     // console.log(this.userData);
    //     // console.log(this.likedAnimals);

    //   }
    //   // console.log(this.userData);
    // });
    // setTimeout(() => {
    //   if (this.btnNext3) {
    //     this.renderer.selectRootElement(this.btnNext3.nativeElement).click();
    //   }
    // }, 2500);


  }

  



  updateLikes(event: Event, ID: string, liked: string, type: string): void {
    // event.stopImmediatePropagation();
    if (type == "Dog") {
      type = 'dogs'
    } else {
      type = 'cats';
    }

    if (liked == "0") {
      this.service.updateItemLikes('animals', type, ID, "1");
    } else {
      this.service.updateItemLikes('animals', type, ID, "0");
    }
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

  toggleLike(event: MouseEvent, animalCard: any): void {
    this.updateLikes(event, animalCard.ID, animalCard.Liked, animalCard.Type)
    animalCard.Liked = (animalCard.Liked === '1') ? '0' : '1';
    // console.log('liked');
    const userInfo = this.localStorageService.getItem('userInfo');
    if (animalCard.Liked == 1) {

      // this.service.updateUserLikedAnimals(userInfo.userID, animalCard.ID, animalCard.Name);
      this.service.updateUserPropertyByValue('users', userInfo.userID, `animalLikes/${animalCard.ID}`, animalCard);
    } else {
      this.service.deleteUserProperty('users', userInfo.userID, 'animalLikes', animalCard.ID);
      if(this.animalsDataArray.length == 0) {
        this.showSection = false;
      }
    }
  }


}
