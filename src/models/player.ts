export interface Player {
  id: string;
  displayName?: string;
  buzzerSound?: string;
  points?: number;
  buzzedAt?: number;
}

export interface Answer {
  playerDisplay?: string;
  playerId: string;
  option?: string | number;
}

export type ActiveRound = 'regular' | 'options' | 'exclusive-options' | 'count' | 'input';

export interface RoundOptions {
  round: ActiveRound;
  options?: string[];
  individualLocking?: boolean;
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
  SetActiveRound = 'set-active-round',
  LockedOptions = 'locked-options',
  LockedPlayers = 'locked-players',
  LockPlayer = 'lock-player',
  UnlockPlayer = 'unlock-player',
  SetLockedPlayers = 'set-locked-players',
}