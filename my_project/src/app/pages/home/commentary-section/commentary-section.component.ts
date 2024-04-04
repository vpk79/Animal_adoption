import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from '../../../services/service';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-commentary-section',
  templateUrl: './commentary-section.component.html',
  styleUrl: './commentary-section.component.css'
})
export class CommentarySectionComponent implements OnInit{
   isRateToggled: boolean = false;
   submitted: boolean = false;
   userID: string = '';

    constructor(private fb: FormBuilder, public service: Service, private localStorage: LocalStorageService){}

  form: FormGroup = this.fb.group({});

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      commentary: ['', [Validators.required, Validators.minLength(10)]],
      stars :[''],
     
    });

    if (this.service.isLoggedIn == true) {
      const userInfo = this.localStorage.getItem('userInfo');
      this.userID = userInfo.userID;
    }
  }

  onSubmit(): void{

    this.submitted = true;

    if (!this.form || this.form.invalid) {
      return;
    }
    const comment = this.form.get('commentary')?.value;
    this.service.postSiteComentary(comment, this.userID, 5);
   
    console.log(comment);
    // const star1 = this.form.get('stars')?.value;
    
    
    // this.service.postSiteComentary('alabala', '0iHgyBkTv8gyWo646HWaBwB9nfk2', 5)
    // this.service.postSiteComentary('alabala', '7wxb84M9vrRNXpzY8VrMCS9AjNY2', 5)
    // this.service.postSiteComentary('alabala', 'EbL6CXchcMZxTaBC0wLkzt5p58h1', 5)

    // this.service.deleteSiteComments('7wxb84M9vrRNXpzY8VrMCS9AjNY2')
    setTimeout(() => {
      this.isRateToggled = !this.isRateToggled;
      this.form.reset();
    }, 2000);
    
  }
    toggleRate(){
      if (!this.service.checkUserComment(this.userID)){
         this.isRateToggled = !this.isRateToggled;
         this.form.reset();
      }
      // this.service.postSiteComentary('lalalal', this.userID, 5)
      // console.log(this.service.isSiteCommented);
    }
}
