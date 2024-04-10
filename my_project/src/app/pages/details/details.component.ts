import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../services/service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private service: Service, private router: Router) { }
  animalType: string = '';
  animalID: string = '';
  animalChoice: any;
  animalData: any;


  ngOnInit(): void {


    //  Taking user animal choice from previous page
    this.animalChoice = this.route.queryParams.subscribe(params => {
      this.animalType = (params['animalType']);
      this.animalID = (params['animalID']);
      if (!this.animalType && !this.animalID) {
        this.router.navigate(['/error']);
      }

      this.getAnimalData(this.animalID, this.animalType);
      // console.log(this.animalType, this.animalID);

    });
  }

  getAnimalData(animalID: string, animalType: string) {
    console.log(animalID, animalType);

    let animalPath: string = animalType == 'Cat' ? 'cats' : 'dogs';
    this.animalData = this.service.getItemsAsObject(`/animals/${animalPath}/${animalID}`).subscribe(data => {
      this.animalData = data;
      console.log(this.animalData);

    })

  }

  adopt() {
    if (this.service.isLoggedIn$) {
      const type = this.animalData.type == 'Cat' ? 'cats' : 'dogs';
      const url: string = `animals/${type}`;
      const ID: string = this.animalData.ID;
      const property: string = 'Status';
      const newValue: string = 'Adopted';

      if (this.animalData.Status === 'Adopted') {
        console.log(`This ${this.animalData.Type} is already Adopted`);
        return;
      }
      this.service.updateUserProperty(url, ID, property, newValue);


      console.log(this.animalData);
      console.log(this.animalData.Status);


      // updateUserProperty(url: string, userID: string, property: string, newValue: any) {
      //   this.db.object(`/${url}/${userID}`).update({ [property]: newValue });
      // }






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


