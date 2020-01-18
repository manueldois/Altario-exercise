import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, NEVER } from 'rxjs';
import { map, mapTo, scan, startWith, switchMap, tap } from 'rxjs/operators';

import { Matrix, Signature } from '../signature.interface';

@Injectable({
  providedIn: 'root'
})
export class SignatureService {

  refresh_rate = 2000;
  matrix_size = {width: 5, height: 5};
  current_signature$ = new BehaviorSubject<Signature | null>(null)
  generator_running$ = new BehaviorSubject(true);
  

  // Countdown timer observable to next signature refresh
  // Stops if generator not running
  generator_timer$ = this.generator_running$.pipe(
    switchMap(running => running ? interval(20).pipe(
      scan(acc => {
        // End of timer, make a new signature and reset
        if (acc + 20 > this.refresh_rate) {
          acc = 0
          const signature: Signature = {
            code: 10,
            matrix: this.makeMatrix(this.matrix_size.width, this.matrix_size.height)
          }
          this.current_signature$.next(signature)
        }
        return acc + 20
      }, 0),
      map(x => this.refresh_rate - x)
    )
      : NEVER
    ),
  )


  constructor() {
    console.log('Signature service running')
    // this.generator_timer$.subscribe(next => console.log(next))
    this.current_signature$.subscribe(next => console.log(next))
  }

  makeMatrix(width: number, height: number, prefered_char?: string): Matrix {

    // Makes a list of random alphabetic characters. If char_to_exclude is passed, that char will not be in the list
    const makeListOfRandomCharsExcludingChar = (length, char_to_exclude?) => {
      const matrix = []
      for (let i = 0; i < length; i++) {
        // Push any character expect the prefered char
        let entry = this.randomAlphaChar(char_to_exclude)
        matrix.push(entry)
      }
      return matrix
    }

    // Makes a list of 20 different random ints from min to max
    const makeListOf20DifferentRandomInts = (min = 0, max: number) => {
      const list = []
      while (list.length < 20) {
        const random_int = this.randomInt(min, max)
        // If that index is not yet in the list, insert it
        if (!list.includes(random_int)) list.push(random_int)
      }
      return list
    }

    // Makes a clone of the passed array and replaces the specified indexes with the char_to_put
    const putCharInArrayAtIndexes = (array: Array<string>, indexes: Array<number>, char_to_put: string) => {
      const array_with_char_at_indexes = [...array]
      for (let i = 0; i < indexes.length; i++) {
        array_with_char_at_indexes[indexes[i]] = char_to_put
      }
      return array_with_char_at_indexes
    }



    const matrix: Matrix = {
      width,
      height,
      data: []
    }

    matrix.data = makeListOfRandomCharsExcludingChar(width * height, prefered_char)

    // If there is a prefered char, put it at 20 random indexes in the matrix
    if (prefered_char) {
      const indices_to_put_prefered_char = makeListOf20DifferentRandomInts(0, matrix.data.length)
      matrix.data = putCharInArrayAtIndexes(matrix.data, indices_to_put_prefered_char, prefered_char)
    }

    return matrix
  }

  randomAlphaChar(char_to_exclude?: string) {
    const alphaChars = ("abcdefghijklmnopqrstuvwxyz").split("")
    const validChars = alphaChars.filter(char => char != char_to_exclude)
    return validChars[this.randomInt(0, validChars.length)]
  }

  randomInt(min: number, max: number) {
    const range = max - min
    return Math.floor(this.randomFloat01() * range + min)
  }

  randomFloat01() {
    return Math.random()
  }

}
