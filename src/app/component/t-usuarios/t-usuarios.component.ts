import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { TUsuariosDataSource, TUsuariosItem } from './t-usuarios-datasource';

@Component({
  selector: 'app-t-usuarios',
  templateUrl: './t-usuarios.component.html',
  styleUrls: ['./t-usuarios.component.css']
})
export class TUsuariosComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TUsuariosItem>;
  dataSource: TUsuariosDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['idCedula', 'nombre', 'apellido', 'idHorario', 'idParqueadero', 'idVinculacion', 'telefonoUsuario', 'correoUsuario'];

  
  constructor(public service: ApiService) {
    this.dataSource = new TUsuariosDataSource();
  }

  ngOnInit(): void {
    this.service.getAll("Personas");
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
