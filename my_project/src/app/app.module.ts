import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagesModule } from './pages/pages.module';

import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { HomeModule } from './pages/home/home.module';

const firebaseConfig = {
  apiKey: "AIzaSyA8SgSbLZRZLDGJGXsQoCj6t0Z-yq4YgbM",
  authDomain: "animaladoption-95397.firebaseapp.com",
  databaseURL: "https://animaladoption-95397-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "animaladoption-95397",
  storageBucket: "animaladoption-95397.appspot.com",
  messagingSenderId: "1080972947602",
  appId: "1:1080972947602:web:3e1d677ce8a0b69805b64b"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    PagesModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [
    // provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
