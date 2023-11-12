import { Component } from '@angular/core';
import { HomeService } from '../data-access/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private homeServices: HomeService){ }

  ngOnInit() {
    this.homeServices.getUserPlaylists().subscribe(resp=>console.log(resp))
    this.homeServices.getPlaylistsByCategory('artists').subscribe(resp=>console.log(resp))
    this.homeServices.getUserFeaturedPlaylists().subscribe(resp=>console.log(resp))
    this.homeServices.getPlaylistsByCategory('tracks').subscribe(resp=>console.log(resp))
  }
}
