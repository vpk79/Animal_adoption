import { unsubscribe } from 'diagnostics_channel';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit, OnDestroy{

  constructor(private route: ActivatedRoute){}
  animalType: string = '';
  animalID: string ='';
  animalChoice: any;


  ngOnInit(): void {
    //  Taking user animal choice from previous page
    this.animalChoice = this.route.queryParams.subscribe(params => {
      this.animalType = params['animalType'];
      this.animalID = params['animalID'];
      console.log(this.animalType, this.animalID);
    });
    
  }



  ngOnDestroy(): void {
    this.animalChoice.unsubscribe();
  }

}


