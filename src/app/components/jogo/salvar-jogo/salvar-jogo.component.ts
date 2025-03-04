import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Pontos } from '../../../models/jogo/pontos';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JogoService } from '../../../services/jogo.service';
import { Sala } from '../../../models/sala';
import { Aluno } from '../../../models/aluno';
import { SalasService } from '../../../services/salas.service';

@Component({
  selector: 'app-salvar-jogo',
  templateUrl: './salvar-jogo.component.html',
  styleUrl: './salvar-jogo.component.scss'
})
export class SalvarJogoComponent {

  @Input() desabilitaCampo!: boolean;
  @Input() score!: number;
  @Input() aluno: Aluno = new Aluno();

  @Output() retorno = new EventEmitter<Pontos>();

  salaSelecionada: Sala | null = null;

  pontos: Pontos = new Pontos();
  salas: Sala[] = [];
  alunosDaSala: Aluno[] = [];



  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;

  jogoService = inject(JogoService);
  salasService = inject(SalasService);

  constructor(){
    this.listSala();
  }

  ngOnInit() {
    // Atribuir o valor do score a pontos.score
    this.pontos.score = this.score;
  }

  listSala(){
    this.salasService.listAll().subscribe({
      next: salas => { // QUANDO DÁ CERTO
        this.salas = salas;

      },
      error: erro => { // QUANDO DÁ ERRO
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });
  }

  onSalaSelecionada() {
    // Certifique-se de que há uma sala selecionada
    if (this.salaSelecionada) {
      // Carregue os alunos associados a essa sala
      this.alunosDaSala = this.salaSelecionada.alunos || [];
    } else {
      // Se não houver sala selecionada, limpe a lista de alunos
      this.alunosDaSala = [];
    }
  }

  selecionarAluno(modal: any) {
    // Verifique se há uma sala selecionada
    if (this.salaSelecionada) {
      // Carregue os alunos associados a essa sala
      this.alunosDaSala = this.salaSelecionada.alunos || [];
  
      // Abra o modal de seleção de aluno
      this.modalRef = this.modalService.open(modal, { size: 'lg' });
    } else {
      console.warn('Nenhuma sala selecionada');
      // Adicione um tratamento adequado, como exibir uma mensagem para o usuário
    }
  }

  selecionarAlunoEFecharModal(aluno: Aluno, modal: any) {
    this.pontos.aluno = aluno;
    this.modalRef.close();
  }

  salvar() {
    console.log(this.pontos);
    //ISSO AQUI SERVE PARA EDITAR OU ADICIONAR... TANTO FAZ
    this.jogoService.save(this.pontos).subscribe({
      next: ponto => { // QUANDO DÁ CERTO
        this.retorno.emit(this.pontos);
      },
      error: erro => { // QUANDO DÁ ERRO
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });

  }

  selecionarSala(modal: any) {
    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

  selecionarSalaEFecharModal(sala: Sala, modal: any) {
    this.salaSelecionada = sala;
    sala = this.salaSelecionada;
    this.modalRef.close();
  }

  //modal para abrir a lista de alunos e selecionar um aluno.
  abrirModal(modal : any){
    this.pontos.score =this.score;
    this.modalRef = this.modalService.open(modal, {size:"lg"});
  }

  lancarAluno(modal: any){
    this.modalRef = this.modalService.open(modal, {size: "lg"});
  }

  recebeAluno(aluno: Aluno){
    this.pontos.aluno = aluno;
    this.modalRef.dismiss();
  }



}
