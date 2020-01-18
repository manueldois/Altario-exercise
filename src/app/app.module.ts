import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GeneratorPageComponent } from './pages/generator-page/generator-page.component';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsPageComponent } from './pages/payments-page/payments-page.component';
import { CurrentCodeComponent } from './components/current-code/current-code.component';
import { GeneratorLiveComponent } from './components/generator-live/generator-live.component';
import { PaymentsService } from './services/payments.service';
import { SignatureService } from './services/signature.service';

const routes: Routes = [
  { path: 'generator', component: GeneratorPageComponent },
  { path: 'payments', component: PaymentsPageComponent },
  { path: '', redirectTo: '/generator', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    GeneratorPageComponent,
    PaymentsPageComponent,
    CurrentCodeComponent,
    GeneratorLiveComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      routes,
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
