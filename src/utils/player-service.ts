import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

import { ActiveRound, Answer, Player, PlayerEvents } from "../models/player";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private socket: Socket) {}

  players: Player[] = [
    { displayName: `Brol'Danyar`, id: 'martin', buzzerSound: 'martin.mp3', points: 0 },
    { displayName: 'Brorames', id: 'joel', buzzerSound: 'joel.wav', points: 0 },
    // { displayName: 'Brond Walker', id: 'niklas', buzzerSound: 'niklas.mp3', points: 0 },
    { displayName: 'Broco Venàtor', id: 'mikkel', buzzerSound: 'mikkel.mp3', points: 0 },
    { displayName: 'BroHunter', id: 'kristian', buzzerSound: 'kristian.mp3', points: 0 },
    { displayName: 'Brouczki', id: 'kauczki', buzzerSound: 'kauczki.mp3', points: 0 },
  ];

  getPlayers(): Player[] {
    return this.players;
  }

  onPlayerJoined(player: Player) {
    this.socket.emit(PlayerEvents.Join, player);
  }

  onPlayerBuzzed(player: Player) {
    this.socket.emit(PlayerEvents.Buzz, player);
  }

  clearBuzzes() {
    this.socket.emit(PlayerEvents.Clear);
  }

  playBuzzerSound(player: Player) {
    const silence = new Audio(`/assets/buzzers/silence.mp3`);
    const audio = new Audio(`/assets/buzzers/${player.buzzerSound}`);

    silence.play();
    audio.play();
  }

  onPlayerAnswer(answer: Answer) {
    this.socket.emit(PlayerEvents.Answer, answer);
  }

  resetActiveAnswers() {
    this.socket.emit(PlayerEvents.ResetActiveAnswers);
  }

  lockActiveAnswers() {
    this.socket.emit(PlayerEvents.LockActiveAnswers);
  }

  setActiveRound(round: ActiveRound, options?: string[]) {
    this.socket.emit(PlayerEvents.SetActiveRound, { round, options })
  }

}