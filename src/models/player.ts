export interface Player {
  id: string;
  displayName?: string;
  buzzerSound?: string;
  points?: number;
}

export interface Answer {
  playerDisplay?: string;
  playerId?: string;
  option?: string | number;
}

export type ActiveRound = 'regular' | 'options' | 'count';

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
  SetActiveRound = 'set-active-round',
}