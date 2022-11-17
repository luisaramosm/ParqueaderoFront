import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-template',
  templateUrl: './modal-template.component.html',
  styleUrls: ['./modal-template.component.css']
})
export class ModalTemplateComponent implements OnInit {

  constructor(public modalservice: ModalService) { console.log('constructor -> modal-template.component.ts') }
  
  titulo=""
  accion=""
  objeto=""
  
  ngOnInit(): void {
    this.titulo=this.modalservice.titulo
    this.accion=this.modalservice.accion.value
    this.objeto=this.modalservice.objeto
    console.log('ngOnInit -> modal-template.component.ts')
    console.log(this.titulo)
    console.log(this.accion)
    console.log(this.objeto)
  }

}
