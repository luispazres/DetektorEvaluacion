import { Component, OnInit } from '@angular/core';
import { motivos } from '../../data/motivos';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
import { MotivoModel } from '../../../models/motivo.model';
import { MotivosService } from '../../../services/motivos.service';
import { Motivo } from 'src/app/interfaces/motivo';

@Component({
  selector: 'app-motivo',
  templateUrl: './motivo.component.html',
  styleUrls: ['./motivo.component.css']
})
export class MotivoComponent implements OnInit {

  //motivos: Motivo[] = motivos;
  motivo: MotivoModel = new MotivoModel() ;

  constructor( private route: ActivatedRoute, public motivosService: MotivosService ) { }

  ngOnInit(): void {
    const motivo = this.route.snapshot.paramMap.get('motivo');

    if ( motivo !== 'nuevo' ) {

      this.motivosService.getMotivo( parseInt(motivo))
        .subscribe( (resp: Motivo) => {
          this.motivo = resp;
        })

    }
  }

  guardar( forma: NgForm ) {

    if ( forma.invalid ) {
      Object.values( forma.controls ).forEach( control => {
        control.markAsTouched();
      });
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();


    let peticion: Observable<any>;

    if ( this.motivo.motivo ) {
      peticion = this.motivosService.modificarMotivo( this.motivo );
    } else {
      peticion = this.motivosService.crearMotivo( this.motivo );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.motivo.des_motivo,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });

    });



  }

}
