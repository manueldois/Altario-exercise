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
  current_signature$ = this.signatureService.current_signature$
  matrix_size = this.signatureService.matrix_size
  

  // Size of the refresh bar UI, in %
  refresh_bar_size$ = this.generator_timer$.pipe(
    map(time_left => time_left / this.signatureService.refresh_rate * 100)
  )

  constructor(public signatureService: SignatureService) {
    // this.current_signature$.subscribe(console.log)
  }

  onToggleGenerator() {
    this.generator_running$.next(!this.generator_running$.value)
  }

  range(max: number) {
    return new Array(max).fill(0).map((x, i) => i)
  }

}
