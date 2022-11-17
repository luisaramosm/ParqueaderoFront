import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { ModalService } from 'src/app/services/modal.service';
import { ModalTemplateComponent } from '../../modal-template/modal-template.component';
import Swal from 'sweetalert2/src/sweetalert2.js';
import { APP_BASE_HREF } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { PersonasComponent } from '../../Forms/personas/personas.component';
import { DialogRef } from '@angular/cdk/dialog';
import { state } from '@angular/animations';

@Component({
  selector: 'app-t-personas',
  templateUrl: './t-personas.component.html',
  styleUrls: ['./t-personas.component.css']
})
export class TPersonasComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public modalService: ModalService, public api: ApiService, public dialog: MatDialog) {

    this.dataSource = new MatTableDataSource
  }

  ngOnInit(): void {
    this.api.getAll("Personas").subscribe((res: any) => {
      for (let index = 0; index < res.length; index++) {
        this.loadTable([res[index]])
      }
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  openDialog(): void {

    this.modalService.titulo = "persona",
      this.modalService.accion.next("Agregar nueva"),

      this.dialog.open(ModalTemplateComponent, {
        width: '35%',
        height: '70%'

      });
  }

  eliminarPersona(idPersona: string) {

    if (this.api.Delete) {
      Swal.fire({
        title: '¿Esta seguro de borrar esta persona?',
        text: "Esta acción no tiene reversa",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrar este registro'
      }).then((result) => {
        if (result.isConfirmed) {
          this.api.Delete('Personas/', idPersona)
          Swal.fire(
            'Borrado!',
            'Su registro ha sido borrado.',
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          })
        }
      })
    }


  }



  id: string | undefined;

  editarPersona(element): void {
    this.modalService.titulo = "persona";
    this.modalService.accion.next("Editar");
    this.modalService.objeto = element;

    console.log('openDialogEditar');
    console.log(element);
    this.dialog.open(ModalTemplateComponent, {
      width: '35%',
      height: '70%'

    });

  }




  loadTable(data: any[]): void {
    this.displayedColumns = [];
    for (let column in data[0]) {
      this.displayedColumns.push(column)
    }
    this.displayedColumns.push("Acciones")

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onFileSelected(e: any) {

    this.api.Post("Archivoes/", e).then((res) => {
      console.log(res);
    })
  }

}
