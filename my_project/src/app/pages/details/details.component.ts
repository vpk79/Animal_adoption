import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../services/service';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserDataService } from '../../services/user-data.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
    private service: Service,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userDataService: UserDataService) { }

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
      const type = this.animalData.Type == 'Cat' ? 'cats' : 'dogs';
      const url: string = `animals/${type}`;
      const animalID: string = this.animalData.ID;
      const property: string = 'Status';
      const newValue: string = 'Adopted';

      if (this.animalData.Status === 'Adopted') {
        console.log(`This ${this.animalData.Type} is already Adopted`);
        return;
      }

      // check if user have enough money in his balance
      let userID!: string;
      let userBalance!: number;
      const animalPrice = Number(this.animalData.Price);
      this.userDataService.userData$.subscribe(data => {
        userID = data.ID;
        userBalance = data.balance;
        // console.log(userBalance);
      });
      
      if(userBalance < animalPrice){
        console.log('Sorry, you have not enough money in your account balance!');
        return;
      }

      // update animal status
      this.service.updateUserProperty(url, animalID, property, newValue);

      // add buyed animal in user database

      this.animalData.Status = 'Adopted';
      this.service.updateUserProperty('users', `${userID}/animalsOwned`, animalID, this.animalData);

      // update user balance 
      const newUserBalance = userBalance - animalPrice;
      this.service.updateUserProperty('users', userID, 'balance', newUserBalance);

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


