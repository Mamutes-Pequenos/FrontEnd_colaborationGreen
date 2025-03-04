import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Sala } from '../../../models/sala';
import { SalasService } from '../../../services/salas.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-salaslist',
  templateUrl: './salaslist.component.html',
  styleUrl: './salaslist.component.scss'
})
export class SalaslistComponent {
  lista: Sala[] = [];


  @Output() retorno = new EventEmitter<Sala>();
  @Input() modoLancamento: boolean = false;

  msgModal = "Nova Sala";

  objetoSelecionadoParaEdicao: Sala = new Sala();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;

  salasService = inject(SalasService);

  constructor(){
    this.listAll();
  }

  listAll() {

    this.salasService.listAll().subscribe({
      next: lista => { // QUANDO DÁ CERTO
        this.lista = lista;

      },
      error: erro => { // QUANDO DÁ ERRO
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });

  }

  // Funções da modal
  adicionar(modal: any) {
    this.msgModal = "Nova Sala"
    this.objetoSelecionadoParaEdicao = new Sala();
    this.indiceSelecionadoParaEdicao = -1;

    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

  editar(modal: any, sala: Sala, indice: number) {
    this.msgModal = "Editar Sala";
    this.objetoSelecionadoParaEdicao = Object.assign({}, sala); //clonando o objeto se for edição... pra não mexer diretamente na referência da lista
    this.indiceSelecionadoParaEdicao = indice;

    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

  addOuEditar() {
    this.listAll();
    this.modalService.dismissAll();
  }


}
