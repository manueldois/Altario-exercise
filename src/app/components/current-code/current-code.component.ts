import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-current-code',
  templateUrl: './current-code.component.html',
  styleUrls: ['./current-code.component.scss']
})
export class CurrentCodeComponent implements OnInit {
  @Input() code: string = ''

  constructor() { }

  ngOnInit() {
  }

}
