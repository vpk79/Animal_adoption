import { Service } from './../../../services/service';
import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnChanges, OnDestroy, OnInit, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { UserDataService } from '../../../services/user-data.service';
import { UserProfil } from '../../../../types/users';
import { unsubscribe } from 'diagnostics_channel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  defaultProfileImg = 'https://firebasestorage.googleapis.com/v0/b/animaladoption-95397.appspot.com/o/main%2Fprofile%2Fuser_profile?alt=media&token=be227233-2374-4bcc-ad6f-1bdc02f405ec';
  @ViewChild('loginform') loginForm!: ElementRef;
  dogs: string = "dogs";
  imageUrl: string = '';
  userID: string = '';
  userName: string = '';
  userDataObject: UserProfil[] = [];
  userBalance: number = 0;
  userDataSubscription!: Subscription;
  isLoggedIn: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router, public service: Service,
    public authService: AuthService, public localStorage: LocalStorageService, public userData: UserDataService) { }

  ngOnInit(): void {
    // check if site is scrolled - about header fade
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        header?.classList.toggle("sticky", window.scrollY > 0);
      });
    }

    this.service.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      console.log(isLoggedIn);
      
      if (this.isLoggedIn == true) {
        setTimeout(() => {
          this.userDataSubscription = this.userData.userData$.subscribe((userData: UserProfil) => {
            this.userDataObject = [userData];
            this.imageUrl = this.userDataObject[0].profile_img!;
            this.userName = this.userDataObject[0].firstName;
            this.userBalance = this.userDataObject[0].balance!;
          });
        }, 800);
      }
    });
  }
}




