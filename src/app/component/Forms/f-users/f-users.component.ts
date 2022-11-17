import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2/src/sweetalert2.js';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-f-users',
  templateUrl: './f-users.component.html',
  styleUrls: ['./f-users.component.css']
})

export class FUsersComponent {

  usersForm = this.fb.group({
    idUsers: '0',
    usuario: ['', Validators.required],
    password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    rol: ['', Validators.required]
  });

  hasUnitNumber = false;

  rols = [
    {name: 'Administrador', abbreviation: 'Administrador'},
    {name: 'Vigilante', abbreviation: 'Vigilante'}
  ];

  constructor(
    private fb: FormBuilder, 
    public service:ApiService, 
    public dialog:MatDialog, 
    public modalservice: ModalService) {}

  accion = this.modalservice.accion.value;

  ngOnInit(): void {
    console.log('ngOnInit -> User.component.ts')
    console.log('Editar debe ser igual')
    console.log(this.accion)

    if(this.accion=='Editar'){
      this.usersForm.controls['idUsers'].setValue(this.modalservice.objeto.idUsers)
      this.usersForm.controls['usuario'].setValue(this.modalservice.objeto.usuario)
      this.usersForm.controls['password'].setValue(this.modalservice.objeto.password)
      this.usersForm.controls['rol'].setValue(this.modalservice.objeto.rol)
    }
    if(this.accion=='Agregar nueva'){
      console.log('Agregar nueva - salida')
    }
  };

  getionarUsers(){
    const usersForm: any = {
      idUsers: this.usersForm.controls['idUsers']?.value,
      usuario: this.usersForm.controls['usuario']?.value,
      password: this.usersForm.controls['password']?.value,
      rol: this.usersForm.controls['rol']?.value
    }

    if(this.accion=='Editar'){
      if(this.usersForm.valid){
        this.service.Put('Users/' , this.modalservice.objeto.idUsers , usersForm);  //Put(controller:String,ID:String,Body:any)
        Swal.fire(
          'Usuario modificado',
          '',
          'success'
          ).then((result)=>{
            if(result.isConfirmed){
              window.location.reload();
            }
           })
          this.dialog.closeAll()
          this.usersForm.reset();
      }
    }
    if(this.accion=='Agregar nueva'){
      if(this.usersForm.valid){
        this.service.Post('Users/', usersForm);
        Swal.fire(
         'Usuario creado',
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