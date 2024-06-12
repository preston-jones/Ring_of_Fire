import { Component, Input, inject } from '@angular/core';
import { GamedataService } from '../gamedata.service';

@Component({
  selector: 'app-dialog-card-info',
  standalone: true,
  imports: [],
  templateUrl: './dialog-card-info.component.html',
  styleUrl: './dialog-card-info.component.scss'
})
export class DialogCardInfoComponent {

  gameData = inject(GamedataService);
  currentCard = this.gameData.currentCardGlobal.split('_');
  currentCardType = this.currentCard[0];
  currentCardNumber = +this.currentCard[1];


  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: 'Touch the tabletop with your thumb. The last player to touch the table has to take a sip.' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: 'When a Queen is drawn, the person who drew the card must ask a question. The person who answers the question must drink.' },
    { title: 'Never have i ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];


  title = this.cardAction[this.currentCardNumber - 1].title;
  description: string = this.cardAction[this.currentCardNumber - 1].description;
  this.gameData.currentCardTitelGlobal = this.title;

}
