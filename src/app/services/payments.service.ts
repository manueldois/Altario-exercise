import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Payment } from '../types';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  payments$ = new BehaviorSubject<Payment[]>([])

  constructor() {
  }

  createPayment(new_payment: Payment){
    // Send payment to API
    // If payment successful, add to local payments list
    const updated_payments:Payment[] = [... this.payments$.value] // Or from API
    updated_payments.push(new_payment)

    this.payments$.next(updated_payments)

    return true
  }
}
