import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: reemplazar todo con el modelo de datos que se esta consumiendo
export interface TUsuariosItem {
  idCedula: number;
  nombre: string;
  apellido: string;
  idHorario: number;
  idParqueadero: number;
  idVinculacion: number;
  telefonoUsuario: string;
  correoUsuario: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TUsuariosItem[] = [
  {idCedula: 79794521, nombre: 'Luis Alfonso', apellido: 'Ramos Mesa', idHorario: 1, idParqueadero: 1, idVinculacion: 1, telefonoUsuario: '3107961298', correoUsuario: 'prueba@parqueadero.com'},
  {idCedula: 79794521, nombre: 'Luis Alfonso', apellido: 'Ramos Mesa', idHorario: 1, idParqueadero: 1, idVinculacion: 1, telefonoUsuario: '3107961298', correoUsuario: 'prueba@parqueadero.com'},
];

/**
 * Data source for the TUsuarios view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TUsuariosDataSource extends DataSource<TUsuariosItem> {
  data: TUsuariosItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TUsuariosItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TUsuariosItem[]): TUsuariosItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TUsuariosItem[]): TUsuariosItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'idCedula': return compare(a.idCedula, b.idCedula, isAsc);
        case 'nombre': return compare(+a.nombre, +b.nombre, isAsc);
        case 'apellido': return compare(a.apellido, b.apellido, isAsc);
        case 'idHorario': return compare(a.idHorario, b.idHorario, isAsc);
        case 'idParqueadero': return compare(a.idParqueadero, b.idParqueadero, isAsc);
        case 'idVinculacion': return compare(a.idVinculacion, b.idVinculacion, isAsc);
        case 'telefonoUsuario': return compare(a.telefonoUsuario, b.telefonoUsuario, isAsc);
        case 'correoUsuario': return compare(a.correoUsuario, b.correoUsuario, isAsc);

        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
