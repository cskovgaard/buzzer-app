import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { ActiveRound, Player, PlayerEvents } from '../../models/player';
import { PlayerService } from '../../utils/player-service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @ViewChild('userInputRef') userInputRef!: ElementRef<HTMLInputElement>;

  players: Player[] = [];
  activePlayer: Player = { id: "" };
  isPlayerJoined: boolean = false;

  activeRound: ActiveRound;

  lockedPlayers: string[] = [];
  activeAnswer: string = '';

  options: string[] = [];
  lockedOptions: { playerId: string, option: string | number }[] = [];

  constructor(private playerService: PlayerService, private socket: Socket) {
    this.activeRound = 'regular';
  }

  ngOnInit() {
    this.players = this.playerService.getPlayers();

    this.socket.on(PlayerEvents.SetActiveRound, (data: { round: ActiveRound, options: string[] }) => {
      this.activeRound = data.round;
      this.options = data.options;
      this.activeAnswer = '';
      this.lockedOptions = [];
      this.lockedPlayers = [];
    })

    this.socket.on(PlayerEvents.ResetActiveAnswers, () => {
      this.activeAnswer = '';
      this.lockedOptions = [];
      this.resetInputField();
    });

    this.socket.on(PlayerEvents.LockedPlayers, (lockedPlayers: string[]) => {
      this.lockedPlayers = lockedPlayers;
    });

    this.socket.on(PlayerEvents.LockedOptions, (lockedOptions: { playerId: string, option: string | number }[]) => {
      this.lockedOptions = lockedOptions;
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

  onHandleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value ?? "";
    this.onAnswer(value);
  }

  resetInputField() {
    this.userInputRef.nativeElement.value = "";
  }

  isOptionLocked(option: string | number): boolean {
    return this.lockedOptions.some(locked => locked.option === option);
  }

  isOptionSelectedByCurrentPlayer(): boolean {
    return this.activeRound === 'exclusive-options' && this.activeAnswer !== '';
  }

  isMyAnswerLocked(): boolean {
    return this.lockedPlayers.includes(this.activePlayer.id);
  }

  getOptionDisabledState(option: string | number): boolean {
    // Option is disabled if it's locked by another player or if my answer is locked
    const lockedByOther = this.lockedOptions.some(
      locked => locked.option === option && locked.playerId !== this.activePlayer.id
    );
    
    return lockedByOther || this.isMyAnswerLocked();
  }
}