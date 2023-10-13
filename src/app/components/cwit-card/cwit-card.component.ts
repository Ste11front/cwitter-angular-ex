import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { Cwit } from 'src/app/model/cwit';

@Component({
  selector: 'app-cwit-card',
  standalone: true,
  imports: [CommonModule,MatCardModule],
  templateUrl: './cwit-card.component.html',
  styleUrls: ['./cwit-card.component.scss']
})
export class CwitCardComponent {

  @Input() cwit?:Cwit



}
