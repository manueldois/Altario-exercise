import { Component, OnInit } from '@angular/core';
import { SignatureService } from '../../services/signature.service'
import { interval, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Signature } from 'src/app/types';

@Component({
  templateUrl: './generator-page.component.html',
  styleUrls: ['./generator-page.component.scss']
})
export class GeneratorPageComponent {
  matrix_size = this.signatureService.matrix_size
  generator_interval = this.signatureService.generator_interval

  generator_running$ = this.signatureService.generator_running$
  generator_timer$ = this.signatureService.generator_timer$
  current_signature$ = this.signatureService.current_signature$

  current_signature: Signature | null = null
  

  // Size of the refresh bar UI, in %
  refresh_bar_size$ = this.generator_timer$.pipe(
    map(time_left => time_left / this.generator_interval * 100)
  )

  constructor(public signatureService: SignatureService) {
    // Destruct the current_signature observable to a normal variable to render in the DOM
    // This avoids the use of the async pipe, and making a new subscrition for every cell of the matrix
    this.current_signature$.subscribe(signature => this.current_signature = signature)
  }

  onToggleGenerator() {
    this.generator_running$.next(!this.generator_running$.value)
  }

  range(max: number) {
    return new Array(max).fill(0).map((x, i) => i)
  }

}
