import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamedataService {

  constructor() { }

  currentCard: string = '';
  currentPlayerGlobal: number = 0;
  currentCardTitelGlobal: string = '';
}
