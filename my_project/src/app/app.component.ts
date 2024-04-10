import { UserDataService } from './services/user-data.service';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { isPlatformBrowser } from '@angular/common';
import { Service } from './services/service';
import { UserAuthProfil, UserProfil } from '../types/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'my_project';

  constructor(public localStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object,
    public service: Service, public userDataService: UserDataService) { }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      const userInfo:UserAuthProfil = this.localStorageService.getItem('userInfo');
      if (userInfo == null || userInfo.logged == false) {
        this.service.loggedOut()
      }
      else {
        this.service.loggedIn();
        const userID:string = userInfo.userID;
        this.userDataService.getOneUserAsObject(userID).subscribe((userData: any) => {
          // console.log(userData);
          if(userData){
            this.userDataService.setUserData(userData);
          }
        });
      }
    }
  }
}
