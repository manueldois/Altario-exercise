import { Component } from '@angular/core';
import {SignatureService} from './services/signature.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'altario-exercise';
  constructor(public signatureService: SignatureService){

  } 
}
