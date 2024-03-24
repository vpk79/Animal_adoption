
import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
// import { routes } from './app.routes'
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth" 



const firebaseConfig = {
    apiKey: "AIzaSyA8SgSbLZRZLDGJGXsQoCj6t0Z-yq4YgbM",
    authDomain: "animaladoption-95397.firebaseapp.com",
    projectId: "animaladoption-95397",
    storageBucket: "animaladoption-95397.appspot.com",
    messagingSenderId: "1080972947602",
    appId: "1:1080972947602:web:3e1d677ce8a0b69805b64b"
};

// export const appConfig: ApplicationConfig = {
//     providers: [provideRouter(routes), provideHttpClient(),
//      importProvidersFrom([provideFirebaseApp(() => initializeApp(firebaseConfig)),
//      provideAuth(() => getAuth())   
//     ])    
//     ],

 
// }