import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../services/service.service';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})

export class GalleryComponent implements OnInit, AfterViewInit{

  
  constructor(private service: ServiceService){ }

  ngAfterViewInit() {
  
    // ...
  }

  ngOnInit(): void {

    // this.service.getItems().subscribe({
    //   next: (data) => {
    //     console.log(data); // Тук ще видите върнатите данни
    //   },
    //   error: (error) => {
    //     console.error(error); // Ако има грешка при извличането на данните
    //   }
    // });
    
    // this.service.getItems().subscribe({
    //   next:(data) => {
    //     console.log(data);
    //   }
    // })
    // console.log(this.service.getItems())

  }

  onSubmit() {
    this.service.addItem("Peter")
  }

  upload(event: Event){
    this.service.uploadFile(event)
  }

}
