import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SalasdetailsComponent } from './salasdetails.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Sala } from '../../../models/sala';
import { SalasService } from '../../../services/salas.service';
import { of, throwError } from 'rxjs';

describe('SalasdetailsComponent', () => {
  let component: SalasdetailsComponent;
  let fixture: ComponentFixture<SalasdetailsComponent>;
  let mockSalasService: jasmine.SpyObj<SalasService>;

  beforeEach(async () => {
    mockSalasService = jasmine.createSpyObj('SalasService', ['save']);
    mockSalasService.save.and.returnValue(of({ id: 1, nome: 'Sala 1', professor: { id: 1, user: { id: 1, username: 'professor', password: '123', role: 'DIRETOR', token: 'mockToken' }, nome: 'Prof. Silva' }, alunos: [{id: 1,  idade:1, nome: 'a', sala: new Sala()}] }));

    await TestBed.configureTestingModule({
      declarations: [SalasdetailsComponent],
      schemas: [
              CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
            ],
            imports: [HttpClientTestingModule],
            providers: [{ provide: SalasService, useValue: mockSalasService }],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalasdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call salvar method on salvar()', () => {
    spyOn(component, 'salvar');
    
    component.salvar();
    
    expect(component.salvar).toHaveBeenCalled();
  });

  it('should emit retorno event with the correct sala on salvar()', fakeAsync(() => {
    spyOn(component.retorno, 'emit');

    component.salvar();
    tick();

    expect(component.retorno.emit).toHaveBeenCalledWith({ id: 1, nome: 'Sala 1', professor: { id: 1, user: { id: 1, username: 'professor', password: '123', role: 'DIRETOR', token: 'mockToken' }, nome: 'Prof. Silva' }, alunos: [{id: 1,  idade:1, nome: 'a', sala: new Sala()}] });
  }));

  it('should show alert on error in salvar()', fakeAsync(() => {
    mockSalasService.save.and.returnValue(throwError('Erro de teste'));

    spyOn(window, 'alert'); // Spy on the window.alert method

    component.salvar();
    tick();

    expect(window.alert).toHaveBeenCalledWith('Exemplo de tratamento de erro/exception! Observe o erro no console!');
  }));
});
