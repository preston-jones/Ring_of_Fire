import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  game!: Game;
  currentCard: any;;
  flipCardAnimation: Boolean = false;
  takeCardAnimation: Boolean = false;

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.takeCardAnimation && this.game.cardStack.length > 0) {
      this.currentCard = this.game.cardStack.pop();
      console.log(this.currentCard);
      this.takeCardAnimation = true;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.takeCardAnimation = false;
        console.log(this.game.cardStack.length);
      }, 1500);
    }
    else if (this.game.cardStack.length === 0){
      alert('No more cards');
    }
  }
}
