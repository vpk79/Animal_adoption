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
export class CommentarySectionComponent implements OnInit, AfterViewInit {
  isRateToggled: boolean = false;
  submitted: boolean = false;
  userID: string = '';
  userComments: { userID: string, profile_img: string, firstName: string, text: string }[] = [];
  finalUserCommentsArray: any[] = [];
  isConfirmToggled: boolean = false;
  postForDeleteID: string ='';
  isCommentFormToggled: boolean = false;


  constructor(private fb: FormBuilder, public service: Service, private localStorage: LocalStorageService, private renderer: Renderer2) { }
  @ViewChild('btnNext2') btnNext2!: ElementRef;
  @ViewChild('commentArea') commentArea!: ElementRef;

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

    this.checkIsUserCommented();
  }

  ngAfterViewInit(): void {
    
  }


  // printall() {
  //   // console.log(this.userComments);
  //   console.log(this.finalUserCommentsArray);
    
  // }





  onSubmit(event: Event): void {
    this.submitted = true;
    if (!this.form || this.form.invalid) {
      return;
    }
    const comment = this.form.get('commentary')?.value;
    this.service.postSiteComentary(comment, this.userID, 5);

    setTimeout(() => {
      this.toggleCommentForm(event);
      this.form.reset();
    }, 1200);

  }


// Toggle button Rate Us
  toggleRateBtn() {
    this.isRateToggled = !this.isRateToggled;
    this.form.reset();
  }


// Check if user is already commented - 1 comment per user is allowed!
  checkIsUserCommented() {
    // this.ngOnInit();
    this.service.checkUserComment(this.userID).subscribe(isCommented => {
      if (!isCommented) {
        this.isRateToggled = true;
        // console.log('user may comment');
      } else {
        this.isRateToggled = false;
        // console.log('user cannot comment');
      }
      // console.log(this.userID);

    })
  }


  deleteComment(event: Event){
    event.preventDefault();

    this.service.deleteSiteComments(this.postForDeleteID);
    setTimeout(() => {
      this.toggleConfirm(event);
    }, 1500);
    // console.log(event.target);
  }

  editComment(event: Event){
    event.preventDefault()
    const userIDEdit = ((event.target as HTMLButtonElement).id);
    const index = this.userComments.findIndex((x:any) => x.userID == userIDEdit);
    const oldTxt = this.userComments[index].text;
    this.toggleCommentForm(event);
    setTimeout(() => {
      this.commentArea.nativeElement.value = oldTxt;
    }, 100);
  
    
    
  }


  toggleConfirm(event: Event){
    // console.log((event.target as HTMLButtonElement).id);
    this.postForDeleteID = ((event.target as HTMLButtonElement).id);
    this.isConfirmToggled = !this.isConfirmToggled;
    // console.log(this.isConfirmToggled);
    
  }

  toggleCommentForm(event: Event){
    event.preventDefault();
    this.isCommentFormToggled = !this.isCommentFormToggled;
    this.form.reset();
    this.submitted = false;
  }

}
