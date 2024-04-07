import { AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import { UserDataService } from '../../../services/user-data.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-liked-carousel',
  templateUrl: './liked-carousel.component.html',
  styleUrl: './liked-carousel.component.css'
})
export class LikedCarouselComponent implements OnInit{
  userData: any = [];
  likedAnimals: any = [];

constructor(private userDataService: UserDataService){}

  ngOnInit(): void {

  
    
    this.userDataService.userData$.subscribe(data => {
      if (data) { // Проверяваме дали има данни и дали има поне един елемент в масива
      
        this.userData = data;
        this.likedAnimals = Object.values(this.userData.animalLikes)
        // console.log(this.userData);
        // console.log(this.likedAnimals);
        
      }
      // console.log(this.userData);
    });


  }

  getObjectKeys() {
    return Object.keys(this.userData);
  }

  getObjectValue(key: string) {
    // console.log(this.userData[key]);
    
    return this.userData[key];
  }

  
}
