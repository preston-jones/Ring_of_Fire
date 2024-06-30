export interface GameInterface {
    players: string[];
    cardStack: string[];
    playedCards: string[];
    currentPlayer: number;
    currentCard: string[];
    flipCardAnimation: Boolean;
    takeCardAnimation: Boolean;
}