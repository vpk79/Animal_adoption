import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit{

  constructor(private service: ServiceService){ }

  ngOnInit(): void {
    this.service.getItems().subscribe({
      next:(data) => {
        console.log(data);
      }
    })

  }

  onSubmit() {
    this.service.addItem("Peter")
  }

  upload(event: Event){
    this.service.uploadFile(event)
  }

}
