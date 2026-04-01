import { Component, OnInit } from '@angular/core';
import { Socket } from "ngx-socket-io";

import { ActiveRound, Answer, Player, PlayerEvents } from 'src/models/player';
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

  activeRound: ActiveRound;
  activeAnswers: Answer[] = [];
  lockedOptions: { playerId: string, option: string | number }[] = [];

  firstBuzzerSoundPlayed = false;

  constructor(private playerService: PlayerService, private socket: Socket) {
    this.activeRound = 'regular';
  }

  ngOnInit() {
    this.players = this.playerService.getPlayers();
    this.loadPointsFromLocalStorage();

    this.socket.on(PlayerEvents.ActiveBuzzes, (players: Player[]) => {
      this.activeBuzzes = players.filter((player, idx, self) => {
        return idx === self.findIndex((other) => other.id === player.id);
      });

      this.playBuzzerSound();
    });

    this.socket.on(PlayerEvents.ActivePlayers, (count: number) => {
      this.noOfActivePlayers = count;
    });

    this.socket.on(PlayerEvents.ActiveAnswers, (answers: Answer[]) => {

      const answersReversed = answers.reverse();
      this.activeAnswers = answersReversed.filter((answer, idx, self) => {
        return idx === self.findIndex((other) => other.playerId === answer.playerId);
      });

    });

    this.socket.on(PlayerEvents.LockedOptions, (lockedOptions: { playerId: string, option: string | number }[]) => {
      this.lockedOptions = lockedOptions;
    });
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
      this.savePointsToLocalStorage();
    }
  }

  savePointsToLocalStorage() {
    const pointsData = this.players.reduce((acc, player) => {
      acc[player.id] = player.points ?? 0;
      return acc;
    }, {} as { [key: string]: number });

    localStorage.setItem('buzzerPoints', JSON.stringify(pointsData));
  }

  loadPointsFromLocalStorage() {
    const savedPoints = localStorage.getItem('buzzerPoints');
    if (savedPoints) {
      try {
        const pointsData = JSON.parse(savedPoints);
        this.players.forEach(player => {
          if (pointsData[player.id] !== undefined) {
            player.points = pointsData[player.id];
          }
        });
      } catch (e) {
        console.error('Error loading points from localStorage:', e);
      }
    }
  }

  onSetActiveRound(round: ActiveRound, options?: string[]) {
    this.playerService.setActiveRound(round, options);
    this.activeRound = round;
  }

  onResetAnswers() {
    this.playerService.resetActiveAnswers();
  }

  onLockAnswers() {
    this.playerService.lockActiveAnswers();
  }

  isFirstBuzz(buzz: Player): boolean {
    return this.activeBuzzes && this.activeBuzzes.length > 0 && this.activeBuzzes[0].id === buzz.id;
  }

  getTimeDifference(buzz: Player): string {
    if (!this.activeBuzzes || this.activeBuzzes.length === 0) {
      return '';
    }

    const firstBuzz = this.activeBuzzes[0];
    if (buzz.buzzedAt === undefined || firstBuzz.buzzedAt === undefined) {
      return '';
    }

    const differenceMs = buzz.buzzedAt - firstBuzz.buzzedAt;

    if (differenceMs <= 0) {
      return '';
    }

    // Format as seconds if >= 1s, otherwise milliseconds
    if (differenceMs >= 1000) {
      return `+${(differenceMs / 1000).toFixed(1)}s`;
    } else {
      return `+${differenceMs}ms`;
    }
  }
}
