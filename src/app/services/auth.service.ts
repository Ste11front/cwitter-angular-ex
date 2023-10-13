import { Injectable } from '@angular/core';
import { FireappService } from './fireapp.service';
import { Auth, User, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { OurUser } from '../model/our-user';
import { FirestoreService } from './firestore.service';
import { BehaviorSubject } from 'rxjs';
import { Route, Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth: Auth;

  ourUser = new BehaviorSubject <OurUser | null>(null)
  firebaseUser = new BehaviorSubject <User | null>(null)

  constructor(private fireApp: FireappService, private firestore: FirestoreService,private router: Router) {
    this.auth = getAuth(fireApp.app);

    onAuthStateChanged(this.auth, (user) => {

      console.log('autenticazione cambiata')
      if (user) {

        const uid = user.uid;
        this.firebaseUser.next(user);
        this.firestore.getOurUser(uid).then(ourU => {
          this.ourUser.next(ourU.data() as OurUser);
        })

      } else {
        this.firebaseUser.next(null);



      }
    });


  }

  registerUser(newUser: OurUser, email: string, psw:string) {
    createUserWithEmailAndPassword(this.auth, email, psw)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        this.firestore.postOurUser(newUser, user.uid).then(() => {
          this.ourUser.next(newUser);
          console.log(newUser)
        })

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('erorre di registrazione', error.code, error.message)
        // ..
      });
  }

  login(email:string, psw:string){
    signInWithEmailAndPassword(this.auth, email, psw)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      this.firestore.getOurUser(user.uid);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  logOut(){
    signOut(this.auth).then(() => {
      this.router.navigateByUrl('/home')

    }).catch((error) => {
      // An error happened.
    });
  }

  resetEmail(email: string) {
    sendPasswordResetEmail(this.auth, email)
      .then(() => {
        // Email di reset password inviata con successo!
        console.log('Email di reset password inviata con successo!');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Errore durante l\'invio dell\'email di reset password:', errorCode, errorMessage);
      });
  }




}


