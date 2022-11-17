import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2/src/sweetalert2.js';
import { ModalService } from 'src/app/services/modal.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})

export class PersonasComponent  { 
      
  addressForm = this.fb.group({
    idPersonas: '0',
    cedula: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
    nombres: ['', Validators.required], 
    apellidos: ['', Validators.required],
    telefono: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
    correo: ['', [Validators.required, Validators.email]],
    tipoVinculacion: ['', Validators.required]     
  });
  
  hasUnitNumber = false;

  tipoVinculacions = [
    {name: 'Estudiante', abbreviation: 'Estudiante'},
    {name: 'Administrativo', abbreviation: 'Administrativo'},
    {name: 'Docente', abbreviation: 'Docente'}
  ];
  
  constructor(private fb: FormBuilder, public service:ApiService, public dialog:MatDialog , public modalservice: ModalService) {}
  
  //accion = this.modalservice.accion('Editar');
 accion = this.modalservice.accion.value;
  ngOnInit(): void {
    console.log('ngOnInit -> personas.component.ts')
    console.log('Editar debe ser igual')
    console.log(this.accion)

    if(this.accion=='Editar'){
      this.addressForm.controls['idPersonas'].setValue(this.modalservice.objeto.idPersonas)
      this.addressForm.controls['cedula'].setValue(this.modalservice.objeto.cedula)
      this.addressForm.controls['nombres'].setValue(this.modalservice.objeto.nombres)
      this.addressForm.controls['apellidos'].setValue(this.modalservice.objeto.apellidos)
      this.addressForm.controls['telefono'].setValue(this.modalservice.objeto.telefono)
      this.addressForm.controls['correo'].setValue(this.modalservice.objeto.correo)
      this.addressForm.controls['tipoVinculacion'].setValue(this.modalservice.objeto.tipoVinculacion)
    }
    if(this.accion=='Agregar nueva'){
      console.log('Agregar nueva - salida')
    }
  };

  gestionarPersona(){
    console.log('gestionarPersona -> PersonasComponent.component.ts')
    const addressForm: any = {
      idPersonas: this.addressForm.controls['idPersonas']?.value,
      cedula: this.addressForm.controls['cedula']?.value,
      nombres: this.addressForm.controls['nombres']?.value,
      apellidos: this.addressForm.controls['apellidos']?.value,
      telefono: this.addressForm.controls['telefono']?.value,
      correo: this.addressForm.controls['correo']?.value,
      tipoVinculacion: this.addressForm.controls['tipoVinculacion']?.value
    }
    console.log(this.accion)
    if(this.accion=='Editar'){
      console.log('editar')
      if(this.addressForm.valid){
        this.service.Put('Personas/' , this.modalservice.objeto.idPersonas , addressForm);  //Put(controller:String,ID:String,Body:any)
        Swal.fire(
        'Persona modificada',
        '',
        'success').then((result)=>{
          if(result.isConfirmed){
            window.location.reload();
          }
         })
        
        this.dialog.closeAll()
        this.addressForm.reset();
        
      }
      
    } 
    if(this.accion=='Agregar nueva'){
      console.log('agregar')
      if(this.addressForm.valid){
        console.log('if agregar persona modificar')
        console.log(addressForm)
        this.service.Post('Personas/', addressForm);
        Swal.fire(
         'Persona creada',
         '',
         'success').then((result)=>{
          if(result.isConfirmed){
            window.location.reload();
          }
         })
         this.dialog.closeAll()
       }
    }
  } 
}

