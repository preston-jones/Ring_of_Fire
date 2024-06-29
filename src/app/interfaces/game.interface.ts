export interface GameInterface {
    players: string[];
    cardStack: string[];
    playedCards: string[];
    currentPlayer: number;
    currentCard: any;
    flipCardAnimation: Boolean;
    takeCardAnimation: Boolean;
}