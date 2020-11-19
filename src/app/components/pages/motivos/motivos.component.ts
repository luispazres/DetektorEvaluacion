import { Component, OnInit } from '@angular/core';
import { Motivo } from 'src/app/interfaces/motivo';
import { motivos } from '../../data/motivos';
@Component({
  selector: 'app-motivos',
  templateUrl: './motivos.component.html',
  styleUrls: ['./motivos.component.css']
})
export class MotivosComponent implements OnInit {

  motivos: Motivo[] = motivos;
  cargando = false;

  constructor() { }

  ngOnInit(): void {
  }

}
