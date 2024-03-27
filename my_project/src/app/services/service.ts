import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Service {
  private dbPath = "/newItem";
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }
    addItem(url: string, item: any) {
      this.db.list(url).push(item);
    }

    // Пример за получаване на данни от базата данни
    getItems(url: string) {
      return this.db.list(url).valueChanges();
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
}
