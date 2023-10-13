import { Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { Firestore, addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { FireappService } from './fireapp.service';
import { OurUser } from '../model/our-user';
import { Cwit } from '../model/cwit';
import { User } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  // fireBaseUser?:User
  // cwit = {
  //   text: [''],
  //     url: [''],
  //     author: [''],
  //     authorName: [''],
  //           creationTime: new Date(),
  //     tags: this.parseForTags(text)

  // }

  db: Firestore;

  constructor(private fireApp: FireappService) {
    this.db = getFirestore(this.fireApp.app)

  }

  getCwits() {

    const cwits = collection(this.db, 'cwit');
    return getDocs(cwits).then(snap => snap.docs.map(doc => {
      return {
        text: doc.data()['text'],
        url: doc.data()['url'],
        author: doc.data()['author'],
        authorName: doc.data()['authorName'],
        creationTime: doc.data()['creationTime']?.toDate(),
      }
    }));


  }


  // initDb(app: any){
  //   this.db = getFirestore(app);
  // }

  postOurUser(ourUser: OurUser, uid: string){

    const docUrl = doc(this.db, 'user', uid);
     return setDoc(docUrl, ourUser)



  }

  getOurUser(uid: string){

    const docUrl = doc(this.db, 'user', uid);
    console.log(docUrl)
    return getDoc(docUrl);

  }

  getOurCwit(uid: string) {
    const q = query(collection(this.db, "cwit"), where("author", "==", uid));

    return getDocs(q).then((snapshot) => {
      return snapshot.docs.map((doc) => ({
        text: doc.data()['text'],
        url: doc.data()['url'],
        author: doc.data()['author'],
        authorName: doc.data()['authorName'],
        creationTime: doc.data()['creationTime']?.toDate(),
        tags:doc.data()['tags']
      }));
    });
  }


  saveCwit(cwit:Cwit[]) {
    const cwitsCollection = collection(this.db, 'cwit');
    return addDoc(cwitsCollection, cwit).then(snapshot =>console.log(snapshot));


  }

  parseForTags(text:string){
    const splitted = text.split(' ');
      const tags = splitted.filter(string => string[0] === '#')
      return tags;

}

searchTags(){

}

}


