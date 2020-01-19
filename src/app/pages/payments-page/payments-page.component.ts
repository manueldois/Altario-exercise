import { Component, OnInit } from '@angular/core';
import { SignatureService } from '../../services/signature.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { currencyValidator } from 'src/app/validators';
import { PaymentsService } from 'src/app/services/payments.service';
import { Payment } from 'src/app/types';

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

  payments$ = this.paymentsService.payments$
  
  get payment() { return this.new_payment_form.get('payment') }
  get amount() { return this.new_payment_form.get('amount') }


  constructor(public signatureService: SignatureService, public paymentsService: PaymentsService) {
    this.payments$.subscribe(console.log)
  }

  onSubmitNewPayment(){
    const new_payment: Payment = {
      name: this.new_payment_form.value.payment,
      amount: this.new_payment_form.value.amount,
      signature: this.current_signature$.value
    }

    return this.paymentsService.createPayment(new_payment)
  }

}
