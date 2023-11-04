import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent {
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    let trackId = this.route.snapshot.paramMap.get('id') as string;
    console.log(trackId)
  }
}
