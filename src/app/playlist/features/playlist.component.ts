import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PlaylistService } from './../data-access/playlist.service';
import { Playlist } from 'src/app/shared/utils/dataTypes';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
  host: {
    class:'main-view-child'
  }
})
export class PlaylistComponent {
  playlist?:Playlist;
  // track?:Track;
  constructor(private router: Router, private route: ActivatedRoute, private playlistServices: PlaylistService) { }
  ngOnInit() {
    let playlistId = this.route.snapshot.paramMap.get('id') as string;
    this.playlistServices.getPlaylistById(playlistId).subscribe(playlist=>{
      let tempPlaylist = {...playlist}
      if ((tempPlaylist.description as string)[0] ==='<'){
        tempPlaylist.description = '';
      }
      this.playlist=tempPlaylist
      console.log(this.playlist);
    });
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(_=>{
      playlistId = this.route.snapshot.paramMap.get('id') as string;
      this.playlistServices.getPlaylistById(playlistId).subscribe(playlist=>{
        let tempPlaylist = {...playlist}
        if ((tempPlaylist.description as string)[0] ==='<'){
          tempPlaylist.description = '';
        }
        this.playlist=tempPlaylist
      });
    })
  }
}
