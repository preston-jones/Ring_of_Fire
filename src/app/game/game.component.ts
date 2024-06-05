import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  flipCardAnimation: Boolean = false;
  takeCardAnimation: Boolean = false;

  takeCard() {
    this.takeCardAnimation = true;
  }
}
