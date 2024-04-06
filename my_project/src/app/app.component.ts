import { UserDataService } from './services/user-data.service';
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
    public service: Service, public userData: UserDataService) { }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      const userInfo = this.localStorageService.getItem('userInfo');
      if(userInfo == null || userInfo.logged == false) {
        this.service.isLoggedIn = false;
      } else {
        this.service.isLoggedIn = true;
        const userID = userInfo.userID;
      //  const data = this.userData.saveUserData(userID);
      //  console.log(data);
        this.userData.saveUserData(userID).subscribe((userData: any) => {
          this.userData.userDataObject = userData;
          console.log(this.userData.userDataObject); // Тук може да направите каквото искате с получените данни
        });
       
      }
      
      // console.log(userInfo.logged);
      // console.log(this.service.isLoggedIn);
    }
  }

}
