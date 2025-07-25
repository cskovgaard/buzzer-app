import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { ActiveRound, Player, PlayerEvents } from '../../models/player';
import { PlayerService } from '../../utils/player-service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  players: Player[] = [];
  activePlayer: Player = { id: "" };
  isPlayerJoined: boolean = false;

  activeRound: ActiveRound;

  areAnswersLocked: boolean = false;
  activeAnswer: string = '';

  options: string[] = [];

  constructor(private playerService: PlayerService, private socket: Socket) {
    this.activeRound = 'regular';
  }

  ngOnInit() {
    this.players = this.playerService.getPlayers();

    this.socket.on(PlayerEvents.SetActiveRound, (data: { round: ActiveRound, options: string[] }) => {
      this.activeRound = data.round;
      this.options = data.options;
      this.areAnswersLocked = false;
      this.activeAnswer = '';
    })

    this.socket.on(PlayerEvents.ResetActiveAnswers, () => {
      this.areAnswersLocked = false;
      this.activeAnswer = '';    
    });

    this.socket.on(PlayerEvents.LockActiveAnswers, () => {
      this.areAnswersLocked = true;
    });
  }

  onSetSelectedPlayer(player: Player) {
    this.activePlayer = player;
  }

  onSelect() {
    this.playerService.onPlayerJoined(this.activePlayer);
    this.isPlayerJoined = true;
  }

  onBuzz() {
    this.playerService.onPlayerBuzzed(this.activePlayer);
  }

  onIncreaseCounter() {
    const previousCount = parseInt(this.activeAnswer) || 0;
    const newCount = (previousCount + 1).toString();
    this.playerService.onPlayerAnswer({ playerId: this.activePlayer.id, playerDisplay: this.activePlayer.displayName, option: newCount });
    this.activeAnswer = newCount;
  }

  onAnswer(answer: string | number) {
    this.playerService.onPlayerAnswer({ playerId: this.activePlayer.id, playerDisplay: this.activePlayer.displayName, option: answer });
    this.activeAnswer = answer.toString();
  }
}