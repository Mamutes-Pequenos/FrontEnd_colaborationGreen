import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Aluno } from '../../../models/aluno';
import { AlunosService } from '../../../services/alunos.service';

@Component({
  selector: 'app-alunosdetails',
  templateUrl: './alunosdetails.component.html',
  styleUrl: './alunosdetails.component.scss'
})
export class AlunosdetailsComponent {

  @Input() aluno: Aluno = new Aluno();
  //@Input() indice!: number
  @Output() retorno = new EventEmitter<Aluno>();

  alunos: Aluno[] = [];

  AlunosService = inject(AlunosService);

  ngOnInit(): void {
    this.AlunosService.listAll().subscribe((aloba) => {
    this.alunos = this.alunos; 
     });
  }

  salvar() {
    this.AlunosService.salvar(this.aluno).subscribe({
      next: aluno => {
        this.retorno.emit(this.aluno);
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    })
    
    //this.aluno.id = this.indice;
  }



}
