import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../models/game';
import { Firestore, collectionData, collection, addDoc, doc, onSnapshot, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {


  constructor(private firestore: Firestore, private router: Router) { }


  async newGame() {
    let game: Game = new Game();
    game = {
      players: game.players,
      cardStack: game.cardStack,
      playedCards: game.playedCards,
      currentPlayer: game.currentPlayer,
      currentCard: game.currentCard,
      flipCardAnimation: game.flipCardAnimation,
      takeCardAnimation: game.takeCardAnimation
    }
    let gameRef = collection(this.firestore, "games");
    await addDoc(gameRef, game).catch(
      (err) => { console.error(err) }
    ).then(
      (docRef) => {this.router.navigateByUrl("/game/" + docRef?.id)}
    )
  }
}