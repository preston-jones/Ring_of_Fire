import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { InfoBoxComponent } from '../info-box/info-box.component';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

/* -- Imports for Material Dialog and Button -- */
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent, InfoBoxComponent,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    DialogAddPlayerComponent,
    FormsModule,
    MatFormField,
    MatLabel
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  game!: Game;
  currentCard: any;;
  flipCardAnimation: Boolean = false;
  takeCardAnimation: Boolean = false;

  constructor(public matDialog: MatDialog) {} /* Why must declare it in the constructor? */

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


  openDialog(): void {
    const dialogRef = this.matDialog.open(DialogAddPlayerComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
