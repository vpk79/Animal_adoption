import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { isPlatformBrowser } from '@angular/common';
import { Service } from './services/service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'my_project';
  constructor(public localStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object,
    public service: Service) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userInfo = this.localStorageService.getItem('userInfo');
      if(userInfo == null) {
        this.service.isLoggedIn = false;
      } else {
        this.service.isLoggedIn = true;
      }
      
      console.log(userInfo.logged);
      console.log(this.service.isLoggedIn);
    }
  }

}
