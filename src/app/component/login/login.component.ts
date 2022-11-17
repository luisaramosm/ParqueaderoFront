import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api.service';
import { ModalService } from 'src/app/services/modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { ModalTemplateComponent } from 'src/app/component/modal-template/modal-template.component'
import { UsuarioLogin } from 'src/app/models/UsuarioLoginMV';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  addressForm = this.fb.group({
    usuario: [null, Validators.required],
    password: [null, Validators.required],
  });
  em="";
  pass="";
  user:UsuarioLogin;

  constructor(
    public modalservice: ModalService,
    private fb: FormBuilder,
    public api: ApiService,
    public dialog: MatDialog,
    public loginservice:LoginService,
    public router:Router,
    ) {}

  async onSubmit() {

    this.em = this.addressForm.controls.usuario.value;
    this.pass = this.addressForm.controls.password.value;

    //console.log('aca se carga: ' + this.em)
    //console.log('aca se carga: ' + this.pass)

    //console.log((this.api.login('Users/', this.em, this.pass)))
    var DataResponse:UsuarioLogin = await (this.api.login('Users/', this.em, this.pass))
    this.user=DataResponse[0];

    if(this.em!=this.user.usuario || this.pass!=this.user.password){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La información ingresada es incorrecta!'
      })
    }

    if(this.em==this.user.usuario && this.pass==this.user.password){

      Swal.fire({
        icon: 'success',
        title: 'Hecho',
        text: 'Logueo exitoso'

      })
      localStorage.setItem("Usuario", JSON.stringify(this.user));
      
      this.router.navigateByUrl('/dashboard');
      this.loginservice.user.next(this.user);
      this.loginservice.login.next('Login');
      console.log(this.user);
    }



  }

  modal() {
    this.modalservice.titulo="nuevo usuario",
    this.modalservice.accion.next("Registrar"),
    this.dialog.open(ModalTemplateComponent,{
      width:'auto',
      height:'auto'

    });
  }
}