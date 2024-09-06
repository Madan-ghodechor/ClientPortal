import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { SearchResultsComponent } from './search-results/search-results.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BookingPaymentComponent } from './booking-payment/booking-payment.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    ContentComponent,
    SearchResultsComponent,
    BookingPaymentComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatIconModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    BsDropdownModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    MatCheckboxModule,
    MatSlideToggleModule,
    MatRadioModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    provideNativeDateAdapter(),
  ],

  exports: [
    NavBarComponent,
    FooterComponent,
    ContentComponent
  ]
})
export class PagesModule { }
