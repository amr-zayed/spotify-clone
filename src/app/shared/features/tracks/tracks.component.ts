import { Component, Input } from '@angular/core';
import { Playlist, SimplifiedTrack, Track } from '../../utils/dataTypes';
import moment from "moment";
import { PlayerService } from 'src/app/root/data-access/player.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent {
  Tracks?: Playlist;
  @Input() set _Tracks(tracks: Playlist){
    tracks?.tracks.items.map(track=>{
      if (track.added_at !== "1970-01-01T00:00:00Z")
      track.added_at = moment(track.added_at).utc().format('YYYY-MM-DD');
    else track.added_at = ''
    })
    this.Tracks = tracks;
  }

  constructor( private playerService: PlayerService) { }
  msToTime(duration: number) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

      let secondsstr = (seconds < 10) ? "0" + String(seconds) : String(seconds);

      let time = ((hours!=0)? String(hours) + ":":'') + String(minutes) + ":" + secondsstr;
    return time;
  }
  navigateTrack(trackId: string){}
  navigateAlbum(albumId: string){
    console.log("albumId")
    console.log(albumId)
  }
  navigateArtist(artistId: string){}
  playTrack(track: Track){
    this.playerService.playTrack(track, 0).subscribe();
  }
}
