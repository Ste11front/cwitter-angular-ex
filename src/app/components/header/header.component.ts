import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { RouterModule } from '@angular/router';
import { User } from 'firebase/auth';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {  FormsModule, ReactiveFormsModule,} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import { Cwit } from 'src/app/model/cwit';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatMenuModule, MatIconModule, MatToolbarModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: User | null = null;
  searchTerm: string = '';

  constructor(private authServ: AuthService, private db:FirestoreService){

this.authServ.firebaseUser.subscribe(firebaseUser => this.user = firebaseUser )

  }

  logout(){
    this.authServ.logOut()

  }





}
