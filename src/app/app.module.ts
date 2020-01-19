import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GeneratorPageComponent } from './pages/generator-page/generator-page.component';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsPageComponent } from './pages/payments-page/payments-page.component';
import { CurrentCodeComponent } from './components/current-code/current-code.component';
import { GeneratorLiveComponent } from './components/generator-live/generator-live.component';

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
    ReactiveFormsModule,
    RouterModule.forRoot(
      routes,
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
