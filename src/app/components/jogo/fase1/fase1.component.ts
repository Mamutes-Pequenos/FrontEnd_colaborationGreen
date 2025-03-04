import { Component, ElementRef, Input, Output, ViewChild, inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { Elementodearrastar } from '../../../models/jogo/elementodearrastar';
import { JogoService } from '../../../services/jogo.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Pontos } from '../../../models/jogo/pontos';


@Component({
  selector: 'app-fase1',
  templateUrl: './fase1.component.html',
  styleUrls: ['./fase1.component.scss']
})
export class Fase1Component {

  lista: Pontos[] = [];


  objetoSelecionadoParaEdicao: Pontos = new Pontos();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;
  jogoService = inject(JogoService);

  listAll() {

    this.jogoService.listAll().subscribe({
      next: lista => { // QUANDO DÁ CERTO
        this.lista = lista;
      },
      error: erro => { // QUANDO DÁ ERRO
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });

  }

  adicionar(modal: any){
    this.modalRef = this.modalService.open(modal, {size: 'md'});
  }

  addOuEditarPontos(pontos: Pontos) {

    this.listAll();
    this.modalRef.dismiss();

  }

  @ViewChild('fase1LixosContainer') fase1LixosContainer!: ElementRef;
  @ViewChild('fase2LixosContainer') fase2LixosContainer!: ElementRef;
  @ViewChild('fase3LixosContainer') fase3LixosContainer!: ElementRef;
  @ViewChild('fase4LixosContainer') fase4LixosContainer!: ElementRef;
  @ViewChild('fase5LixosContainer') fase5LixosContainer!: ElementRef;

  @ViewChild('fase1LIXEIRAContainer') fase1LIXEIRAContainer!: ElementRef;
  @ViewChild('fase2LIXEIRAContainer') fase2LIXEIRAContainer!: ElementRef;
  @ViewChild('fase3LIXEIRAContainer') fase3LIXEIRAContainer!: ElementRef;
  @ViewChild('fase4LIXEIRAContainer') fase4LIXEIRAContainer!: ElementRef;
  @ViewChild('fase5LIXEIRAContainer') fase5LIXEIRAContainer!: ElementRef;

  @ViewChild('botaoProximaFase') botaoProximaFase!: ElementRef;

  fase1Lixos: Elementodearrastar[] = [];
  fase2Lixos: Elementodearrastar[] = [];
  fase3Lixos:Elementodearrastar[] = [];
  fase4Lixos:Elementodearrastar[] = [];
  fase5Lixos:Elementodearrastar[] = [];

  organico: Elementodearrastar[] = [];
  papel: Elementodearrastar[] = [];
  vidro: Elementodearrastar[] = [];
  metal: Elementodearrastar[] = [];
  plastico: Elementodearrastar[] = [];

  numeroDaFase: number = 1;

  arrastando: boolean = false;
  mensagemColisao: string = '';

  acertos: number = 0;
  erros: number = 0;
  pontuacao: number = 0;
  pontuacaoTotal: number = 0;
  pontuacaoAnterior: number = 0;


  constructor() {
    //lixos Fase 1
    //organico
    this.fase1Lixos.push(new Elementodearrastar('assets/jogoimg/organicos/banana.png', 'organico'));
    this.fase1Lixos.push(new Elementodearrastar('assets/jogoimg/organicos/maca.png', 'organico'));
    //papel
    this.fase1Lixos.push(new Elementodearrastar('assets/jogoimg/papel/cafe.png', 'papel'));
    this.fase1Lixos.push(new Elementodearrastar('assets/jogoimg/papel/sacola.png', 'papel'));
    
    
    //lixos fase 2
    //vidro
    this.fase2Lixos.push(new Elementodearrastar('assets/jogoimg/vidro/taca.png', 'vidro'));
    this.fase2Lixos.push(new Elementodearrastar('assets/jogoimg/vidro/vinho.png', 'vidro'));
    //organico
    this.fase2Lixos.push(new Elementodearrastar('assets/jogoimg/organicos/banana.png', 'organico'));
    this.fase2Lixos.push(new Elementodearrastar('assets/jogoimg/organicos/maca.png', 'organico'))


    //lixos fase 3
    //vidro
    this.fase3Lixos.push(new Elementodearrastar('assets/jogoimg/vidro/taca.png', 'vidro'));
    this.fase3Lixos.push(new Elementodearrastar('assets/jogoimg/vidro/vinho.png', 'vidro'));
    //metal
    this.fase3Lixos.push(new Elementodearrastar('assets/jogoimg/metal/lata.png', 'metal'));
    //papel
    this.fase3Lixos.push(new Elementodearrastar('assets/jogoimg/papel/cafe.png', 'papel'));
    this.fase3Lixos.push(new Elementodearrastar('assets/jogoimg/papel/sacola.png', 'papel'));


    //lixos fase 4
    //organico
    this.fase4Lixos.push(new Elementodearrastar('assets/jogoimg/organicos/banana.png', 'organico'));
    this.fase4Lixos.push(new Elementodearrastar('assets/jogoimg/organicos/maca.png', 'organico'));
    //METAL
    this.fase4Lixos.push(new Elementodearrastar('assets/jogoimg/metal/lata.png', 'metal'));
    //PLASTICO
    this.fase4Lixos.push(new Elementodearrastar('assets/jogoimg/plastico/garrafa.png', 'plastico'));
    //papel
    this.fase4Lixos.push(new Elementodearrastar('assets/jogoimg/papel/cafe.png', 'papel'));
    this.fase4Lixos.push(new Elementodearrastar('assets/jogoimg/papel/sacola.png', 'papel'));


    //lixos fase 5
    //organico 
    this.fase5Lixos.push(new Elementodearrastar('assets/jogoimg/organicos/banana.png', 'organico'));
    this.fase5Lixos.push(new Elementodearrastar('assets/jogoimg/organicos/maca.png', 'organico'));
    //METAL
    this.fase5Lixos.push(new Elementodearrastar('assets/jogoimg/metal/lata.png', 'metal'));
    //PLASTICO
    this.fase5Lixos.push(new Elementodearrastar('assets/jogoimg/plastico/garrafa.png', 'plastico'));
    //papel
    this.fase5Lixos.push(new Elementodearrastar('assets/jogoimg/papel/cafe.png', 'papel'));
    this.fase5Lixos.push(new Elementodearrastar('assets/jogoimg/papel/sacola.png', 'papel'));
    //vidro
    this.fase5Lixos.push(new Elementodearrastar('assets/jogoimg/vidro/taca.png', 'vidro'));
    this.fase5Lixos.push(new Elementodearrastar('assets/jogoimg/vidro/vinho.png', 'vidro'));


  }

  drop(event: CdkDragDrop<Elementodearrastar[]>) {

    let objetoArrastado: Elementodearrastar = event.previousContainer.data[event.previousIndex];
    let containerOrigem: CdkDropList = event.previousContainer;
    let containerDestino: CdkDropList = event.container;

    if (event.previousContainer === event.container) {
      //não trocou de container, só de posição no mesmo container
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      //trocou de container
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.verificarAcertosEErros(); //tem que ser depois de transferir
      this.apareceBotaoProximaFase();
    }

  }

  apareceBotaoProximaFase(){
    if(this.fase1Lixos.length == 0 && this.erros == 0 && this.numeroDaFase == 1){
      this.botaoProximaFase.nativeElement.style.display = 'block';
    }
    else if(this.fase2Lixos.length == 0 && this.erros == 0 && this.numeroDaFase == 2){
      this.botaoProximaFase.nativeElement.style.display = 'block';
    }
    else if(this.fase3Lixos.length == 0 && this.erros == 0 && this.numeroDaFase == 3){
      this.botaoProximaFase.nativeElement.style.display = 'block';
    }
    else if(this.fase4Lixos.length == 0 && this.erros == 0 && this.numeroDaFase == 4){
      this.botaoProximaFase.nativeElement.style.display = 'block';
    }
    else if(this.fase5Lixos.length == 0 && this.erros == 0 && this.numeroDaFase == 5){
      console.log("MODAL CADASTRAR");

    }
  }

  onDragOver(event: any) {
    if (this.arrastando) {
      if (event.target.id == 'organico')
        this.mensagemColisao = 'Colidindo com a lixeira de Oraganico';
      if (event.target.id == 'papel')
        this.mensagemColisao = 'Colidindo com a lixeira de Papel';
    }
  }

  onDragOut(event: any) {
    this.mensagemColisao = '';
  }


  verificarAcertosEErros() {
    this.acertos = 0;
    this.erros = 0;

    //VERIFICANDO ACERTO E ERROS DE Papel
    if (this.papel != null)
      for (let i = 0; i < this.papel.length; i++) {
        if (this.papel[i].tipo == 'papel'){
          this.acertos++;               
        }  
        else{
          this.erros++;
          this.mostrarAlertaErro();
        }
          
      }

    //VERIFICANDO ACERTO E ERROS DE Organico
    if (this.organico != null)
      for (let i = 0; i < this.organico.length; i++) {
        if (this.organico[i].tipo == 'organico'){
          this.acertos++;
        }
          
        else{
          this.erros++;
          this.mostrarAlertaErro();
        }
          
      }

      //VERIFICANDO ACERTO E ERROS DE Vidro
    if (this.vidro != null)
      for (let i = 0; i < this.vidro.length; i++) {
        if (this.vidro[i].tipo == 'vidro'){
          this.acertos++;               
        }  
        else{
          this.erros++;
          this.mostrarAlertaErro();
        }
          
      }

      //VERIFICANDO ACERTO E ERROS DE Metal
    if (this.metal != null)
      for (let i = 0; i < this.metal.length; i++) {
        if (this.metal[i].tipo == 'metal'){
          this.acertos++;               
        }  
        else{
          this.erros++;
          this.mostrarAlertaErro();
        }
          
      }

        //VERIFICANDO ACERTO E ERROS DE Plastico
    if (this.plastico != null)
      for (let i = 0; i < this.plastico.length; i++) {
        if (this.plastico[i].tipo == 'plastico'){
          this.acertos++;               
        }  
        else{
          this.erros++;
          this.mostrarAlertaErro();
        }
          
      }

      this.pontuacao = this.acertos*10 + this.pontuacaoAnterior;
      this.pontuacaoTotal = this.pontuacao;

  }

  mostrarAlertaErro() {
    alert('Você colocou o item no lugar errado!');
  }

  avancaFase(){
    this.numeroDaFase++;
    this.botaoProximaFase.nativeElement.style.display = 'none';

    // Esconde as lixeiras e lixos da fase anterior
    switch (this.numeroDaFase) {
      case 2:
        this.pontuacaoAnterior = this.pontuacaoTotal;
        this.fase1LixosContainer.nativeElement.style.display = 'none';
        this.fase1LIXEIRAContainer.nativeElement.style.display = 'none';
        
        break;
      case 3:
        this.pontuacaoAnterior = this.pontuacaoTotal;
        this.fase2LixosContainer.nativeElement.style.display = 'none';
        this.fase2LIXEIRAContainer.nativeElement.style.display = 'none';
        break;
      case 4:
        this.pontuacaoAnterior = this.pontuacaoTotal;
        this.fase3LixosContainer.nativeElement.style.display = 'none';
        this.fase3LIXEIRAContainer.nativeElement.style.display = 'none';
        break;
      case 5:
        this.pontuacaoAnterior = this.pontuacaoTotal;
        this.fase4LixosContainer.nativeElement.style.display = 'none';
        this.fase4LIXEIRAContainer.nativeElement.style.display = 'none';
        break;
      // Adicione outros casos conforme necessário
    }

    // Atualiza as lixeiras e lixos da próxima fase
    switch (this.numeroDaFase) {
      case 2:
        this.fase2LixosContainer.nativeElement.style.display = 'block';
        this.fase2LIXEIRAContainer.nativeElement.style.display = 'flex';
        break;
      case 3:
        this.fase3LixosContainer.nativeElement.style.display = 'block';
        this.fase3LIXEIRAContainer.nativeElement.style.display = 'flex';
        break;
      case 4:
        this.fase4LixosContainer.nativeElement.style.display = 'block';
        this.fase4LIXEIRAContainer.nativeElement.style.display = 'flex';
        break;
      case 5:
        this.fase5LixosContainer.nativeElement.style.display = 'block';
        this.fase5LIXEIRAContainer.nativeElement.style.display = 'flex';
        break;
      // Adicione outros casos conforme necessário
    }

    switch (this.numeroDaFase) {
      case 2:
        this.organico = [];
        this.papel = [];
        this.vidro = [];
        this.metal = [];
        this.plastico = [];
        break;
      case 3:
        this.organico = [];
        this.papel = [];
        this.vidro = [];
        this.metal = [];
        this.plastico = [];
        break;
      case 4:
        this.organico = [];
        this.papel = [];
        this.vidro = [];
        this.metal = [];
        this.plastico = [];
        break;
      case 5:
        this.organico = [];
        this.papel = [];
        this.vidro = [];
        this.metal = [];
        this.plastico = [];
        break;
      // Adicione outros casos conforme necessário
    }

  }

}


