import { Component, OnInit } from '@angular/core';

import { Player } from '../../models/player';
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

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.players = this.playerService.getPlayers();
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
}