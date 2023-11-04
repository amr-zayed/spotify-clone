import { Component } from '@angular/core';
import { Repeat } from 'src/app/shared/utils/dataTypes';
import { PlayerService } from '../../data-access/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  isFavorite: boolean = false;
  toShuffle: boolean = false;
  repeat: Repeat = Repeat.off;
  repeatEnum = Repeat;
  isDisabled: boolean = false;

  constructor(public playerServices: PlayerService) { }

  ngOnInit() {
    this.playerServices.initPlayer();
  }

  addToFavorite() {
    if (!this.isDisabled){
      this.isFavorite=!this.isFavorite;
    }
  }
  togglePlayer() {
    if (!this.isDisabled){
      if (this.playerServices.isPlaying) this.playerServices.pausePlayback().subscribe()
      else this.playerServices.startPlayback().subscribe()
      
    }
  }
  toggleShuffle() {
    if (!this.isDisabled){
      this.toShuffle=!this.toShuffle;
    }
  }
  toggleRepeat(state: Repeat) {
    if (this.isDisabled){
      return;
    }
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