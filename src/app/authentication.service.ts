import { Injectable } from '@angular/core';
import firebase  from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUser: firebase.User | null = null;


  constructor(public ngFireAuth: AngularFireAuth) { }

  async registerUser(email: string,password: string){
    return await this.ngFireAuth.createUserWithEmailAndPassword(email,password);
  }

  async loginUser(email:string, password:string){
    // return await this.ngFireAuth.signInWithEmailAndPassword(email,password);
    const userCredential = await this.ngFireAuth.signInWithEmailAndPassword(email,password);
    this.currentUser = userCredential.user;
  }

  get currentUser$(): Observable<firebase.User | null>{
    return new Observable(subscriber => {
      subscriber.next(this.currentUser);
      this.ngFireAuth.authState.subscribe(user => {
        subscriber.next(user);
      })
    })
  }

  async resetPassword(email:string){
    return await this.ngFireAuth.sendPasswordResetEmail(email);
  }

  async signOut(){
    return await this.ngFireAuth.signOut();
  }

  async getProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ngFireAuth.authState.subscribe(user => {
        if (user) {
          resolve(user); // Resolve the Promise with the user object
        } else {
          reject(new Error("User is not authenticated")); // Reject the Promise if no user is authenticated
        }
      });
    });
  }

  

}
