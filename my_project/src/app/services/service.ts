import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Service {
  // private dbPath = "/newItem";

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }


  // Запис на данни в базата

  addItem(url: string, item: string) {
    this.db.list(url).push(item);
    return;
  }

  getItemLikes(url: string, item: string, itemName: string) {
    return this.db.object(`/${url}/${item}/${itemName}/Liked`).valueChanges();
  }

  updateItemLikes(url: string, item: string, itemName: string, likes: string) {
    this.db.object(`/${url}/${item}/${itemName}`).update({ Liked: likes });
    return;
  }






  // addItem() {
  //   this.db.object('/animals/dogs/Bambi').update({ Liked: "10" });
  // }



  // Четене на данни от базата

  getItemsAsArray(url: string) {
    return this.db.list(url).valueChanges();
  }

  getItemsAsObject(url: string) {
    return this.db.object(url).valueChanges();
  }



  uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = 'main/dogs' + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // Опционален обработчик за прогрес или успешно качване
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(downloadURL => {
          console.log('File available at', downloadURL);
        });
      })
    ).subscribe();
  }


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

  // getAnimalsDataByStatus(status: string): any {
  //   this.getItemsAsArray('/animals/').subscribe({
  //     next: (data: any) => {

  //       const animalsData: { [key: string]: any }[] = [];

  //       data.forEach((x: { [key: string]: any }) => {
  //         Object.values(x).forEach((value: any) => {
  //           if (value && value.Status == status) {
  //             animalsData.push(value);
  //             return animalsData;
  //             // console.log(this.animalsData);
  //           }
  //         });
  //       });

  //     },
  //     error: (error) => {
  //       console.error(error);
  //     }
  //   });
  // }



}
