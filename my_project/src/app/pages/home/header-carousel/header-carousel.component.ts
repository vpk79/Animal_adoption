import { AfterViewInit, Component, ElementRef,  OnInit,  Renderer2,  ViewChild } from '@angular/core';

@Component({
  selector: 'app-header-carousel',
  templateUrl: './header-carousel.component.html',
  styleUrl: './header-carousel.component.css'
})
export class HeaderCarouselComponent implements  OnInit{
  @ViewChild('btnNext') btnNext!: ElementRef;

  constructor(private renderer: Renderer2){}

  ngOnInit(): void {
    setTimeout(() => {
      if (this.btnNext) {
        this.renderer.selectRootElement(this.btnNext.nativeElement).click();
      }
    }, 2500);
  }

}
