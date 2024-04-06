import { Injectable } from '@angular/core';
import { Service } from './service';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { UserProfil } from '../../types/users';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  // userDataObject: UserProfil[] = [];

  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();


  constructor(private service: Service, private localStorage: LocalStorageService) { }


  // get userID from localStorage  
  getUserID() {
    this.service.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn == true) {
        const userInfo = this.localStorage.getItem('userInfo');
        return userInfo.userID;
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

  setUserData(userData: UserProfil) {
    this.userDataSubject.next(userData);
  }

  changeUserDataProperty(property: any, value: any) {
    const currentUserData = this.userDataSubject.getValue();
    currentUserData[property] = value;
    this.setUserData(currentUserData);
  }
}

