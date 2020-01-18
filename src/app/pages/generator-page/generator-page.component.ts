import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './generator-page.component.html',
  styleUrls: ['./generator-page.component.scss']
})
export class GeneratorPageComponent implements OnInit {

  constructor() {
  }

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


  ngOnInit() {
  }

}
