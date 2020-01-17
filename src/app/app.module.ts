import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GeneratorPageComponent } from './pages/generator-page/generator-page.component';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsPageComponent } from './pages/payments-page/payments-page.component';

const routes: Routes = [
  { path: 'generator', component: GeneratorPageComponent },
  { path: 'payments', component: PaymentsPageComponent },
  { path: '', redirectTo: '/generator', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    GeneratorPageComponent,
    PaymentsPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
