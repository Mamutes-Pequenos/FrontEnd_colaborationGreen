import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoslistComponent } from './alunoslist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';


describe('AlunoslistComponent', () => {
  let component: AlunoslistComponent;
  let fixture: ComponentFixture<AlunoslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlunoslistComponent],
      schemas: [
              CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
            ],
            imports: [HttpClientTestingModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlunoslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
