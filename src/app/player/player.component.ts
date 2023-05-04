import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { Player, PlayerEvents } from '../../models/player';
import { PlayerService } from '../../utils/player-service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  players: Player[] = [];
  activePlayer: Player = {};
  isPlayerJoined: boolean = false;

  isRoundOptionsActive: boolean = false;
  areAnswersLocked: boolean = false;
  activeAnswer: string = '';

  options: string[] = ['A', 'B', 'C', 'D'];

  constructor(private playerService: PlayerService, private socket: Socket) {}

  ngOnInit() {
    this.players = this.playerService.getPlayers();

    this.socket.on(PlayerEvents.OptionsRoundActive, (isActive: boolean) => {
      this.isRoundOptionsActive = isActive;
    });

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

  onAnswer(answer: string) {
    this.playerService.onPlayerAnswer({ playerId: this.activePlayer.id, playerDisplay: this.activePlayer.displayName, option: answer });
    this.activeAnswer = answer;
  }
}