import { Component } from '@angular/core';
import { HomeService } from '../data-access/home.service';
import { Artist, Playlist } from 'src/app/shared/utils/dataTypes';

interface homeSections{
  items: Playlist[] | Artist[],
  message: string
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  Sections: homeSections[] = [];
  constructor(private homeServices: HomeService){ }

  ngOnInit() {
    this.homeServices.getUserPlaylists().subscribe(resp=>this.Sections.push({items:resp, message:'Good Morning'}))
    this.homeServices.getPlaylistsByCategory('artists').subscribe(resp=>{
      console.log(resp)
      if (resp)
      this.Sections.push({items:resp.items, message:'Popular Artists'});
    })
    this.homeServices.getUserFeaturedPlaylists().subscribe(resp=>{
      if (resp)
      this.Sections.push({items:resp.playlists.items, message:resp.message});
    })
    this.homeServices.getPlaylistsByCategory('tracks').subscribe(resp=>console.log(resp))
  }
}
