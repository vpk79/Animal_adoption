import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Service } from '../../services/service';
import { ActivatedRoute } from '@angular/router';
import { Animals } from '../../../types/animals';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})

export class GalleryComponent implements OnInit, AfterViewInit {

  choosedAnimal: string = '';
  animalsData: Animals[] = [];

  constructor(private service: Service, private route: ActivatedRoute) { }

  ngAfterViewInit() {

    // ...
  }

  ngOnInit(): void {

    // Loading gallery by user choice
    this.route.queryParams.subscribe(params => {
      this.choosedAnimal = params['animalChoice'];
      console.log(this.choosedAnimal); // Тук може да използвате стойността на променливата
    });

    // Loading data from database by url + user choice

    this.service.getItems('animals/' + this.choosedAnimal).subscribe({
      next: (data: any) => {
        this.animalsData = data;
        console.log(this.animalsData); // Тук ще видите върнатите данни
      },
      error: (error) => {
        console.error(error); // Ако има грешка при извличането на данните
      }
    });


    
  }

  // onSubmit() {
  //     this.service.addItem("Peter")
  //   }

  // upload(event: Event){
  //     this.service.uploadFile(event)
  //   }
}
