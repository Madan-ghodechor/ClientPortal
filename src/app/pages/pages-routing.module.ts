import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { BookingPaymentComponent } from './booking-payment/booking-payment.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'search-result',
    component: SearchResultsComponent
  },
  {
    path:'booking-payment',
    component: BookingPaymentComponent
  },
  {
    path:'**',
    component: PageNotFoundComponent
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
