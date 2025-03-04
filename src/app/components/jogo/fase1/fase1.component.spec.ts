import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fase1Component } from './fase1.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { JogoService } from '../../../services/jogo.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

describe('Fase1Component', () => {
  let component: Fase1Component;
  let fixture: ComponentFixture<Fase1Component>;
  let mockModalService: jasmine.SpyObj<NgbModal>;
  let mockJogoService: jasmine.SpyObj<JogoService>;

  beforeEach(() => {
    mockModalService = jasmine.createSpyObj('NgbModal', ['open']);

    TestBed.configureTestingModule({
      declarations: [Fase1Component],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: NgbModal, useValue: mockModalService },
        // ... outros provedores necessários
      ],
    });
    fixture = TestBed.createComponent(Fase1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal on adicionar', () => {
    const mockModalRef = jasmine.createSpyObj('NgbModalRef', ['dismiss']);
    mockModalService.open.and.returnValue(mockModalRef);

    component.adicionar('testModal');

    expect(mockModalService.open).toHaveBeenCalledWith('testModal', { size: 'md' });
    expect(mockModalRef.dismiss).not.toHaveBeenCalled();
  });

  it('should set mensagemColisao correctly when dragging over "organico" lixeira', () => {
    component.arrastando = true;
    const fakeEvent = { target: { id: 'organico' } };

    component.onDragOver(fakeEvent);

    expect(component.mensagemColisao).toEqual('Colidindo com a lixeira de Oraganico');
  });

  it('should set mensagemColisao correctly when dragging over "papel" lixeira', () => {
    component.arrastando = true;
    const fakeEvent = { target: { id: 'papel' } };

    component.onDragOver(fakeEvent);

    expect(component.mensagemColisao).toEqual('Colidindo com a lixeira de Papel');
  });

  it('should not set mensagemColisao when arrastando is false', () => {
    component.arrastando = false;
    const fakeEvent = { target: { id: 'organico' } };

    component.onDragOver(fakeEvent);

    expect(component.mensagemColisao).toEqual('');
  });

  it('should not set mensagemColisao when target id is neither "organico" nor "papel"', () => {
    component.arrastando = true;
    const fakeEvent = { target: { id: 'outra-lixeira' } };

    component.onDragOver(fakeEvent);

    expect(component.mensagemColisao).toEqual('');
  });

  it('should reset mensagemColisao when onDragOut is called', () => {
    component.mensagemColisao = 'Colidindo com a lixeira de Oraganico';

    component.onDragOut(null);

    expect(component.mensagemColisao).toEqual('');
  });

  it('should increment acertos and not show alert for correct papel items', () => {
    component.papel = [{ tipo: 'papel', url: '' }, { tipo: 'papel', url: '' }];

    component.verificarAcertosEErros();

    expect(component.acertos).toEqual(2);
    expect(component.erros).toEqual(0);
  });

  it('should increment erros and show alert for incorrect papel items', () => {
    component.papel = [{ tipo: 'papel', url: '' }, { tipo: 'metal', url: '' }];

    spyOn(window, 'alert'); // Espiona o método de alerta global

    component.verificarAcertosEErros();

    expect(component.acertos).toEqual(1);
    expect(component.erros).toEqual(1);
    expect(window.alert).toHaveBeenCalled(); // Verifica se o alerta foi chamado
  });

  it('should increment numeroDaFase and hide elements for the next phase', () => {
    component.numeroDaFase = 1;

    component.avancaFase();

    expect(component.numeroDaFase).toEqual(2);
    expect(component.botaoProximaFase.nativeElement.style.display).toEqual('none');
    expect(component.fase1LixosContainer.nativeElement.style.display).toEqual('none');
    expect(component.fase1LIXEIRAContainer.nativeElement.style.display).toEqual('none');
  });

  it('should reset arrays for the next phase', () => {
    component.numeroDaFase = 1;
    component.organico = [{ tipo: 'organico', url: '' }];
    component.papel = [{ tipo: 'papel', url: '' }];

    component.avancaFase();

    expect(component.organico.length).toEqual(0);
    expect(component.papel.length).toEqual(0);
    // Repeat for other arrays (vidro, metal, plastico) as needed
  });


  
});
