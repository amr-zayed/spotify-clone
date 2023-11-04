import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent {
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    let AlbumId = this.route.snapshot.paramMap.get('id') as string;
    console.log(AlbumId)
  }
}
