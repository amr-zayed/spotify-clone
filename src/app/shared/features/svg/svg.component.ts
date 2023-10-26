import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css']
})
export class SvgComponent {
  @Input() name!: String;
  @Input() width: number = 24;
  @Input() height: number = 24;
  @Input() selected: boolean = false;

  constructor() {}
}
