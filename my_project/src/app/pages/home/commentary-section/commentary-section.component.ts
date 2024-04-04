import { Subscription } from 'rxjs';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from '../../../services/service';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-commentary-section',
  templateUrl: './commentary-section.component.html',
  styleUrl: './commentary-section.component.css'
})
export class CommentarySectionComponent implements OnInit {
  isRateToggled: boolean = false;
  submitted: boolean = false;
  userID: string = '';
  userComments = [];

  constructor(private fb: FormBuilder, public service: Service, private localStorage: LocalStorageService) { }

  form: FormGroup = this.fb.group({});

  ngOnInit(): void {

    this.form = this.fb.nonNullable.group({
      commentary: ['', [Validators.required, Validators.minLength(10)]],
      stars: [''],

    });

    this.getSiteComments();

    if (this.service.isLoggedIn == true) {
      const userInfo = this.localStorage.getItem('userInfo');
      this.userID = userInfo.userID;
    }
  }

  getSiteComments() {
    this.service.getAllComments().subscribe(data => {
      this.userComments = data;
      console.log(this.userComments);
      
    });
  }




  onSubmit(): void {

    this.submitted = true;

    if (!this.form || this.form.invalid) {
      return;
    }
    const comment = this.form.get('commentary')?.value;
    this.service.postSiteComentary(comment, this.userID, 5);

    setTimeout(() => {
      this.isRateToggled = !this.isRateToggled;
      this.form.reset();
    }, 2000);

  }
  toggleRate() {
    this.isRateToggled = !this.isRateToggled;
    this.form.reset();
  }

  checkIsUserCommented() {
    this.ngOnInit();
    this.service.checkUserComment(this.userID).subscribe(isCommented => {
      if (!isCommented) {
        this.toggleRate();
        // console.log('user may comment');
      } else {
        // console.log('user cannot comment');
      }
      // console.log(this.userID);

    })
  }


}
