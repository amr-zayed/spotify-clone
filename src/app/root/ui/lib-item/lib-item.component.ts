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
      console.log('playlist')
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
  private updateItems(): void{
    if (this.type==='Playlists') {
      this.playlistItem = this.item as Playlist;
    }
    else if (this.type==='Artists') {
      this.artistItem = this.item as Artist;
    }
    else if (this.type==='Albums') {
      this.albumItem = this.item as Album;
    }
    else if (this.type==='Podcasts & Shows') {
      this.podcastItem = this.item as Podcast;
    }
  }
}
