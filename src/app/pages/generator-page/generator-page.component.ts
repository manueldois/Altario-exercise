import { Component, OnInit } from '@angular/core';
import { SignatureService } from '../../services/signature.service'
import { interval, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './generator-page.component.html',
  styleUrls: ['./generator-page.component.scss']
})
export class GeneratorPageComponent {
  generator_running$ = this.signatureService.generator_running$
  generator_timer$ = this.signatureService.generator_timer$
  refresh_bar_size$ = this.generator_timer$.pipe(
    map(time_left => time_left / this.signatureService.refresh_rate * 100)
  )
  

  coordinates = [0,1,2,3,4,5,6,7,8,9]
  matrix = [
    ['a','b','c','a','b','c','a','b','c','a'],
    ['a','b','c','a','b','c','a','b','c','a'],
    ['a','b','c','a','b','c','a','b','c','a'],
    ['a','b','c','a','b','c','a','b','c','a'],
    ['a','b','c','a','b','c','a','b','c','a'],
    ['a','b','c','a','b','c','a','b','c','a'],
    ['a','b','c','a','b','c','a','b','c','a'],
    ['a','b','c','a','b','c','a','b','c','a'],
    ['a','b','c','a','b','c','a','b','c','a'],
    ['a','b','c','a','b','c','a','b','c','z'],
  ]

  constructor(public signatureService: SignatureService) {
  }
  
  onToggleGenerator(){
    this.generator_running$.next(!this.generator_running$.value)
  }

}
