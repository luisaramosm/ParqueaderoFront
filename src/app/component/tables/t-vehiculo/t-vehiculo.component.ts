import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { ModalService } from 'src/app/services/modal.service';
import { ModalTemplateComponent } from '../../modal-template/modal-template.component';
import { APP_BASE_HREF } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { TVehiculoDataSource, TVehiculoItem } from './t-vehiculo-datasource';
import Swal from 'sweetalert2/src/sweetalert2.js';

@Component({
  selector: 'app-t-vehiculo',
  templateUrl: './t-vehiculo.component.html',
  styleUrls: ['./t-vehiculo.component.css']
})
export class TVehiculoComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
    
  constructor(public modalService: ModalService, public api: ApiService,public dialog: MatDialog) {
    this.dataSource= new MatTableDataSource();
  }

  ngOnInit(): void {
    this.api.getAll("Vehiculoes").subscribe((res: any) => {
      for (let index = 0; index < res.length; index++) {
        this.loadTable([res[index]])
      }
      this.dataSource.data=res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  openDialog(): void {
    this.modalService.titulo="Vehiculoes"
    this.modalService.accion.next("Agregar nueva")

    const dialogRef = this.dialog.open( ModalTemplateComponent,{
      width: '35%',
      height: '70%'
      
    });
  }

  eliminarVehiculo (idVehiculo: string){

    if(this.api.Delete){
      Swal.fire({
        title: '¿Esta seguro de borrar esta Vehiculo?',
        text: "Esta acción no tiene reversa",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrar este registro'
      }).then((result) => {
        if (result.isConfirmed) {
          this.api.Delete('Vehiculoes/', idVehiculo)
          Swal.fire(
            'Borrado!',
            'Su registro ha sido borrado.',
            'success'
          )
          
        }
      })
    }
  }


  id: string | undefined;
  
  editarVehiculo(addressForm:any){
    console.log(addressForm)
    this.modalService.accion.getValue;
    this.id = addressForm.id;

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
