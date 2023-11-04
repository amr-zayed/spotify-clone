import { Component, Input } from '@angular/core';
import { Album, Artist, Playlist, Podcast } from 'src/app/shared/utils/dataTypes';

@Component({
  selector: 'app-lib-item',
  templateUrl: './lib-item.component.html',
  styleUrls: ['./lib-item.component.css']
})
export class LibItemComponent {
  @Input() type: string = '';

  @Input() set item(item: Album | Playlist | Artist | Podcast){ 
    if (this.type === 'Albums'){
      console.log('album')
      this.albumItem = item as Album;
      this.playlistItem = undefined;
      this.artistItem = undefined;
      this.podcastItem = undefined;
    }
    else if (this.type === 'Playlists') {
      this.albumItem = undefined;
      this.playlistItem = item as Playlist;
      this.artistItem = undefined;
      this.podcastItem = undefined;
    }
    else if (this.type === 'Artists') {
      console.log('artist')
      this.albumItem = undefined;
      this.playlistItem = undefined;
      this.artistItem = item as Artist;
      this.podcastItem = undefined;
    }
    else if (this.type === 'Podcasts & Shows') {
      console.log('podcast')
      this.albumItem = undefined;
      this.playlistItem = undefined;
      this.artistItem = undefined;
      this.podcastItem = item as Podcast;
    }
  };
  albumItem?: Album;
  playlistItem?: Playlist;
  artistItem?: Artist;
  podcastItem?: Podcast;
  @Input()
  isopened: boolean = true;
  constructor() { }

  // ngOnInit(): void{
  //   this.updateItems();
  // }
  // ngOnChanges(): void{
  //   console.log("amr")
  //   this.updateItems();
  // }
  openPlaylist(): void{
    console.log(this.playlistItem?.id)
  }
}
