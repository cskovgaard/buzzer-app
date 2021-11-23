export interface Player {
  displayName?: string;
  id?: string;
  buzzerSound?: string;
  points?: number;
}

export enum PlayerEvents {
  Join = 'join',
  Buzz = 'buzz',
  ActivePlayers = 'active-players',
  ActiveBuzzes = 'active-buzzes',
  Clear = 'clear'
}