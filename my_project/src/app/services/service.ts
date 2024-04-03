import { UserProfil } from './../../types/users';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, Subscription, finalize, map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class Service {
  // private dbPath = "/newItem";

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }


  // Add items in database

  addItem(url: string, item: string | UserProfil) {
    this.db.list(url).push(item);
    return;
  }

  // Check likes in animal database

  getItemLikes(url: string, item: string, itemName: string) {
    return this.db.object(`/${url}/${item}/${itemName}/Liked`).valueChanges();
  }

  updateItemLikes(url: string, item: string, itemName: string, likes: string) {
    this.db.object(`/${url}/${item}/${itemName}`).update({ Liked: likes });

  }



  // update user info

  updateUser(url: string, id: string, object: any) {
    // const updateObject: any = {};
    // updateObject[property] = value;
    // console.log(url, id, object);

    this.db.object(`/${url}/${id}/`).update(object);
  }



  postComentary(text: string, id: string) {
    const commentar = [];
    commentar.push(text);
    this.updateUser('users', id, { comentary: commentar })
  }

  // Get data from database - have 2 ways

  getItemsAsArray(url: string) {
    return this.db.list(url).valueChanges();
  }

  getItemsAsObject(url: string) {
    return this.db.object(url).valueChanges();
  }


  // Upload user photo in data server

  uploadFile(event: any, dirPath: string, fileName: string) {
    const file = event.target.files[0];
    const filePath = 'main/' + dirPath + fileName;
    const task = this.storage.upload(filePath, file);

    return new Observable<string>(observer => {
      task.snapshotChanges().subscribe(snapshot => {
        if (snapshot?.state === 'success') {
          snapshot.ref.getDownloadURL().then(downloadURL => {
            observer.next(downloadURL);
            observer.complete();
          });
        }
      }, error => {
        observer.error(error);
      });
    });
  }




  // getUserDataByID(id: string): any {
  //   this.getItemsAsArray('/users/')




  // id: string = 'EbL6CXchcMZxTaBC0wLkzt5p58h1';

  // getUserData(id: string) {
  //   this.updateUser('users', id, {balance:1000})

  // }





  getAnimalsDataByStatus(status: string): Observable<any[]> {
    return this.getItemsAsArray('/animals/').pipe(
      map((data: any[]) => {
        const animalsData: { [key: string]: any }[] = [];
        data.forEach((x: { [key: string]: any }) => {
          Object.values(x).forEach((value: any) => {
            if (value && value.Status == status) {
              animalsData.push(value);
            }
          });
        });
        return animalsData;
      })
    );
  }



  getAnimalsDataByKeyAndValue(animalKey: any, animalValue: string, animalType: string): Observable<any[]> {
    return this.getItemsAsArray('/animals/' + animalType + '/').pipe(
      map((data: any[]) => {
        const animalsData: { [key: string]: any }[] = [];
        data.forEach((x: { [key: string]: any }) => {
          if (x[animalKey] == animalValue) {
            animalsData.push(x);
          }
        });
        return animalsData;
      })
    );
  }


  // Toggle Login and Registre forms

  isLoginFormVisible: boolean = false;

  toggleLoginForm() {
    this.isLoginFormVisible = !this.isLoginFormVisible;
    this.isRegisterFormVisible = false;
  }

  isRegisterFormVisible: boolean = false;

  toggleRegisterForm() {
    this.isRegisterFormVisible = !this.isRegisterFormVisible;
    this.isLoginFormVisible = false;
  }



  isWelcomeMsg: boolean = false;

  toggleWelcomeMsg() {
    this.isWelcomeMsg = !this.isWelcomeMsg;
  }



  // Logged In check

  isLoggedIn: boolean = false;


}
