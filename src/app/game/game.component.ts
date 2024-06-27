import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { InfoBoxComponent } from '../info-box/info-box.component';
import { GamedataService } from '../gamedata.service';
import { GameInterface } from '../interfaces/game.interface';

/* -- Imports for Firestore -- */
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';

/* -- Imports for Material Dialog and Button -- */
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
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
  currentCard: any;
  gameData = inject(GamedataService);
  // currentCard: string = ''; /* => ERROR: TS2322: Type 'string | undefined' is not assignable to type 'string'. Type 'undefined' is not assignable to type 'string'. */
  flipCardAnimation: Boolean = false;
  takeCardAnimation: Boolean = false;

  constructor(public firestore: Firestore, public matDialog: MatDialog) {} /* Why must declare it in the constructor? */

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    this.addNote(this.game, "games");
    console.log(this.game);
  }

  async addNote(item: Game, colId: "games") {
    await addDoc(this.getNotesRef(), this.getCleanJson(item)).catch(
      (err) => { console.error(err) }
    ).then(
      (docRef) => console.log("Document written with ID: ", docRef?.id)
    )
  }


  getNotesRef() {
    return collection(this.firestore, 'games');
  }


  getCleanJson(item: GameInterface) {
    return {
      players: this.game.players,
      cardStack: this.game.cardStack,
      playedCards: this.game.playedCards,
      currentPlayer: this.gameData.currentPlayerGlobal,
    }
  }


  takeCard() {
    if (!this.takeCardAnimation && this.game.cardStack.length > 0) {
      this.currentCard = this.game.cardStack.pop();
      this.gameData.currentCardGlobal = this.currentCard;
      this.takeCardAnimation = true;
      this.gameData.currentPlayerGlobal++;
      this.gameData.currentPlayerGlobal = this.gameData.currentPlayerGlobal % this.game.players.length;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.takeCardAnimation = false;
      }, 1500);
    }
    else if (this.game.cardStack.length === 0){
      alert('No more cards');
    }
  }


  openDialog(): void {
    const dialogRef = this.matDialog.open(DialogAddPlayerComponent, {
    });

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
