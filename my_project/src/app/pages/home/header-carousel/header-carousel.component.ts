import { AfterViewInit, Component, ElementRef,  OnInit,  ViewChild } from '@angular/core';

@Component({
  selector: 'app-header-carousel',
  templateUrl: './header-carousel.component.html',
  styleUrl: './header-carousel.component.css'
})
export class HeaderCarouselComponent implements  OnInit, AfterViewInit{
  @ViewChild('myCarousel') carousel!: ElementRef<HTMLDivElement>;
  

  ngOnInit(): void {
    // this.reloadCarousel();
    // console.log(this.carousel);
    
  }

  ngAfterViewInit(): void {
   
    // this.reloadCarousel();
    // console.log(this.carousel);
  }
  


  // reloadCarousel(): void {
  //   if (this.carousel) {
  //     this.carousel.nativeElement.dataset['bsRide'] = 'false';
  //     this.carousel.nativeElement.dataset['bsRide'] = 'carousel';
      
     
  //     console.log('Carousel reloaded.');
  //   } else {
  //     console.error('Carousel element not found.');
  //   }
  // }
}
