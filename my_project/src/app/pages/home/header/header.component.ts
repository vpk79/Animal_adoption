import { Service } from './../../../services/service';
import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { UserDataService } from '../../../services/user-data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('loginform') loginForm!: ElementRef;
  dogs: string = "dogs";
  imageUrl: string = '';
  userID: string = '';
  userName: string = '';

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

    if (this.service.isLoggedIn == true) {
      // console.log(this.userData.userDataObject);
      
      // this.imageUrl = this.userData.userDataObject[0].profile_img!;
      // console.log(this.imageUrl);
    }
    

    // if (this.service.isLoggedIn == true) {
    //   const userInfo = this.localStorage.getItem('userInfo');
    //   this.userID = userInfo.userID;

    //   this.service.getUserProperty('users', this.userID, 'profile_img').subscribe({
    //     next: (data) => {
    //       console.log(data); // Тук получавате данните от базата данни
    //       // return data;
    //       this.imageUrl = data;
    //     },
    //     error: (error) => {
    //       console.error('Error fetching user property:', error);
    //     }
    //   });
    //   // console.log(this.imageUrl);
    // }

    // this.service.getUserProperty('users', this.userID, 'firstName').subscribe({
    //   next: (data) => {
    //     console.log(data); // Тук получавате данните от базата данни
    //     // return data;
    //     this.userName = data;
    //   },
    //   error: (error) => {
    //     console.error('Error fetching user property:', error);
    //   }
    // });
    // // console.log(this.imageUrl);
  }

  ngAfterViewInit(): void {
    if (this.service.isLoggedIn == true) {
      console.log(this.userData.userDataObject);

      // this.imageUrl = this.userData.userDataObject[0].profile_img!;
      // console.log(this.imageUrl);
    }
  }


}




