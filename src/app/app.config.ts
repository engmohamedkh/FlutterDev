import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
     importProvidersFrom(provideFirebaseApp(() => 
     initializeApp({"projectId":"reddit-app-e8daf",
     "appId":"1:52013461590:web:a845540754caace1694bf7",
     "storageBucket":"reddit-app-e8daf.appspot.com",
     "apiKey":"AIzaSyDUAkaYxTgAD71WnZ7HR2yfu3WE_soDfJg",
     "authDomain":"reddit-app-e8daf.firebaseapp.com",
     "messagingSenderId":"52013461590"}))), 
     importProvidersFrom(provideFirestore(() => getFirestore())), provideAnimationsAsync('noop')]
};
