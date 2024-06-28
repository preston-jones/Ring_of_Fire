import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { InfoBoxComponent } from '../info-box/info-box.component';
import { GamedataService } from '../gamedata.service';
import { GameInterface } from '../interfaces/game.interface';
import { ActivatedRoute } from '@angular/router';

/* -- Imports for Firestore -- */
import { Firestore, collectionData, collection, addDoc, doc, onSnapshot, getDoc, updateDoc } from '@angular/fire/firestore';

/* -- Imports for Material Dialog and Button -- */
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';


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
  gameId: string = '';
  // currentCard: string = ''; /* => ERROR: TS2322: Type 'string | undefined' is not assignable to type 'string'. Type 'undefined' is not assignable to type 'string'. */
  flipCardAnimation: Boolean = false;
  takeCardAnimation: Boolean = false;
  unsubGame: any;

  constructor(private route: ActivatedRoute, public firestore: Firestore, public matDialog: MatDialog) { } /* Why must declare it in the constructor? */


  ngOnInit(): void {
    this.newGame();
    this.getCurrentGame();

  }


  ngOnDestroy() {
    this.unsubGame();
  }


  newGame() {
    this.game = new Game();
  }


  getCurrentGame() {
    this.route.params.subscribe(async (params) => {
      this.gameId = params['id'];
      const currentGameRef = this.getGameRef();

      this.unsubGame = onSnapshot(currentGameRef, (gameData) => {
        if (gameData.exists()) {
          let game = gameData.data();
          this.game.cardStack = game['cardStack'];
          this.game.players = game['players'];
          this.game.playedCards = game['playedCards'];
          this.gameData.currentPlayerGlobal = game['currentPlayer'];
        }
      });
    });
  }


  getGameRef() {
    return doc(this.firestore, "games/" + this.gameId);
  }


  getSingleGameRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }


  getCleanJson(item: GameInterface) {
    return {
      players: this.game.players,
      cardStack: this.game.cardStack,
      playedCards: this.game.playedCards,
      currentPlayer: this.gameData.currentPlayerGlobal,
    }
  }


  async updateGame() {
    let docRef = this.getSingleGameRef("games", this.gameId);
    await updateDoc(docRef, this.getCleanJson(this.game)).catch(
      (err) => { console.error(err) }
    );
  }


  takeCard() {
    if (!this.takeCardAnimation && this.game.cardStack.length > 0) {
      this.currentCard = this.game.cardStack.pop();
      this.updateGame();
      this.gameData.currentCardGlobal = this.currentCard;
      this.takeCardAnimation = true;
      this.gameData.currentPlayerGlobal++;
      this.gameData.currentPlayerGlobal = this.gameData.currentPlayerGlobal % this.game.players.length;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.takeCardAnimation = false;
        this.updateGame();
      }, 1500);
    }
    else if (this.game.cardStack.length === 0) {
      alert('No more cards');
    }
  }


  openDialog(): void {
    const dialogRef = this.matDialog.open(DialogAddPlayerComponent, {
    });

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.updateGame();
      }
    });
  }
}
