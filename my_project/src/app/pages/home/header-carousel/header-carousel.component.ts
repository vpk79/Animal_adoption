import { AfterViewInit, Component, ElementRef,  OnInit,  ViewChild } from '@angular/core';

@Component({
  selector: 'app-header-carousel',
  templateUrl: './header-carousel.component.html',
  styleUrl: './header-carousel.component.css'
})
export class HeaderCarouselComponent implements  OnInit, AfterViewInit{
  @ViewChild('myCarousel') carousel!: any

  ngOnInit(): void {
    // this.reloadCarousel();
    // console.log(this.carousel);
    
  }

  ngAfterViewInit(): void {
    // this.reloadCarousel();
    // this.reloadCarousel();
    // console.log(this.carousel);
  }
  


  // reloadCarousel(): void {
  //   if (this.carousel) {
  //     this.carousel.next(2);
  // }
// }
}
