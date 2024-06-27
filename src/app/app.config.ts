import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ringoffire-bfdaa","appId":"1:299863073547:web:7f50c84272fa566e76f80e","storageBucket":"ringoffire-bfdaa.appspot.com","apiKey":"AIzaSyAylIleTpfjDewvGfCfO0LVl0KNjDAahCw","authDomain":"ringoffire-bfdaa.firebaseapp.com","messagingSenderId":"299863073547"})), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())]
};
