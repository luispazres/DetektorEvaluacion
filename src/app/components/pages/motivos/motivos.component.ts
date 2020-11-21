import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataTableDirective } from 'angular-datatables';

import { Motivo } from 'src/app/interfaces/motivo';
import { motivos } from '../../data/motivos';
import { MotivosService } from '../../../services/motivos.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-motivos',
  templateUrl: './motivos.component.html',
  styleUrls: ['./motivos.component.css']
})
export class MotivosComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;

  motivos: Motivo[] = motivos;
  cargando = false;

  constructor( public router: Router, private motivosService: MotivosService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.motivosService.getMotivos()
      .subscribe( resp => {
        this.motivos = resp;
        this.cargando = false;
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.columns().every(function () {
            const that = this;
            $('input', this.footer()).on('keyup change', function () {
              if (that.search() !== this['value']) {
                that
                  .search(this['value'])
                  .draw();
              }
            });
          });
        });
      });
  }

  ngAfterViewInit(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          if (that.search() !== this['value']) {
            that
              .search(this['value'])
              .draw();
          }
        });
      });
    });
  }

  borrarMotivo(motivo: Motivo, idx: number){
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ motivo.des_motivo }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.motivos.splice(idx, 1);
        this.motivosService.borrarMotivo( motivo.motivo )
          .subscribe( res =>{
            
          });
      }

    });
  }
}
