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


  // post commentary in database

  postComentary(text: string, id: string) {
    const ID: string = this.generateUUID();
    let newComment: {} = {};
    const usersDb = this.getItemsAsArray('/users/').subscribe({
      next: (data: any) => {
        // console.log(data);
        const user = data.filter((x: any) => x.ID === id);
        // console.log(user);
        if(!user[0].comentary){
          user[0].comentary = [];
        }
        newComment = {ID, text};
        user[0].comentary.push(newComment);
        // console.log(user[0].comentary);
        this.updateUser('/users/', id, user[0]);
        usersDb.unsubscribe();
      }
    });
  }


  // deletе commentary in database

  deleteComentary(text: string, userId: string, postId: string) {
   
    const usersDb = this.getItemsAsArray('/users/').subscribe({
      next: (data: any) => {
        // console.log(data);
        const user = data.filter((x: any) => x.ID === userId);
        // console.log(user);
        if (!user[0].comentary) {
          return;
        }
        const coms = user[0].comentary;
        const filteredComs = coms.filter((x:any) => x.ID !== postId);
        // console.log(coms);
        // console.log(filteredComs);
        
        // user[0].comentary.push(newComment);
        // // console.log(user[0].comentary);
        // this.updateUser('/users/', id, user[0]);
        // usersDb.unsubscribe();
      }
    });
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


  // id generator

  generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

}
