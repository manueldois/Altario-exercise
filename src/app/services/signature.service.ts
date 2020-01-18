import { Injectable } from '@angular/core';

import {Matrix, Signature} from '../signature.interface';

@Injectable({
  providedIn: 'root'
})
export class SignatureService {


  constructor() {
    console.log('Signature service running')
  }

  generateMatrix(width: number, height: number, prefered_char?: string):Matrix {

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
    const makeListOf20DifferentRandomInts = (min = 0, max:number ) => {
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
    if(prefered_char){
        const indices_to_put_prefered_char = makeListOf20DifferentRandomInts(0,matrix.data.length)
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
