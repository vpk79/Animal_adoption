import { Injectable } from '@angular/core';
import { Service } from './service';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { UserAuthProfil, UserProfil } from '../../types/users';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  // userDataObject: UserProfil[] = [];

  private userDataSubject = new BehaviorSubject<any>(null);
  private userAuthDataSubject = new BehaviorSubject<any>(null);


  userData$ = this.userDataSubject.asObservable();
  userAuthData$ = this.userAuthDataSubject.asObservable();


  constructor(private service: Service, private localStorage: LocalStorageService) { }


  // get userID from localStorage  
  getUserID() {
    this.service.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn == true) {
        const userInfo = this.localStorage.getItem('userInfo');
        return userInfo.userID;
      } else {
        return false;
      }
    });
  }


  // get one User by his userID
  getOneUserAsObject(userID: string): Observable<[]> {
    return this.service.getItemsAsObject('/users/' + userID).pipe(
      map((data: any) => {
        return data;
      })
    )
  }


  // set new data with user credentials
  setUserAuthData(userData: UserAuthProfil){
    this.userAuthDataSubject.next(userData);
  }

  // change user auth property
  changePropertyInUserAuthData(property: string, value: string){
    const currentData = this.userAuthDataSubject.getValue();
    currentData[property]= value;
    this.setUserAuthData(currentData);
  }



  // sets User data in local global object
  setUserData(userData: UserProfil) {
    this.userDataSubject.next(userData);
  }

  // change property in user data local global object
  changeUserDataProperty(property: string, value: any) {
    const currentUserData = this.userDataSubject.getValue();
    currentUserData[property] = value;
    this.setUserData(currentUserData);
  }
}

