
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Aluno } from '../../../models/aluno';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlunosService } from '../../../services/alunos.service';

@Component({
  selector: 'app-alunoslist',
  templateUrl: './alunoslist.component.html',
  styleUrl: './alunoslist.component.scss'
})
export class AlunoslistComponent {

  // lista: Aluno[] = [];

  @Output() retorno = new EventEmitter<Aluno>();
  @Output() alunoRetorno = new EventEmitter<Aluno>();

  @Input() modoLancamento: boolean = false;
  @Input() lista: Aluno[] = [];

  msgModal = "Nova Aluno";

  objetoSelecionadoParaEdicao: Aluno = new Aluno();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;

  alunosService = inject(AlunosService);

  constructor(){

  }

  lancamentoEndereco(aluno : Aluno){
    this.alunoRetorno.emit(aluno);
  }

  lancamentoAluno(aluno : Aluno){
    this.alunoRetorno.emit(aluno);
  }

  // Funções da modal
  adicionar(modal: any) {
    this.msgModal = "Novo aluno"
    this.objetoSelecionadoParaEdicao = new Aluno();
    this.indiceSelecionadoParaEdicao = -1;

    this.modalRef = this.modalService.open(modal, { size: 'md' });
  }

  editar(modal: any, sala: Aluno, indice: number) {
    this.msgModal = "Editar Aluno";
    this.objetoSelecionadoParaEdicao = Object.assign({}, sala); //clonando o objeto se for edição... pra não mexer diretamente na referência da lista
    this.indiceSelecionadoParaEdicao = indice;

    this.modalRef = this.modalService.open(modal, { size: 'md' });
  }

  delete(index: number) {
    this.lista.splice(index, 1);
  }

  addOuEditar(aluno: Aluno) {
 
    const indice = aluno.id;
    aluno.id = 1;

    if (indice == -1){
      this.lista.push(aluno);
    } else {
      this.lista[indice] = aluno;
    }
    
    this.modalRef.close();
  }
}
