import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Motivo } from 'src/app/interfaces/motivo';
import { motivos } from '../../data/motivos';
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

  constructor( public router: Router) { }

  ngOnInit(): void {
  
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
}
