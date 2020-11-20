import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, delay } from 'rxjs/operators';
import { Motivo, Convert } from '../interfaces/motivo';

@Injectable({
  providedIn: 'root'
})
export class MotivosService {

  private url = 'https://localhost/DetektorBackEnd/api';

  constructor( private http: HttpClient) { }

  crearMotivo(motivo: Motivo){
    return this.http.post(`${ this.url}/create.php`, Convert.motivoToJson(motivo))
      .pipe(
        map( (resp: any) => {
          motivo.motivo = resp.name;
          return motivo;
        })
      );
  }

  modificarMotivo(motivo: Motivo){
    return this.http.post(`${ this.url}/update.php`, Convert.motivoToJson(motivo))
      .pipe(
        map( (resp: any) => {
          motivo.motivo = resp.name;
          return motivo;
        })
      );
  }

  borrarMotivo( motivo: number){
    let httpParams = new HttpParams().set('motivo', `${motivo}`);
    let options = { params: httpParams };
    return this.http.delete(`${ this.url}/delete.php`, options);
  }

  getMotivo( motivo: number){
    return this.http.get(`${ this.url }/single_read.php/?motivo=${motivo}`);
  }

  getMotivos(){
    return this.http.get(`${ this.url }/read.php`)
           .pipe(
             map( this.crearArreglo ),
             delay(0)
           );
  }

  private crearArreglo( motivoObj: object ) {

    const motivos: Motivo[] = [];

    Object.keys( motivoObj ).forEach( key => {

      const motivo: Motivo = motivoObj[key];
      motivo.motivo = parseInt(key);

      motivos.push( motivo );
    });


    return motivos;

  }
}
