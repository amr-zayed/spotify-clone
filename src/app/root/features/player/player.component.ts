import { Component } from '@angular/core';
import { Repeat } from 'src/app/shared/utils/dataTypes';
import { PlayerService } from '../../data-access/player.service';
import { TimerService } from './../../../shared/data-access/timer.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent {
  toShuffle: boolean = false;
  isDisabled: boolean = false;
  constructor(public playerServices: PlayerService, public timerServices: TimerService) { }

  ngOnInit() {
    this.playerServices.initPlayer();
  }

  addToFavorite() {
    if (!this.playerServices.track!==null){
      if (this.playerServices.isFavourite) this.playerServices.removeTrackFromFavorite().subscribe()
      else this.playerServices.addTrackToFavorite().subscribe()
    }
  }
  togglePlayer() {
    if (!this.playerServices.track!==null){
      if (this.playerServices.isPlaying) this.playerServices.pausePlayback().subscribe();
      else this.playerServices.startPlayback().subscribe();
    
    }
  }
  playPrevioustrack() {
    if (!this.playerServices.track!==null){
      this.playerServices.playPreviousTrack().subscribe();
    }
  }
  playNexttrack() {
    if (!this.playerServices.track!==null){
      this.playerServices.playNextTrack().subscribe();
    }
  }
  toggleShuffle() {
    if (!this.playerServices.track!==null){
      this.playerServices.toggleShuffle().subscribe()
    }
  }
  toggleRepeat() {
    if (this.playerServices.track!==null){
      return;
    }
    if ('OFF'===this.playerServices.repeatMode){
      this.playerServices.setRepeatMode('context').subscribe();
    }
    else if ('CONTEXT'===this.playerServices.repeatMode){
      this.playerServices.setRepeatMode('track').subscribe();
    }
    else if ('TRACK'===this.playerServices.repeatMode){
      this.playerServices.setRepeatMode('off').subscribe();
    }
  }
  progressBarVal(){
    var val = document.querySelector('.player-controls-progress input[type="range"]') as HTMLInputElement;

    let range = val.value + '%';
    val.style.setProperty("--litters-range", range);

    return (this.timerServices.ms/this.timerServices.maxSeconds)*100;
  }
  clicked(){
    if (this.playerServices.isPlaying) this.playerServices.pausePlayback().subscribe();
  }
  released(val:string){
    let realTime = this.timerServices.maxSeconds * Number(val)/100;
    if (realTime>this.timerServices.maxSeconds-100) realTime = this.timerServices.maxSeconds-100;
    this.playerServices.seekTo(realTime).subscribe();
  }
}