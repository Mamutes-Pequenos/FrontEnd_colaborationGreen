import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/layout/index/index.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { SalaslistComponent } from './components/salas/salaslist/salaslist.component';
import { SalasdetailsComponent } from './components/salas/salasdetails/salasdetails.component';
import { AlunosdetailsComponent } from './components/alunos/alunosdetails/alunosdetails.component';
import { AlunoslistComponent } from './components/alunos/alunoslist/alunoslist.component';
import { LoginComponent } from './components/sistema/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { Router } from '@angular/router';
import { Fase1Component } from './components/jogo/fase1/fase1.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDrag,CdkDropList,CdkDropListGroup} from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SalvarJogoComponent } from './components/jogo/salvar-jogo/salvar-jogo.component';
import { MenuComponent } from './components/jogo/menu/menu.component';
import { DashComponent } from './components/dashboard/dash/dash.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    SalaslistComponent,
    SalasdetailsComponent,
    AlunosdetailsComponent,
    AlunoslistComponent,
    LoginComponent,
    Fase1Component,
    SalvarJogoComponent,
    MenuComponent,
    DashComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    DragDropModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    NgbModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

provideHttpClient(withFetch())
