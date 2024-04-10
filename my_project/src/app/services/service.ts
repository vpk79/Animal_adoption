import { UserProfil } from './../../types/users';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, Observable, map, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})


export class Service {
  // private dbPath = "/newItem";
  isSiteCommented = false;


  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  private isLoggedInSubject = new BehaviorSubject<any>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();




  updateUserLikedAnimals(userID: string, animalID: string, animalName: string) {
    const likedAnimal = { [animalID]: animalName }
    // console.log(userID);

    //   console.log(likedAnimal);

    this.updateUserPropertyByValue('users', userID, 'animalLikes', likedAnimal);
  }






  // Get data from database - by 2 ways

  getItemsAsArray(url: string) {
    return this.db.list(url).valueChanges();
  }

  getItemsAsObject(url: string) {
    // console.log(url);

    return this.db.object(url).valueChanges();
  }

  // Add new items in database

  addItem(url: string, item: string | UserProfil) {
    this.db.list(url).push(item);
    return;
  }

  // Check likes in animal database

  getItemLikes(url: string, item: string, itemID: string) {
    return this.db.object(`/${url}/${item}/${itemID}/Liked`).valueChanges();
  }

  updateItemLikes(url: string, item: string, itemID: string, likes: string) {
    this.db.object(`/${url}/${item}/${itemID}/`).update({ Liked: likes });

  }


  // get User property from database

  getUserProperty(url: string, userID: string, property: string): Observable<any> {
    return this.db.object(`/${url}/${userID}/${property}`).valueChanges();
  }


  updateUserProperty(url: string, userID: string, property: string, newValue: any) {
    console.log(url, userID, property, newValue);
    
    this.db.object(`/${url}/${userID}`).update({ [property]: newValue });
    console.log('updated');
    
  }

  updateUserPropertyByValue(url: string, userID: string, property: string, newValue: any) {
    this.db.object(`/${url}/${userID}/${property}`).update(newValue);
  }


  // update user properties in database

  updateDatabaseAsObject(url: string, id: string, object: any): Promise<void> {
    return this.db.object(`/${url}/${id}/`).update(object)
      .then(() => {
        console.log('Update successful');
      })
      .catch(error => {
        console.error('Error updating database:', error);
        throw error; // Разхвърляне на грешката за обработка от по-горните слоеве на приложението
      });
  }

  // get one User by his userID
  getOneUserAsObject(userID: string): Observable<[]> {
    return this.getItemsAsObject('/users/' + userID).pipe(
      map((data: any) => {
        return data;
      })
    )
  }


  // post Site commentary in database

  postSiteComentary(text: string, userID: string, rating: number) {
    const postID: string = this.generateUUID();
    let newComment: {} = {};

    newComment = { postID, userID, text, rating };
    this.updateDatabaseAsObject('siteComments', userID, newComment);
    // check.unsubscribe();
    console.log('comment posted');
   
  }

  // check if user already commented - 1 comment per user allowed

  checkUserComment(userID: string): Observable<boolean> {
    if (userID !== null) {
      return this.getItemsAsObject('/siteComments/' + userID).pipe(
        map((data: any) => {
          const isCommented = data;
          // console.log(data);

          // console.log(isCommented);
          return isCommented;
        })
      );

    } else {
      return of(false);
    }
  }



  // return all site comments as array

  getAllComments(): Observable<[]> {
    return this.getItemsAsArray('/siteComments/').pipe(
      map((data: any) => {
        return data;
      })
    )
  }


  // delete Site commentary in database

  deleteSiteComments(userID: string): void {
    // console.log(userID);
    const ref = this.db.database.ref('/siteComments/' + userID);
    console.log(userID,'forDelete');
    
    // console.log('reference', ref);

    // Проверяваме дали записът съществува преди да го изтрием
    ref.once('value')
      .then((snapshot) => {
        console.log('snapshot', snapshot);

        if (snapshot.exists()) {
          // Записът съществува, изтриваме го
          ref.remove()
            .then(() => {
              console.log("Записът e успешно изтрит.");
            })
            .catch((error) => {
              console.error("Грешка при изтриване на записа:", error);
            });
        } else {
          console.log("Записът не съществува.");
        }
      })
      .catch((error) => {
        console.error("Грешка при проверката на записа:", error);
      });
  }


  // Login and Logout switch
  loggedIn() {
    this.isLoggedInSubject.next(true);
  }
  
  loggedOut() {
    this.isLoggedInSubject.next(false);
  }


  deleteUserProperty(url: string, userID: string, property: string, key: string): void {
    console.log(userID);
    const ref = this.db.database.ref(`/${url}/${userID}/${property}/${key}`);
    console.log('reference', ref);

    // Проверяваме дали записът съществува преди да го изтрием
    ref.once('value')
      .then((snapshot) => {
        console.log('snapshot', snapshot);

        if (snapshot.exists()) {
          // Записът съществува, изтриваме го
          ref.remove()
            .then(() => {
              console.log("Записът e успешно изтрит.");
            })
            .catch((error) => {
              console.error("Грешка при изтриване на записа:", error);
            });
        } else {
          console.log("Записът не съществува.");
        }
      })
      .catch((error) => {
        console.error("Грешка при проверката на записа:", error);
      });
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


  // return array of all animals sorted by Status
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




  // Toggle Login and Register forms

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

  // id generator

  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
