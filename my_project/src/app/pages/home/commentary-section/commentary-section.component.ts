import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, PLATFORM_ID, Renderer2, SimpleChanges, ViewChild, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from '../../../services/service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-commentary-section',
  templateUrl: './commentary-section.component.html',
  styleUrl: './commentary-section.component.css'
})
export class CommentarySectionComponent implements OnInit, OnDestroy {
  isRateToggled: boolean = false;
  submitted: boolean = false;
  userID: string = '';
  userComments: { userID: string, profile_img: string, firstName: string, text: string }[] = [];
  finalUserCommentsArray: any[] = [];
  isConfirmToggled: boolean = false;
  postForDeleteID: string = '';
  isCommentFormToggled: boolean = false;
  isCommentSectionVisible: boolean = false;
  isUserLoggedIn: boolean = false;
  loginCheck!: Subscription;
  isReadyToShowButton: boolean = false;
  checkUserState!: Subscription;
  localStorageSubscription!: Subscription;


  constructor(private fb: FormBuilder, public service: Service,
    private localStorage: LocalStorageService,
    private renderer: Renderer2) {

    this.checkUserState = this.service.isLoggedIn$.subscribe(isLogged => {
      // console.log('noted');
      this.ngOnInit();
    })
  }
  @ViewChild('btnNext2') btnNext2!: ElementRef;
  @ViewChild('commentArea') commentArea!: ElementRef;


  form: FormGroup = this.fb.group({});


  ngOnInit(): void {

    // starting carousel to move
    setTimeout(() => {
      if (this.btnNext2) {
        this.renderer.selectRootElement(this.btnNext2.nativeElement).click();
      }
    }, 3500);

    // console.log(this.isRateToggled);


    // comentary validators
    this.form = this.fb.group({
      commentary: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(400)]],
      stars: [''],

    });

    // get userID if is logged

    this.loginCheck = this.service.isLoggedIn$.subscribe(isLoggedIn => {
      // console.log('trigerred');

      if (isLoggedIn == true) {
        this.isUserLoggedIn = true;

        const userInfo = this.localStorage.getItem('userInfo');
        this.userID = userInfo ? userInfo.userID : null;
        // console.log(this.userID, 'logincheck');

      } else {
        this.isUserLoggedIn = false;
        this.isRateToggled = false;
      }
    });


    // loading user comments

    this.loadComments();

    // check if user commented
    this.checkIsUserCommented();
  }



  // add new comment

  onSubmit(event: Event): void {
    this.submitted = true;
    if (!this.form || this.form.invalid) {
      return;
    }
    const comment = this.form.get('commentary')?.value.trim();
    this.service.postSiteComentary(comment, this.userID, 5);

    setTimeout(() => {
      this.isRateToggled = false;
      this.toggleCommentForm(event);
      this.form.reset();
    }, 200);

  }


  loadComments() {
    this.service.getAllComments().subscribe(data => {
      this.userComments = data;
      // console.log(data);
      this.isCommentSectionVisible = data.length ? true : false;
      this.userComments.forEach(x => {
        this.service.getOneUserAsObject(x.userID!).subscribe((data: any) => {
          // console.log(data);

          x.firstName = data.firstName;
          x.profile_img = data.profile_img;
          this.finalUserCommentsArray = [];
          const index = this.userComments.findIndex(comment => comment.userID === x.userID);
          this.userComments[index] = x;
          // console.log(this.userComments);

          for (let i = 0; i < this.userComments.length; i += 3) {
            this.finalUserCommentsArray = [...this.finalUserCommentsArray, this.userComments.slice(i, i + 3)];
          }


        })
      });

    });
  }


  // Toggle button Rate Us
  toggleRateBtn() {
    this.isRateToggled = !this.isRateToggled;
    this.form.reset();
  }


  // Check if user is already commented - 1 comment per user is allowed!
  checkIsUserCommented() {
    // console.log('triggered2');

    if (this.service.isLoggedIn$.subscribe(isLogged => {
      if (isLogged == true) {
        const userInfo = this.localStorage.getItem('userInfo');
        // console.log(isLogged);

        this.userID = userInfo ? userInfo.userID : null;
        // console.log(this.userID);

        if (this.userID !== null) {
          this.service.checkUserComment(this.userID).subscribe(isCommented => {
            // console.log(this.userID);
            // console.log(isCommented);

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

      }
    })) {

    }
  }


  deleteComment(event: Event) {
    event.preventDefault();
    if(this.postForDeleteID){
      this.service.deleteSiteComments(this.postForDeleteID);
    } else {
      // console.log('delete failed, noID');
    }
    this.loadComments();
    this.toggleConfirm(event);
    // console.log(event.target);
    this.isRateToggled = true;
  }

  editComment(event: Event) {
    event.preventDefault()
    const userIDEdit = ((event.target as HTMLButtonElement).id);
    const index = this.userComments.findIndex((x: any) => x.userID == userIDEdit);
    const oldTxt = this.userComments[index].text;
    this.toggleCommentForm(event);
    setTimeout(() => {
      this.commentArea.nativeElement.value = oldTxt;
    }, 100);



  }

  toggleCommentSection() {
    this.isCommentSectionVisible = !this.isCommentSectionVisible
  }


  toggleConfirm(event: Event) {
    // console.log((event.target as HTMLButtonElement).id);
    this.postForDeleteID = ((event.target as HTMLButtonElement).id);
    // console.log(this.postForDeleteID);
    
    this.isConfirmToggled = !this.isConfirmToggled;

    // return this.postForDeleteID;
    // console.log(this.isConfirmToggled);

  }

  toggleCommentForm(event: Event) {
    event.preventDefault();
    this.isCommentFormToggled = !this.isCommentFormToggled;
    this.form.reset();
    this.submitted = false;
  }

  ngOnDestroy(): void {
    this.loginCheck.unsubscribe;
    // this.checkUserState.unsubscribe;
    // this.localStorageSubscription.unsubscribe; 
  }

}
