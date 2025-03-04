import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaslistComponent } from './salaslist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SalasService } from '../../../services/salas.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Aluno } from '../../../models/aluno';
import { Sala } from '../../../models/sala';
import { User } from '../../../models/user';
import { Professor } from '../../../models/professor';

describe('SalaslistComponent', () => {
  let component: SalaslistComponent;
  let fixture: ComponentFixture<SalaslistComponent>;
  let mockModalService: jasmine.SpyObj<NgbModal>;
  let mockSalasService: jasmine.SpyObj<SalasService>;

  beforeEach(async () => {
    mockModalService = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);
    mockSalasService = jasmine.createSpyObj('SalasService', ['listAll']);

    const mockAluno: Aluno = {
      id: 1,
      idade: 20,
      nome: 'João',
      sala: new Sala(),
    };

    const mockProfessor: Professor = {
      id: 1,
      user: new User(),
      nome: 'Prof. Silva',
    };

    const mockSala: Sala[] = [
      {
        id: 1,
        nome: 'Sala 1',
        professor: mockProfessor,
        alunos: [mockAluno],
      },
      {
        id: 2,
        nome: 'Sala 2',
        professor: mockProfessor,
        alunos: [],
      },
    ];

    mockSalasService.listAll.and.returnValue(of(mockSala));

    await TestBed.configureTestingModule({
      declarations: [SalaslistComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: NgbModal, useValue: mockModalService },
        { provide: SalasService, useValue: mockSalasService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SalaslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call listAll of SalasService on initialization', () => {
    expect(mockSalasService.listAll).toHaveBeenCalled();
  });

  it('should open modal with correct message in adicionar method', () => {
    const mockModalRef: jasmine.SpyObj<NgbModalRef> = jasmine.createSpyObj('NgbModalRef', ['componentInstance', 'result']);
    mockModalService.open.and.returnValue(mockModalRef);
  
    component.adicionar(null); // Passando null para o modal (pode ajustar conforme a necessidade)
  
    expect(mockModalService.open).toHaveBeenCalledOnceWith(null, { size: 'lg' });
    expect(component.msgModal).toEqual('Nova Sala');
  });

  it('should open modal with correct message in editar method', () => {
    const mockModalRef: jasmine.SpyObj<NgbModalRef> = jasmine.createSpyObj('NgbModalRef', ['componentInstance', 'result']);
    mockModalService.open.and.returnValue(mockModalRef);
  
    const mockSala: Sala = {
      id: 1,
      nome: 'Sala 1',
      professor: { id: 1, user: { id: 1, username: 'professor', password: '123', role: 'ROLE_PROFESSOR', token: 'mockToken' }, nome: 'Prof. Silva' },
      alunos: [],
    };
  
    component.editar(null, mockSala, 0); // Passando null para o modal (pode ajustar conforme a necessidade)
  
    expect(mockModalService.open).toHaveBeenCalledOnceWith(null, { size: 'lg' });
    expect(component.msgModal).toEqual('Editar Sala');
    expect(component.objetoSelecionadoParaEdicao).toEqual(mockSala);
    expect(component.indiceSelecionadoParaEdicao).toEqual(0);
  });

  // Add mor
});