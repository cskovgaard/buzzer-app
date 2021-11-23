import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

import { Player, PlayerEvents } from "../models/player";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private socket: Socket) {}

  players: Player[] = [
    { displayName: `Brol'Danyar`, id: 'martin', buzzerSound: 'martin.wav', points: 0 },
    { displayName: 'Brorames', id: 'joel', buzzerSound: 'joel.wav', points: 0 },
    { displayName: 'Brond Walker', id: 'niklas', buzzerSound: 'niklas.wav', points: 0 },
    { displayName: 'Broco Venàtor', id: 'mikkel', buzzerSound: 'mikkel.wav', points: 0 },
    { displayName: 'BroHunter', id: 'kristian', buzzerSound: 'kristian.wav', points: 0 },
    { displayName: 'Brouczki', id: 'kauczki', buzzerSound: 'kauczki.wav', points: 0 },
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
    const audio = new Audio(`/assets/buzzers/${player.buzzerSound}`);
    audio.play();
  }

}