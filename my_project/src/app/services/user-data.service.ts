import { Injectable } from '@angular/core';
import { Service } from './service';
import { Observable, map, tap } from 'rxjs';
import { UserProfil } from '../../types/users';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userDataObject: UserProfil[] = [];


  constructor(private service: Service, private localStorage: LocalStorageService) { }

  getUserID() {
    if (this.service.isLoggedIn == true) {
      const userInfo = this.localStorage.getItem('userInfo');
      return userInfo.userID;
    }
  }



  // get one User by his userID
  getOneUserAsObject(userID: string): Observable<[]> {
    return this.service.getItemsAsObject('/users/' + userID).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  saveUserData(userID: string): Observable<any> {
    return this.getOneUserAsObject(userID).pipe(
      map((data: any) => {
        // console.log(data); // Тук може да направите каквото искате с получените данни
        return data; // Връщаме данните за ползване във външния код
      })
    );
  }
}

