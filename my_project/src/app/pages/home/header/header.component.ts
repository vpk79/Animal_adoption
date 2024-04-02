import { Service } from './../../../services/service';
import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  // @ViewChild('loginModal') loginModal!: ElementRef;
  // @ViewChild('registerModal') registerModal!: ElementRef;
  @ViewChild('loginform') loginForm!: ElementRef;
  dogs: string = "dogs";

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router, public service: Service,
  public authService: AuthService) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        header?.classList.toggle("sticky", window.scrollY > 0);
      });
    }

    
  }
        
}

  