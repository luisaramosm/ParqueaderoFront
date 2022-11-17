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
import { TUsersDataSource, TUsersItem } from './t-users-datasource';
import { supportsScrollBehavior } from '@angular/cdk/platform';

@Component({
  selector: 'app-t-users',
  templateUrl: './t-users.component.html',
  styleUrls: ['./t-users.component.css']
})
export class TUsersComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public modalService: ModalService, public api: ApiService,public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.api.getAll("Users").subscribe((res: any) => {
      for (let index = 0; index < res.length; index++) {
        this.loadTable([res[index]])
      }
      this.dataSource.data=res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  openDialog(): void {
    this.modalService.titulo="Users"
    this.modalService.accion.next("Agregar nueva")

    this.dialog.open( ModalTemplateComponent,{
      width: '35%',
      height: '70%'
      
    });
  }

  eliminarUsers (idUsers: string){

    if(this.api.Delete){
      Swal.fire({
        title: '¿Esta seguro de borrar esta Users?',
        text: "Esta acción no tiene reversa",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrar este registro'
      }).then((result) => {
        if (result.isConfirmed) {
          this.api.Delete('Users/', idUsers)
          Swal.fire(
            'Borrado!',
            'Su registro ha sido borrado.',
            'success'
          ).then((result)=>{
            if(result.isConfirmed){
              window.location.reload();
            }
           })
          
        }
      })
    }
  }

  id: string | undefined;
  
  editarUsers(element:any){
    this.modalService.titulo="Users";
    this.modalService.accion.next('Editar');
    this.modalService.objeto=element;

    this.dialog.open( ModalTemplateComponent,{
      width: '35%',
      height: '70%'
      
    });


  }

  loadTable(data:any[]): void{
    this.displayedColumns=[];
    for(let column in data[0]){
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


}
