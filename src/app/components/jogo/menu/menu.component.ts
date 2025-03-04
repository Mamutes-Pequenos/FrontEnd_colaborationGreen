import { Component, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;
  roteador = inject(Router);


  abrirModal(modal : any){
    this.modalRef = this.modalService.open(modal, {size:"lg"});
  }

  jogar(){
    this.roteador.navigate(['/professor/fase1']);
  }
}
