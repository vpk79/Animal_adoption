import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @ViewChild('loginModal') loginModal!: ElementRef;
  @ViewChild('registerModal') registerModal!: ElementRef;
  dogs: string = "dogs";

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        header?.classList.toggle("sticky", window.scrollY > 0);
      });
    }
  }


  openLogin() {
    if (this.loginModal != null) {
      this.loginModal.nativeElement.style.display = 'block';
      this.loginModal.nativeElement.classList.add('active');
    }

    if (this.registerModal != null) {
      this.registerModal.nativeElement.style.display = 'none';
      this.registerModal.nativeElement.classList.remove('active');
    }
  }


  closeLogin() {
    if (this.loginModal != null) {
      this.loginModal.nativeElement.style.display = 'none';
      this.loginModal.nativeElement.classList.remove('active')

    }

  }

  openRegister() {

    if (this.registerModal != null) {
      this.registerModal.nativeElement.style.display = 'block';
      this.registerModal.nativeElement.classList.add('active');
    }

    if (this.loginModal != null) {
      this.loginModal.nativeElement.style.display = 'none';
      this.loginModal.nativeElement.classList.remove('active')
    }

  }

  // closeRegister() {
  //   const registerDiv = document.getElementById('registerModal');
  //   if (registerDiv != null) {
  //     registerDiv.style.display = 'none';
  //   }

  // }

}
