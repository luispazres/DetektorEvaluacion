import { Component, OnInit } from '@angular/core';
import { Motivo } from 'src/app/interfaces/motivo';
import { motivos } from '../../data/motivos';

import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';


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
    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.motivo = motivos[id];

    }
  }

  guardar( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Formulario no válido');
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

    if ( this.motivo.id ) {
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
