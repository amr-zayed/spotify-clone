import { Component, Input } from '@angular/core';
import { Playlist, SimplifiedTrack, Track } from '../../utils/dataTypes';
import moment from "moment";
import { PlayerService } from 'src/app/root/data-access/player.service';
import { TracksService } from '../../data-access/tracks.service';
import { AuthService } from '../../data-access/auth.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent {
  Tracks?: Playlist;
  isFavorite: boolean = false;
  
  @Input() set _Tracks(tracks: Playlist){
    tracks?.tracks.items.map(track=>{
      if (track.added_at !== "1970-01-01T00:00:00Z")
      track.added_at = moment(track.added_at).utc().format('YYYY-MM-DD');
    else track.added_at = ''
    })
    this.Tracks = tracks;
  }

  constructor( public playerService: PlayerService, private tracksService: TracksService, private auth: AuthService) { }
  ngOnInit() {
    if (this.Tracks && this.auth.user){
      this.tracksService.checkFavoritePlaylists(this.Tracks.id, [this.auth.user.id]).subscribe(resp=>this.isFavorite=resp[0]);
    }
  }
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
  playTrack(track: Spotify.Track, position: number){
    this.playerService.playMultiple(track, 0, this.Tracks!.uri, position).subscribe();
  }
  startTracks(){
    console.log(this.playerService.isPlaying);
    if (this.playerService.isPlaying && this.checkIfTracksActive()) this.playerService.pausePlayback().subscribe()
    else if (!this.playerService.isPlaying && this.checkIfTracksActive()) this.playerService.startPlayback().subscribe()
    else this.playerService.playMultiple(this.Tracks?.tracks.items[0].track!, 0, this.Tracks!.uri, 0).subscribe();
  }

  checkIfTracksActive() {
    return this.playerService.tracksUri===this.Tracks?.uri;
  }
  toggleFavorite() {
    console.log('sdfrdssd')
    if(this.Tracks){
      if(this.isFavorite){
        this.tracksService.followPlaylists(this.Tracks.id).subscribe(_=>this.isFavorite = true)
      }else this.tracksService.unfollowPlaylists(this.Tracks.id).subscribe(_=>this.isFavorite = false)
    }
  }
}
