import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Service } from '../../services/service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})

export class GalleryComponent implements OnInit, AfterViewInit {

  choosedAnimal: string = '';

  constructor(private service: Service, private route: ActivatedRoute) { }

  ngAfterViewInit() {

    // ...
  }

  ngOnInit(): void {

    this.service.getItems().subscribe({
      next: (data) => {
        console.log(data); // Тук ще видите върнатите данни
      },
      error: (error) => {
        console.error(error); // Ако има грешка при извличането на данните
      }
    });


    this.route.queryParams.subscribe(params => {
      this.choosedAnimal = params['animalChoice'];
      console.log(this.choosedAnimal); // Тук може да използвате стойността на променливата
    });
  }

  // onSubmit() {
  //     this.service.addItem("Peter")
  //   }

  // upload(event: Event){
  //     this.service.uploadFile(event)
  //   }
}
