import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-generator-live',
  templateUrl: './generator-live.component.html',
  styleUrls: ['./generator-live.component.scss']
})
export class GeneratorLiveComponent implements OnInit {
  @Input() live: boolean

  constructor() { }

  ngOnInit() {
  }

}
