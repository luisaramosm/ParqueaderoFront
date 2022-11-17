import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-f-solicitud-parqueadero',
  templateUrl: './f-solicitud-parqueadero.component.html',
  styleUrls: ['./f-solicitud-parqueadero.component.css']
})

export class FSolicitudParqueaderoComponent implements OnInit{
personaForm: any[] = [
  {"idPersonas":1,"cedula":79794521,"nombres":"luis alfonso","apellidos":"ramos mesa","telefono":"3107961298","correo":"alfonso.ramos@unicolmayor.edu.co","tipoVinculacion":"administrativo","idUsers":1},
  {"idPersonas":2,"cedula":1033723456,"nombres":"andres","apellidos":"pulido hernandez","telefono":"312453234","correo":"andres.pulido@unicolmayor.edu.co","tipoVinculacion":"vigilante","idUsers":2},
];

form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      idPersonas: ['', Validators.required],
      cedula: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(10)]],
      correo: ['', Validators.required, Validators.email],
      tipoVinculacion: ['', Validators.required],
      idUsers: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  agregarPersona(){
    console.log(this.form);
    const persona: any = {
      idPersonas: this.form.get('idPersonas')?.value,
      cedula: this.form.get('cedula')?.value,
      nombres: this.form.get('nombres')?.value,
      apellidos: this.form.get('apellidos')?.value,
      telefono: this.form.get('telefono')?.value,
      correo: this.form.get('correo')?.value,
      tipoVinculacion: this.form.get('tipoVinculacion')?.value,
      idUsers: this.form.get('idUsers')?.value,
    }
    this.personaForm.push(persona)
    this.form.reset();
  }
  onSubmit(): void {
    alert('Thanks!');
  }
}
