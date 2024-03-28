import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Service } from '../../services/service';
import { ActivatedRoute } from '@angular/router';
import { Animals } from '../../../types/animals';
import { Observable, tap } from 'rxjs';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})

export class GalleryComponent implements OnInit, AfterViewInit {

  choosedAnimal: string = '';
  animalsData: Animals[] = [];
  animalData = {};
  likes: string = '';
  oldValue: number = 1;


  constructor(private service: Service, private route: ActivatedRoute) { }



  ngAfterViewInit() {

    // ...
  }

  ngOnInit(): void {

    if (this.oldValue == 1) {
      this.oldValue = 0
    } else {
      this.oldValue = 1;
    }

    // Loading gallery by user choice
    this.route.queryParams.subscribe(params => {
      this.choosedAnimal = params['animalChoice'];
      console.log(this.choosedAnimal); // Тук може да използвате стойността на променливата
    });


    // Loading data from database by url + user choice

    this.service.getItemsAsArray('animals/' + this.choosedAnimal).subscribe({
      next: (data: any) => {
        this.animalsData = data;
        console.log(this.animalsData); // Тук ще видите върнатите данни
      },
      error: (error) => {
        console.error(error); // Ако има грешка при извличането на данните
      }
    });
  }


  // Load animal data
  getAnimalData(name: string): any {

    this.service.getItemsAsObject('/animals/' + this.choosedAnimal + "/" + name).subscribe({
      next: (data: any) => {
        this.animalData = data;
        // console.log(this.animalData); // Тук ще видите върнатите данни
      },
      error: (error) => {
        console.error(error); // Ако има грешка при извличането на данните
      }
    });
  }

  updateLikes(event: Event, name: string, liked: string): void {
    event.stopImmediatePropagation();
    
    if(liked == "0") {
      this.service.updateItemLikes('animals', this.choosedAnimal, name, "1");
    } else {
      this.service.updateItemLikes('animals', this.choosedAnimal, name, "0");
    }

    // this.getLikes(name).subscribe({
    //   next: (data: any) => {
    //     data = Number(data);
    //     let newValue: string;
    //     if (data != 0) {
    //       newValue = "0";
    //     } else {
    //       newValue = "1";
    //     }
    //     this.service.updateItemLikes('animals', this.choosedAnimal, name, newValue);
    //     return;
    //   },
    //   error: (error) => {
    //     console.error('Error:', error);
    //   }
    // });
  }

  getLikes(name: string): Observable<any> {
    return this.service.getItemLikes('animals', this.choosedAnimal, name)
  }

  // onSubmit() {
  //     this.service.addItem("Peter")
  //   }

  // upload(event: Event){
  //     this.service.uploadFile(event)
  //   }
}
