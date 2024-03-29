import { Service } from './../../../services/service';
import { Component, OnInit } from '@angular/core';
import { Animals } from '../../../../types/animals';

@Component({
  selector: 'app-available-pets',
  templateUrl: './available-pets.component.html',
  styleUrl: './available-pets.component.css'
})
export class AvailablePetsComponent implements OnInit{

  constructor(private service: Service){ }

  animalsData: Animals[] = [];
  animalsDataArray: any[][] = [];
  

  ngOnInit(): void {

    this.service.getAnimalsDataByStatus('Available').subscribe({   // Could be 'Reserved' or 'Available'
      next: (data:any) => {
      //  this.animalsData = data;
        for (let i = 0; i < data.length; i += 4) {
          this.animalsDataArray.push(data.slice(i, i + 4));
        }
       console.log(this.animalsDataArray);
      }
    });



    
    

    // this.service.getItemsAsArray('/animals/').subscribe({
    //   next: (data: any) => {
        
    //     data.forEach((x: { [key: string]: any }) => {
    //       Object.values(x).forEach((value: any) => {
    //         if (value && value.Status == 'Reserved') {
    //           this.animalsData.push(value);
    //           console.log(this.animalsData);
    //         }
    //       });
    //     });
      
    //   },
    //   error: (error) => {
    //     console.error(error);
    //   }
    // });
  }

}
