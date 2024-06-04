import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  newPlayer: {
    name: string,
    drinks: number
  }  = {
    name: 'Preston',
    drinks: 0
  };

}
