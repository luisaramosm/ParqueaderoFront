import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ModalService {
  titulo="";
  accion= new BehaviorSubject("");
  objeto: any;
  element: any;
  
  constructor() {  }
  
}

