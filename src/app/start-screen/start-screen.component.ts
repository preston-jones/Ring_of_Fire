import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  playerName: string = 'Preston';

  constructor(private router: Router) { }


  newGame() {
    console.log('Starting a new game');
    console.log('Player: ' + this.playerName);
    this.router.navigateByUrl("/game");
  }
}
