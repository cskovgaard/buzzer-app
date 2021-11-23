import { Component, OnInit } from '@angular/core';
import { Socket } from "ngx-socket-io";

import { Player, PlayerEvents } from 'src/models/player';
import { PlayerService } from 'src/utils/player-service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent implements OnInit {
  players: Player[] = [];
  activeBuzzes: Player[] = [];
  noOfActivePlayers = 0;

  firstBuzzerSoundPlayed = false;

  constructor(private playerService: PlayerService, private socket: Socket) {}

  ngOnInit() {
    this.players = this.playerService.getPlayers();

    this.socket.on(PlayerEvents.ActiveBuzzes, (players: Player[]) => {
      this.activeBuzzes = players.filter((player, idx, self) => {
        return idx === self.findIndex((other) => other.id === player.id);
      });

      this.playBuzzerSound();
    });

    this.socket.on(PlayerEvents.ActivePlayers, (count: number) => {
      this.noOfActivePlayers = count;
    })
  }

  playBuzzerSound() {
    if (!this.firstBuzzerSoundPlayed && this.activeBuzzes.length > 0) {
      this.playerService.playBuzzerSound(this.activeBuzzes[0]);
      this.firstBuzzerSoundPlayed = true;
    }
  }

  onClearBuzzes() {
    this.playerService.clearBuzzes();
    this.firstBuzzerSoundPlayed = false;
  }

  onSetPoints(player: Player, value: number) {
    const playerIdx = this.players.findIndex((p) => p.id === player.id);

    if (this.players[playerIdx]) {
      this.players[playerIdx].points = (this.players[playerIdx].points ?? 0) + value;
    }
  }
}
