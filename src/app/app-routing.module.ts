import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MotivoComponent } from './components/pages/motivo/motivo.component';
import { MotivosComponent } from './components/pages/motivos/motivos.component';

const routes: Routes = [
  { path: 'motivos', component: MotivosComponent },
  { path: 'motivo/:id', component: MotivoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'motivos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
