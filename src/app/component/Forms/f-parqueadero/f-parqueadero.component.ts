import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-f-parqueadero',
  templateUrl: './f-parqueadero.component.html',
  styleUrls: ['./f-parqueadero.component.css']
})

export class FParqueaderoComponent {
  parqueaderoForm = this.fb.group({
    idParqueadero: 0,
    sede: ['', Validators.required],
    horario: ['', Validators.required],
    CapacidadAutos: ['', Validators.required],
    CapacidadMotos: ['', Validators.required],
    CapacidadBicicletas: ['', Validators.required]
  });

  hasUnitNumber = false;

  horarios = [
    {name: 'DIURNO', abbreviation: 'DIURNO'},
    {name: 'NOCTURNO', abbreviation: 'NOCTURNO'}
  ];

  constructor(private fb: FormBuilder, public service:ApiService, public dialog:MatDialog, public modalservice: ModalService) {}

  accion = this.modalservice.accion.value;

  ngOnInit(): void {
    console.log('ngOnInit -> parqueadero.component.ts')
    console.log('Editar debe ser igual')
    console.log(this.accion)

    if(this.accion=='Editar'){
      this.parqueaderoForm.controls['idParqueadero'].setValue(this.modalservice.objeto.idParqueadero),
      this.parqueaderoForm.controls['sede'].setValue(this.modalservice.objeto.sede),
      this.parqueaderoForm.controls['horario'].setValue(this.modalservice.objeto.horario),
      this.parqueaderoForm.controls['CapacidadAutos'].setValue(this.modalservice.objeto.CapacidadAutos),
      this.parqueaderoForm.controls['CapacidadMotos'].setValue(this.modalservice.objeto.CapacidadMotos),
      this.parqueaderoForm.controls['CapacidadBicicletas'].setValue(this.modalservice.objeto.CapacidadBicicletas)
    }
    if(this.accion=='Agregar nueva'){
      console.log('Agregar nueva - salida')
    }
  };

  guardarParqueadero(){
    const parqueaderoForm: any = {
      idParqueadero: this.parqueaderoForm.controls['idParqueadero']?.value,
      sede: this.parqueaderoForm.controls['sede']?.value,
      horario: this.parqueaderoForm.controls['horario']?.value,
      CapacidadAutos: this.parqueaderoForm.controls['CapacidadAutos']?.value,
      CapacidadMotos: this.parqueaderoForm.controls['CapacidadMotos']?.value,
      CapacidadBicicletas: this.parqueaderoForm.controls['CapacidadBicicletas']?.value
    }

    if(this.accion=='Editar'){
      console.log('Editar')
      if(this.parqueaderoForm.valid){
        this.service.Put('Parqueaderoes/' , this.modalservice.objeto.idParqueadero , parqueaderoForm);  //Put(controller:String,ID:String,Body:any)
        Swal.fire(
        'Parqueadero modificado',
        '',
        'success').then((result)=>{
          if(result.isConfirmed){
            window.location.reload();
          }
         })
      }
    }

    if(this.accion=='Agregar nueva'){
      console.log('agregar')
      if(this.parqueaderoForm.valid){
        console.log('if agregar parqueadero modificar')
        console.log(parqueaderoForm)
        this.service.Post('Parqueaderoes/', parqueaderoForm);
        Swal.fire(
         'Parqueadero creado',
         '',
         'success').then((result)=>{
          if(result.isConfirmed){
            window.location.reload();
          }
         })
         }
      }
   }
}
