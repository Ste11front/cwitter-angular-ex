import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OurUser } from 'src/app/model/our-user';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cwit } from 'src/app/model/cwit';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

fireUser?: User;

  userCwits: Cwit[] = [];

  user: OurUser | null = null;
  postCwitForm!: FormGroup
  postFormVisible = false;
  id:string = ''



  ngOnInit(): void {
    this.authServ.ourUser.subscribe(arrivingUser =>{
      this.user = arrivingUser
      console.log('ngOnInt', this.user);
    });

    this.postCwitForm = this.fb.group({
      text: [''],
      creationTime: [new Date()],
       url: [''],
       tags:['']
    });

    this.getOurCwit()

  }

  constructor(private authServ: AuthService,private fb: FormBuilder, private db:FirestoreService){
    this.authServ.firebaseUser.subscribe(fUser => {
      if (fUser) {
        this.fireUser = fUser;

        this.db.getOurUser(this.fireUser.uid)
    .then(data => { console.log(data);

    })
      }
    })


  }

  onSubmit(cwit: Cwit) {
    if (this.postCwitForm) {
      let newCwit = this.postCwitForm.value;
      newCwit.author = this.fireUser?.uid;
      newCwit.authorName = this.user?.username;
      newCwit.creationTime = this.postCwitForm.value.creationTime;
      return this.db.saveCwit(newCwit).then(data => newCwit = data), this.postCwitForm.reset()
    } else {
      return console.error('postCwitForm is undefined or null');
    }
  }


  togglePostForm() {
    this.postFormVisible = !this.postFormVisible;
  }


  getOurCwit() {
    this.db.getOurCwit(this.fireUser!.uid).then((result) => {
      // Handle the result as needed
      this.userCwits = result;
      console.log(this.userCwits);
    });
  }


}
