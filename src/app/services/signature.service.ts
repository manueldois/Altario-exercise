import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, NEVER } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Matrix, Signature, Coords } from '../types';

@Injectable({
  providedIn: 'root'
})
export class SignatureService {

  matrix_size = { width: 10, height: 10 };
  generator_interval = 1000; // time to refresh in ms
  alpha_chars = ("abcdefghijklmnopqrstuvwxyz").toUpperCase().split("") // Chars to use in the matrix
  
  generator_running$ = new BehaviorSubject(true);
  generator_timer$ = new BehaviorSubject<number | null>(null)
  current_signature$ = new BehaviorSubject<Signature | null>(null)
  
  prefered_char: string = ''

  constructor() {

    // Main generator loop
    this.generator_running$.pipe(
      switchMap(on => on ? interval(20) : NEVER), // If the generator is running, start an interval of 20ms, else stop everything upcoming
      map(i => i * 20), // interval counts up: 1, 2, 3. Multiplied by the interval time we get ellapsed time in ms [0, +inf[
      map(t => t % this.generator_interval), // Forms a cycle [0, generator_interval[
      map(c => this.generator_interval - c) // Time remaining to refresh [0, generator_interval[
    ).subscribe(tl => {
      this.generator_timer$.next(tl) // Put time left to refresh to app wide countdown timer
      if (tl <= 20) { // When the timer reaches the last tick before refresh
        const next_signature = this.makeSignature(10, 10, this.prefered_char) // Make a new signature
        this.current_signature$.next(next_signature) // And put it to app wide current signature subject
      }
    })

  }

  setPreferedChar(char: string) {
    this.prefered_char = char
  }

  setGeneratorRunning(live: boolean){
    this.generator_running$.next(live)
  }

  makeSignature(width: number, height: number, prefered_char?: string): Signature {

    const getCodeFromMatrix = (matrix: Matrix): string => {

      const countOccurrencesInArray = (array: Array<any>, x: any): number => {
        let count = 0;
        for (let i = 0; i < array.length; i++) {
          if (array[i] === x) count++
        }
        return count
      }

      let seconds:string[] = new Date().getSeconds().toString().split('') // Seconds with separated digits: 35 => [3,5], 9 => [9]
      if (seconds.length === 1) seconds.unshift('0') // Unshift zero if seconds have just one char: [9] => [0,9]

      // Coords of the matrix where to look for a char eg: {x: 2, y: 8}
      const coords_a: Coords = { x: parseInt(seconds[0]), y: parseInt(seconds[1]) }
      const coords_b: Coords = { x: parseInt(seconds[1]), y: parseInt(seconds[0]) }

      // The characters from the matrix to use eg: "K"
      const char_a = matrix.getChar(coords_a) 
      const char_b = matrix.getChar(coords_b)

      // The count of each character eg: "K" => 13
      const n_occurrences_a = countOccurrencesInArray(matrix.data, char_a)
      const n_occurrences_b = countOccurrencesInArray(matrix.data, char_b)

      // Code digit a and b are the count of each character mod 10 eg: 13 => 3
      const code_a = n_occurrences_a % 10
      const code_b = n_occurrences_b % 10

      // The final code as a string eg: a: 3, b: 1 => "31"
      const code = code_a.toString() + code_b.toString()

      return code
    }

    const matrix: Matrix = this.makeMatrix(width, height, prefered_char)
    const signature: Signature = {
      matrix,
      code: getCodeFromMatrix(matrix)
    }
    return signature
  }

  makeMatrix(width: number, height: number, prefered_char?: string): Matrix {
    // Matrix is an object {width, height, data}
    // Data is a 1D array of chars

    // Makes a list of random alphabetic characters. If char_to_exclude is passed, that char will not be in the list
    const makeListOfRandomCharsExcludingChar = (length, char_to_exclude?) => {
      const list = []
      for (let i = 0; i < length; i++) {
        // Push any character expect the prefered char
        let entry = this.randomAlphaChar(char_to_exclude)
        list.push(entry)
      }
      return list
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
      const array_with_char_at_indexes = [...array] // Clone so as not to mutate the original
      for (let i = 0; i < indexes.length; i++) {
        const index = indexes[i] // Pick an index from the indexes list
        array_with_char_at_indexes[index] = char_to_put // Put the char at that index in array
      }
      return array_with_char_at_indexes
    }



    const matrix = new Matrix()
    matrix.width = width; matrix.height = height;
    matrix.data = makeListOfRandomCharsExcludingChar(width * height, prefered_char)

    // If there is a prefered char, put it at 20 random indexes in the matrix
    if (prefered_char) {
      const indices_to_put_prefered_char = makeListOf20DifferentRandomInts(0, matrix.data.length)
      matrix.data = putCharInArrayAtIndexes(matrix.data, indices_to_put_prefered_char, prefered_char)
    }

    return matrix
  }

  randomAlphaChar(char_to_exclude?: string) {
    const valid_chars = this.alpha_chars.filter(char => char != char_to_exclude)
    return valid_chars[this.randomInt(0, valid_chars.length)]
  }

  randomInt(min: number, max: number) {
    const range = max - min
    return Math.floor(this.randomFloat01() * range + min)
  }

  randomFloat01() {
    // Central source for random
    return Math.random()
  }

}
