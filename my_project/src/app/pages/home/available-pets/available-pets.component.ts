import { Service } from './../../../services/service';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Animals } from '../../../../types/animals';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-available-pets',
  templateUrl: './available-pets.component.html',
  styleUrl: './available-pets.component.css'
})
export class AvailablePetsComponent implements OnInit{
  isLoggedIn = false;
  constructor(public service: Service, private cdr: ChangeDetectorRef, private renderer: Renderer2, private localStorageService: LocalStorageService) { }
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

  ngOnInit(): void {
    this.service.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    setTimeout(() => {
      if (this.btnNext3) {
        this.renderer.selectRootElement(this.btnNext3.nativeElement).click();
      }
    }, 2500);


    this.service.getAnimalsDataByStatus('Available').subscribe({   // Could be 'Reserved' or 'Available'
      next: (data: any) => {
        //  this.animalsData = data;
        for (let i = 0; i < data.length; i += 4) {
          this.animalsDataArray.push(data.slice(i, i + 4));
        }
        //  console.log(this.animalsDataArray);
      }
    });
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
    if(animalCard.Liked == 1) {
      
      this.service.updateUserLikedAnimals(userInfo.userID, animalCard.ID, animalCard.Name)
    } else {
      this.service.deleteUserProperty('users', userInfo.userID, 'animalLikes', animalCard.ID);
    }
  }

}
