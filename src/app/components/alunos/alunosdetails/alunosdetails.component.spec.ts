import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosdetailsComponent } from './alunosdetails.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';


describe('AlunosdetailsComponent', () => {
  let component: AlunosdetailsComponent;
  let fixture: ComponentFixture<AlunosdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlunosdetailsComponent],
      schemas: [
              CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
            ],
            imports: [HttpClientTestingModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlunosdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
