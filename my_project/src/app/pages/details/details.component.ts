import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../services/service';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserDataService } from '../../services/user-data.service';
import { Subscription, timeout } from 'rxjs';
import { Animals } from '../../../types/animals';
import { time } from 'console';


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
  animalChoice!: Subscription;
  animalData!: any;
  animalDataSubs!: Subscription
  isConfirmToggled: boolean = false;
  isErrorToggled: boolean = false;
  errorMsg: string = '';

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
    // console.log(animalID, animalType);

    let animalPath: string = animalType == 'Cat' ? 'cats' : 'dogs';
    this.animalDataSubs = this.service.getItemsAsObject(`/animals/${animalPath}/${animalID}`).subscribe(data => {
      this.animalData = data;
      // console.log(this.animalData);

    })

  }

  adopt() {
    if (this.service.isLoggedIn$) {
      const type = this.animalData.Type == 'Cat' ? 'cats' : 'dogs';
      const url: string = `animals/${type}`;
      const animalID: string = this.animalData.ID;
      const property: string = 'Status';
      const newValue: string = 'Adopted';
      this.toggleConfirm();

      if (this.animalData.Status === 'Adopted') {
        this.toggleError(`This ${this.animalData.Type} is already Adopted!`)
        // console.log(`This ${this.animalData.Type} is already Adopted!`);
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

      if (userBalance < animalPrice) {
        this.toggleError('You don`t have enough money!')
        // console.log('Sorry, you have not enough money in your account balance!');
        return;
      }

      // update animal status
      if(url && animalID && property && newValue){
        this.service.updateUserProperty(url, animalID, property, newValue);
      } else {
        this.toggleError('Error! Something went wrong!');
        return;
      }
      

      // add buyed animal in user database

      this.animalData.Status = 'Adopted';
      if(userID && animalID && this.animalData){
        this.service.updateUserProperty('users', `${userID}/animalsOwned`, animalID, this.animalData);
      } else {
        this.toggleError('Error! Something went wrong!');
        return;
      }
      

      // update user balance 
      const newUserBalance = userBalance - animalPrice;
      if(userID && newUserBalance){
        this.service.updateUserProperty('users', userID, 'balance', newUserBalance);
      } else {
        this.toggleError('Error! Something went wrong!');
        return;
      }
      

      this.toggleError(`Congratulations! This ${this.animalType} is now yours!`);

      // console.log('adopted');
    } else {
      // console.log('not adopted');

    }
  }


  toggleError(msg: string) {
    this.isErrorToggled = !this.isErrorToggled;
    this.errorMsg = msg;
    setTimeout(() => {
      this.isErrorToggled = !this.isErrorToggled;
    }, 4500);
  }

  toggleConfirm() {
    this.isConfirmToggled = !this.isConfirmToggled
  }


  ngOnDestroy(): void {
    this.animalChoice.unsubscribe();
    // this.animalData.unsubscribe();
  }

}


