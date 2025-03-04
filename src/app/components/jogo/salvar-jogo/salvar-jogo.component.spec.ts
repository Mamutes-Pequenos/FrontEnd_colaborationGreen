import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarJogoComponent } from './salvar-jogo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('SalvarJogoComponent', () => {
  let component: SalvarJogoComponent;
  let fixture: ComponentFixture<SalvarJogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalvarJogoComponent],
      schemas: [
              CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
            ],
            imports: [HttpClientTestingModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalvarJogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
