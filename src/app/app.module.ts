import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './component/menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { FSolicitudParqueaderoComponent } from './component/f-solicitud-parqueadero/f-solicitud-parqueadero.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { TUsuariosComponent } from './component/t-usuarios/t-usuarios.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LoginComponent } from './component/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { TPersonasComponent } from './component/tables/t-personas/t-personas.component';
import { ModalTemplateComponent } from './component/modal-template/modal-template.component';
import { TControlComponent } from './component/tables/t-control/t-control.component';
import { TParqueaderoComponent } from './component/tables/t-parqueadero/t-parqueadero.component';
import { TUsersComponent } from './component/tables/t-users/t-users.component';
import { TVehiculoComponent } from './component/tables/t-vehiculo/t-vehiculo.component';
import { PersonasComponent } from './component/Forms/personas/personas.component';
import { FControlComponent } from './component/Forms/f-control/f-control.component';
import { FParqueaderoComponent } from './component/Forms/f-parqueadero/f-parqueadero.component';
import { FUsersComponent } from './component/Forms/f-users/f-users.component';
import { FVehiculoComponent } from './component/Forms/f-vehiculo/f-vehiculo.component';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    FSolicitudParqueaderoComponent,
    TUsuariosComponent,
    LoginComponent,
    ModalTemplateComponent,
    TPersonasComponent,
    TControlComponent,
    TParqueaderoComponent,
    TUsersComponent,
    TVehiculoComponent,
    PersonasComponent,
    FControlComponent,
    FParqueaderoComponent,
    FUsersComponent,
    FVehiculoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
