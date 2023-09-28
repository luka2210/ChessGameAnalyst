import { Injectable } from '@angular/core';
import { ChessGameService } from 'api';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private game: ChessGameService) { }

  getRandomGame = () => this.game.chessGameGet();

  getGamesByLastName = (lastName: string = 'Anand') => this.game.chessGameLastNameGet(lastName);

  getRelevantPlayers = () => this.game.chessGamePlayersGet();
}
