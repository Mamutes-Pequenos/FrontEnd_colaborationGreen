import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/layout/index/index.component';
import { LoginComponent } from './components/sistema/login/login.component';
import { AlunoslistComponent } from './components/alunos/alunoslist/alunoslist.component';
import { SalaslistComponent } from './components/salas/salaslist/salaslist.component';
import { routeGuardGuard } from './guards/route-guard.guard';
import { Fase1Component } from './components/jogo/fase1/fase1.component';
import { MenuComponent } from './components/jogo/menu/menu.component';
import { DashComponent } from './components/dashboard/dash/dash.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
      path: 'professor', component: IndexComponent, canActivate: [routeGuardGuard], children: [
        { path: 'salas', component: SalaslistComponent },
        { path: 'dashboard', component: DashComponent },
        {path: 'menuJogo', component: MenuComponent},
        {path: 'fase1', component: Fase1Component},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
