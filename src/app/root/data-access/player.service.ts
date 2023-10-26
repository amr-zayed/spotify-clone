import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }

  changeSong() {}
  getPlayerState() {}
  getCurrentSong() {}
  pausePlayback() {}
  startPlayback() {}
  skipToNextPlayback() {}
  skipToPreviousPlayback() {}
  seekToPosition() {}
  setRepeatMode() {}
  setVolume() {}
  toggleShuffle() {}
  getQueue() {}
  addToQueue() {}
}
