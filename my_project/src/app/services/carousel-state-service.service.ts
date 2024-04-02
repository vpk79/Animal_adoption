import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarouselStateServiceService {
  private carouselStates: { [carouselId: string]: any } = {};
  constructor() { }


  public saveCarouselState(carouselId: string, state: any): void {
    this.carouselStates[carouselId] = state;
  }

  public getCarouselState(carouselId: string): any {
    return this.carouselStates[carouselId];
  }
}
