import { Component } from '@angular/core';
import { Repeat } from 'src/app/shared/utils/dataTypes';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  isFavorite: boolean = false;
  isPlaying: boolean = false;
  toShuffle: boolean = false;
  repeat: Repeat = Repeat.off;
  repeatEnum = Repeat;
  // constructor(public repeatState: Repeat) { }
  addToFavorite() {
    this.isFavorite=!this.isFavorite;
  }
  togglePlayer() {
    this.isPlaying=!this.isPlaying;
  }
  toggleShuffle() {
    this.toShuffle=!this.toShuffle;
  }
  toggleRepeat(state: Repeat) {
    if (state===this.repeatEnum.off){
      this.repeat = Repeat.on
    }
    else if (state===this.repeatEnum.on){
      this.repeat = Repeat.one
    }
    if (state===this.repeatEnum.one){
      this.repeat = Repeat.off
    }
  }
}