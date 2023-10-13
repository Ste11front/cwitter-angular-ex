import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Cwit } from 'src/app/model/cwit';
import { CwitCardComponent } from '../cwit-card/cwit-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CwitCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  cwits: Cwit[] = [];

  constructor(private firestore: FirestoreService){}

  ngOnInit(): void {
    this.firestore.getCwits()
    .then(data => {
      console.log(data)
      this.cwits = data as Cwit[]
    })
  }

}
