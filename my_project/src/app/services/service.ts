import { UserProfil } from './../../types/users';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, Subscription, filter, finalize, map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})


export class Service {
  // private dbPath = "/newItem";
  isSiteCommented = false;

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  // Get data from database - have 2 ways

  getItemsAsArray(url: string) {
    return this.db.list(url).valueChanges();
  }

  getItemsAsObject(url: string) {
    return this.db.object(url).valueChanges();
  }

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


  getUserProperty(url: string, userID: string, property: string): Observable<any> {
    return this.db.object(`/${url}/${userID}/${property}`).valueChanges();
  }


  updateUserProperty(url: string, userID: string, property: string, newValue: string) {
    this.db.object(`/${url}/${userID}/`).update({ [property]: newValue });
  }




  // update user info

  updateDatabaseAsObject(url: string, id: string, object: any) {
    // const updateObject: any = {};
    // updateObject[property] = value;
    // console.log(url, id, object);

    this.db.object(`/${url}/${id}/`).update(object);
  }

  // post Site commentary in database

  postSiteComentary(text: string, userID: string, rating: number) {
    const postID: string = this.generateUUID();
    let newComment: {} = {};
    if (this.checkUserComment(userID) == true){
      console.log('already commented');
      setTimeout(() => {
      }, 3000);
      this.isSiteCommented = false;
      return;
    } else {
      console.log('you may comment');
    }


    // const usersDb = this.getItemsAsObject('/siteComments/' + userID).subscribe({
    //   next: (data: any) => {
    //     if (data !== null) {
    //       this.isSiteCommented = true;
    //       setTimeout(() => {
    //         this.isSiteCommented = false;
    //       }, 3000);
    //       console.log('already commented');
    //       return;
    //     } else {
    //       newComment = { postID, text, rating };
    //       this.updateDatabaseAsObject('siteComments', userID, newComment);
    //     }
    //     console.log(data);
    //     usersDb.unsubscribe();
    //   }
    // });
  }

  checkUserComment(userID: string){
    const check = this.getItemsAsObject('/siteComments/' + userID).subscribe({
      next: (data: any) => {
        if (data !== null) {
         this.isSiteCommented = true;
        } else {
          this.isSiteCommented = false;
        }
      }
  });
  check.unsubscribe;
  return this.isSiteCommented;
}

  // delete Site commentary in database

  deleteSiteComments(userID: string): void {
    const ref = this.db.database.ref('/siteComments/' + userID);
    // Проверяваме дали записът съществува преди да го изтрием
    ref.once('value')
      .then((snapshot) => {
        if (snapshot.exists()) {
          // Записът съществува, изтриваме го
          ref.remove()
            .then(() => {
              console.log("Записът е успешно изтрит.");
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







  // post commentary in user database

  // postComentary(text: string, userId: string) {
  //   const ID: string = this.generateUUID();
  //   let newComment: {} = {};
  //   const usersDb = this.getItemsAsArray('/users/').subscribe({
  //     next: (data: any) => {
  //       // console.log(data);
  //       const user = data.filter((x: any) => x.ID === userId);
  //       // console.log(user);
  //       if(!user[0].comentary){
  //         user[0].comentary = [];
  //       }
  //       newComment = {ID, text};
  //       user[0].comentary.push(newComment);
  //       // console.log(user[0].comentary);
  //       this.updateUser('/users/', userId, user[0]);
  //       usersDb.unsubscribe();
  //     }
  //   });
  // }


  // deletе commentary in user database

  // deleteComentary(userId: string, postId: string) {

  //   const usersDb = this.getItemsAsArray('/users/').subscribe({
  //     next: (data: any) => {
  //       // console.log(data);
  //       const user = data.filter((x: any) => x.ID === userId);
  //       // console.log(user);
  //       if (!user[0].comentary) {
  //         return;
  //       }
  //       const coms = user[0].comentary;
  //       const filteredComs = coms.filter((x:any) => x.ID !== postId);
  //       // console.log(filteredComs);

  //       user[0].comentary = filteredComs;
  //       this.updateUser('/users/', userId, user[0]);
  //       usersDb.unsubscribe();
  //     }
  //   });
  // }





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


  // id generator

  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
