import { Component, OnInit } from '@angular/core';
import { SignatureService } from '../../services/signature.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { currencyValidator } from 'src/app/validators';

@Component({
  templateUrl: './payments-page.component.html',
  styleUrls: ['./payments-page.component.scss']
})
export class PaymentsPageComponent {
  generator_running$ = this.signatureService.generator_running$
  current_signature$ = this.signatureService.current_signature$

  new_payment_form = new FormGroup({
    payment: new FormControl('',[Validators.required]),
    amount: new FormControl('', [Validators.required, currencyValidator()])
  })
  
  get payment() { return this.new_payment_form.get('payment') }
  get amount() { return this.new_payment_form.get('amount') }


  constructor(public signatureService: SignatureService) {
  }

  onSubmitNewPaymentForm(){
    console.log(this.new_payment_form)
  }

}
