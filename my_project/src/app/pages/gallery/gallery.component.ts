import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Service } from '../../services/service';
import { ActivatedRoute } from '@angular/router';
import { Animals } from '../../../types/animals';
import { Observable, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})

export class GalleryComponent implements OnInit, AfterViewInit {

  choosedAnimal: string = '';
  animalsData: Animals[] = [];
  animalData = {};
  likes: string = '';
  oldValue: number = 1;
  searchData: string[] = [];


  constructor(public service: Service, private route: ActivatedRoute, private fb: FormBuilder) { }

  form: FormGroup = new FormGroup({});

  ngAfterViewInit() {

    // ...
  }

  ngOnInit(): void {

    this.form = this.fb.nonNullable.group({
      animalGender: ['', Validators.required],
      animalSize: ['', Validators.required],
      animalAge: ['', Validators.required]
    });

    // if (this.oldValue == 1) {
    //   this.oldValue = 0
    // } else {
    //   this.oldValue = 1;
    // }

    //  Taking user animal choice from previous page
    this.route.queryParams.subscribe(params => {
      this.choosedAnimal = params['animalChoice'];
      // console.log(this.choosedAnimal); 
    });

    // Loading gallery data from database by url + user choice

    this.service.getItemsAsArray('/animals/' + this.choosedAnimal).subscribe({
      next: (data: any) => {
        this.animalsData = data;
       
        // console.log(this.animalsData); 
      },
      error: (error) => {
        console.error(error); 
      }
    });
  }


  onSubmit(): void {

    const animalGenderValue = this.form.get('animalGender')?.value;
    const animalSizeValue = this.form.get('animalSize')?.value;
    const animalAgeValue = this.form.get('animalAge')?.value;
    // console.log(animalGenderValue, animalSizeValue, animalAgeValue);
    this.service.getAnimalsDataByKeyAndValue('Sex', animalGenderValue, this.choosedAnimal).subscribe({
      next: (data2: any) => {
        // this.searchData = data;
        // console.log(this.searchData); 
        this.animalsData = data2;
        console.log(this.animalsData);
        
      },
      error: (error) => {
        console.error(error);
      }
    });
   
    
  }


  // Load animal data
  getAnimalData(name: string): void {

    this.service.getItemsAsObject('/animals/' + this.choosedAnimal + "/" + name).subscribe({
      next: (data: any) => {
        this.animalData = data;
        console.log(this.animalData); 
      },
      error: (error) => {
        console.error(error); 
      }
    });
  }


  // Gallery likes functions

  updateLikes(event: Event, name: string, liked: string): void {
    event.stopImmediatePropagation();
    
    if(liked == "0") {
      this.service.updateItemLikes('animals', this.choosedAnimal, name, "1");
    } else {
      this.service.updateItemLikes('animals', this.choosedAnimal, name, "0");
    }
  }

  // getLikes(name: string): Observable<any> {
  //   return this.service.getItemLikes('animals', this.choosedAnimal, name)
  // }
}
