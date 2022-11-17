import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-f-vehiculo',
  templateUrl: './f-vehiculo.component.html',
  styleUrls: ['./f-vehiculo.component.css']
})
export class FVehiculoComponent {
  vehiculoForm = this.fb.group({
    placa: ['', Validators.compose([
      Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    ],
    idPersonas: ['', Validators.required],
    tipo: ['', Validators.required],
    marca: ['', Validators.required],
    modelo: ['', Validators.required]
  });

  hasUnitNumber = false;

  tipos = [
    {name: 'Carro', abbreviation: 'Carro'},
    {name: 'Motocicleta', abbreviation: 'Motocicleta'},
    {name: 'Bicicleta', abbreviation: 'Bicicleta'}
  ];

  constructor(private fb: FormBuilder, public service:ApiService, public dialog:MatDialog) {}

  agregarVehiculo(){
    const vehiculoForm: any = {
      placa: this.vehiculoForm.controls['placa']?.value,
      idPersonas: this.vehiculoForm.controls['idPersonas']?.value,
      tipo: this.vehiculoForm.controls['tipo']?.value,
      marca: this.vehiculoForm.controls['marca']?.value,
      modelo: this.vehiculoForm.controls['modelo']?.value
    }
 if(this.vehiculoForm.valid){
  this.service.Post('Vehiculoes/', vehiculoForm);
  Swal.fire(
    'Persona creada',
    '',
    'success'
  )
  this.dialog.closeAll()
    
 }
  }
}
