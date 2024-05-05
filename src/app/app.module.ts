import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireAuthModule,  } from '@angular/fire/compat/auth';
import { AngularFireModule,  } from '@angular/fire/compat';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; 
import { PastWorkoutsPageModule } from './pages/past-workouts/past-workouts.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), 
    AppRoutingModule, 
    FormsModule,
    AngularFireAuthModule, 
    AngularFirestoreModule,
    AngularFireModule, 
    PastWorkoutsPageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    provideFirebaseApp(() => initializeApp({"projectId":"fitness-app-auth-bb372","appId":"1:983088696505:web:9bd52c1fc59073cf8a5f68","storageBucket":"fitness-app-auth-bb372.appspot.com","apiKey":"AIzaSyCcXtnfvpxdFZW77NYMMBTOUuxScQL-TsQ","authDomain":"fitness-app-auth-bb372.firebaseapp.com","messagingSenderId":"983088696505","measurementId":"G-P27CGNDHC7"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
  providers: [{ 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy 
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
