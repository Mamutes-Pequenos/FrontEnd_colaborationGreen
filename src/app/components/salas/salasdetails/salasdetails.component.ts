import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Sala } from '../../../models/sala';
import { SalasService } from '../../../services/salas.service';
import { Aluno } from '../../../models/aluno';
import { ProfessorService } from '../../../services/professor.service';
import { Professor } from '../../../models/professor';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-salasdetails',
  templateUrl: './salasdetails.component.html',
  styleUrl: './salasdetails.component.scss'
})
export class SalasdetailsComponent {

  @Input() sala: Sala = new Sala();
  @Output() retorno = new EventEmitter<Sala>();//no deitails
  @Output() retornoAlunos = new EventEmitter<Aluno[]>();

  salaSerive = inject(SalasService);
  professorService = inject(ProfessorService);
  modalRef!: NgbModalRef;
  modalService = inject(NgbModal);

  alunoSelecionadoParaEdicao: Aluno = new Aluno();
  indiciSelecionadoParaEdicao!: number;

  constructor() {
   
    const userId = localStorage.getItem('id');
    console.log(userId);
}

  salvar() {
    //ISSO AQUI SERVE PARA EDITAR OU ADICIONAR... TANTO FAZ
    const userId = localStorage.getItem('id');
    const professor: Professor = new Professor();
    professor.id = Number(userId);
    this.sala.professor = professor;

    this.salaSerive.save(this.sala).subscribe({
      next: sala => { // QUANDO DÁ CERTO
        this.retorno.emit(sala);
      },
      error: erro => { // QUANDO DÁ ERRO
        
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });
  }

  retornoAluno(aluno: Aluno) {
    if (this.indiciSelecionadoParaEdicao >= 0) { //MODO EDITAR
      console.log("DENTRO DO EDITAR ALUNO");
      this.sala.alunos[this.indiciSelecionadoParaEdicao] = aluno;
    } else { //MODO ADICIONAR
      console.log("DENTRO DO ACIDIONAR ALUNO");
      if (this.sala.alunos == null) {
        this.sala.alunos = [];
      }
      this.sala.alunos.push(Object.assign({}, aluno));
    }
    this.modalRef.dismiss();
  }

  adicionarAluno(modal: any) {
    this.alunoSelecionadoParaEdicao = new Aluno();
    this.indiciSelecionadoParaEdicao = -1;
    this.modalRef = this.modalService.open(modal, { size: 'md' });
  }

}
