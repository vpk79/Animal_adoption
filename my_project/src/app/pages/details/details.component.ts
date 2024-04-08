import { unsubscribe } from 'diagnostics_channel';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Observer, map } from 'rxjs';
import { Service } from '../../services/service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private service: Service) { }
  animalType: string = '';
  animalID: string = '';
  animalChoice: any;
  animalData: any;


  ngOnInit(): void {

    
    //  Taking user animal choice from previous page
    this.animalChoice = this.route.queryParams.subscribe(params => {
      this.animalType = (params['animalType']);
      this.animalID = (params['animalID']);
      this.getAnimalData(this.animalID, this.animalType);
      // console.log(this.animalType, this.animalID);
    });
  }

  getAnimalData(animalID: string, animalType: string) {
    let animalPath: string = animalType == 'Cat' ? 'cats' : 'dogs';
    this.animalData = this.service.getItemsAsObject(`/animals/${animalPath}/${animalID}`).subscribe(data => {
      this.animalData = data;
    })

  }

  adopt(){
    if (this.service.isLoggedIn$){
      console.log('adopted');
    } else {
      console.log('not adopted');
      
    }
  }


ngOnDestroy(): void {
  this.animalChoice.unsubscribe();
  // this.animalData.unsubscribe();
}

}


