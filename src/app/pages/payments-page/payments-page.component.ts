import { Component, OnInit } from '@angular/core';
import { SignatureService } from '../../services/signature.service';

@Component({
  templateUrl: './payments-page.component.html',
  styleUrls: ['./payments-page.component.scss']
})
export class PaymentsPageComponent implements OnInit {
  generator_running$ = this.signatureService.generator_running$
  current_signature$ = this.signatureService.current_signature$

  constructor(public signatureService: SignatureService) {
  }

  ngOnInit() {
  }

}
