export interface Player {
  displayName?: string;
  id?: string;
  buzzerSound?: string;
  points?: number;
}

export interface Answer {
  playerDisplay?: string;
  playerId?: string;
  option?: string;
}

export enum PlayerEvents {
  Join = 'join',
  Buzz = 'buzz',
  ActivePlayers = 'active-players',
  ActiveBuzzes = 'active-buzzes',
  Clear = 'clear',
  Answer = 'answer',
  ActiveAnswers = 'active-answers',
  ResetActiveAnswers = 'reset-active-answers',
  LockActiveAnswers = 'lock-active-answers',
  OptionsRoundActive = 'options-round-active'
}