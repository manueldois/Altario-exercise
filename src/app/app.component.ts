import { Component } from '@angular/core';
import {SignatureService} from './services/signature.service';
import { PaymentsService } from './services/payments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Altario cryptowallet';

  // Instanciate both services on startup
  constructor(public signatureService: SignatureService, public paymentsService: PaymentsService){ } 
}
