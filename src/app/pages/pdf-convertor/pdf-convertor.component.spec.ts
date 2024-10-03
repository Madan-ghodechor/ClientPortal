import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfConvertorComponent } from './pdf-convertor.component';

describe('PdfConvertorComponent', () => {
  let component: PdfConvertorComponent;
  let fixture: ComponentFixture<PdfConvertorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfConvertorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfConvertorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
