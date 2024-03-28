import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

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
    const loginDiv = document.getElementById('loginModal');
    if (loginDiv != null) {
      loginDiv.style.display = 'block';
    }

  }

  closeLogin() {
    const loginDiv = document.getElementById('loginModal');
    if (loginDiv != null) {
      loginDiv.style.display = 'none';
    }

  }



}
