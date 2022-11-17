import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FSolicitudParqueaderoComponent } from './component/f-solicitud-parqueadero/f-solicitud-parqueadero.component';
import { TPersonasComponent } from './component/tables/t-personas/t-personas.component';
import { TControlComponent } from './component/tables/t-control/t-control.component';
import { TParqueaderoComponent } from './component/tables/t-parqueadero/t-parqueadero.component';
import { TUsersComponent } from './component/tables/t-users/t-users.component';
import { TVehiculoComponent } from './component/tables/t-vehiculo/t-vehiculo.component';
import { LoginComponent } from './component/login/login.component';
import { MenuComponent } from './component/menu/menu.component';

const routes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'tpersonas', component: TPersonasComponent },
  { path: 'tcontrol', component: TControlComponent },
  { path: 'tparqueadero', component: TParqueaderoComponent },
  { path: 'tusers', component: TUsersComponent},
  { path: 'tvehiculo', component: TVehiculoComponent},
  { path: 'login', component: LoginComponent},

  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }

 