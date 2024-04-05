import { Service } from './../../../services/service';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Animals } from '../../../../types/animals';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-available-pets',
  templateUrl: './available-pets.component.html',
  styleUrl: './available-pets.component.css'
})
export class AvailablePetsComponent implements OnInit{

  constructor(public service: Service, private cdr: ChangeDetectorRef, private renderer: Renderer2) { }
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

  updateLikes(event: Event, name: string, liked: string, type: string): void {
    // event.stopImmediatePropagation();
    if (type == "Dog") {
      type = 'dogs'
    } else {
      type = 'cats';
    }

    if (liked == "0") {
      this.service.updateItemLikes('animals', type, name, "1");
    } else {
      this.service.updateItemLikes('animals', type, name, "0");
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
    this.updateLikes(event, animalCard.Name, animalCard.Liked, animalCard.Type)
    animalCard.Liked = (animalCard.Liked === '1') ? '0' : '1';
  }
}
