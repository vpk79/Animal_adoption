import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-commentary-section',
  templateUrl: './commentary-section.component.html',
  styleUrl: './commentary-section.component.css'
})
export class CommentarySectionComponent implements OnInit{
   isRateToggled: boolean = false;
   submitted: boolean = false;

    constructor(private fb: FormBuilder){}

  form: FormGroup = this.fb.group({});

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      commentary: ['', [Validators.required, Validators.minLength(10)]],
      stars :['', Validators.required],
     
    });
  }

  onSubmit(): void{

    this.submitted = true

    if (!this.form) {
      return;
    }

    const comment = this.form.get('commentary')?.value;
    console.log(comment);
    
   
    const star1 = this.form.get('stars')?.value;
    console.log(star1);
    
    // Повторете този процес за всички радио бутони

 

  }








    toggleRate(){
     this.isRateToggled = !this.isRateToggled;
     this.form.reset();
    }


    postComment(){
      
    }

}
