import { Subscription, catchError, forkJoin, of, tap } from 'rxjs';
import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild, viewChild } from '@angular/core';
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
  userComments: { userID: string, profile_img: string, firstName: string }[] = [];
  finalUserCommentsArray: any[] = [];
  isConfirmToggled: boolean = false;


  constructor(private fb: FormBuilder, public service: Service, private localStorage: LocalStorageService, private renderer: Renderer2) { }
  @ViewChild('btnNext2') btnNext2!: ElementRef;
  form: FormGroup = this.fb.group({});

  ngOnInit(): void {

    setTimeout(() => {
      if (this.btnNext2) {
        this.renderer.selectRootElement(this.btnNext2.nativeElement).click();
      }
    }, 3500);

    this.form = this.fb.nonNullable.group({
      commentary: ['', [Validators.required, Validators.minLength(10)]],
      stars: [''],

    });

    // get userID if is logged

    if (this.service.isLoggedIn == true) {
      const userInfo = this.localStorage.getItem('userInfo');
      this.userID = userInfo.userID;
    }

    // loading user comments

    this.service.getAllComments().subscribe(data => {
      this.userComments = data;
      this.userComments.forEach(x => {
        this.service.getOneUserAsObject(x.userID!).subscribe((data: any) => {
          x.firstName = data.firstName;
          x.profile_img = data.profile_img;
          this.finalUserCommentsArray = [];
          const index = this.userComments.findIndex(comment => comment.userID === x.userID);
          this.userComments[index] = x;
          // console.log(this.userComments);
          
          for (let i = 0; i < this.userComments.length; i += 3) {
            this.finalUserCommentsArray.push(this.userComments.slice(i, i + 3));
          }
          // this.printall()

        })
      });

    });
  }


  // printall() {
  //   // console.log(this.userComments);
  //   console.log(this.finalUserCommentsArray);
    
  // }





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


  deleteComment(event: Event){
    event.preventDefault();
    this.toggleConfirm();
  }

  editComment(event: Event){
    event.preventDefault()
  }


  toggleConfirm(){
    this.isConfirmToggled = !this.isConfirmToggled;
  }


}
