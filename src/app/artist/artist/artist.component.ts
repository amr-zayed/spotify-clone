import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent {
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    let artistId = this.route.snapshot.paramMap.get('id') as string;
    console.log(artistId)
  }
}
