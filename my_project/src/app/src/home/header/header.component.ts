import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  ngOnInit(): void {
    window.addEventListener("scroll", function () {
      const header = document.querySelector("header");

      header?.classList.toggle("sticky", window.scrollY > 0);
    })
  }
}
