import { Component, OnInit } from '@angular/core';
import { Motivo } from 'src/app/interfaces/motivo';
import { motivos } from '../../data/motivos';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-motivo',
  templateUrl: './motivo.component.html',
  styleUrls: ['./motivo.component.css']
})
export class MotivoComponent implements OnInit {

  motivos: Motivo[] = motivos;
  motivo: Motivo;

  constructor( private route: ActivatedRoute ) { }

  ngOnInit(): void {
    const motivo = this.route.snapshot.paramMap.get('motivo');

    if ( motivo !== 'nuevo' ) {

      this.motivo = motivos[motivo];

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
      //peticion = this.heroesService.actualizarHeroe( this.heroe );
    } else {
      //peticion = this.heroesService.crearHeroe( this.heroe );
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
