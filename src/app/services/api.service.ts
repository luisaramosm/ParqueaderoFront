import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioLogin } from '../models/UsuarioLoginMV';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http:HttpClient) { }
  
  async login(controller:String, usuario:string, contrasena:string){
    var DataResponse:UsuarioLogin;
    console.log(DataResponse);
    await this.http.get("https://localhost:7090/api/"+controller+usuario+"/"+contrasena).toPromise().then((res:UsuarioLogin)=>{
      DataResponse=res;
    })
    return DataResponse;
    console.log(DataResponse)
  }

public getAll(controller:string) {
return this.http.get("https://localhost:7090/api/"+controller);
}

async getById(controller:String){
  var DataResponse:any;
  this.http.get("https://localhost:7090/api/"+controller);
  return DataResponse;
}

async Post(controller:String, Body:any){
  console.log(Body);
  var DataResponse:any;
  return await this.http.post("https://localhost:7090/api/"+controller, Body).subscribe((res)=>{
  DataResponse=res;
  console.log(this.Post) 
  }  
  );
}

 Put(controller:String,id:string,Body:any){
  console.log(Body)
  return this.http.put("https://localhost:7090/api/"+controller+id, Body).subscribe((res)=>{

  });
} 

 Delete(controller:String,id:String){
  var DataResponse:any;
  return this.http.delete("https://localhost:7090/api/"+controller+id).subscribe((res)=>{
    DataResponse=res;
    
  });
  
  
} 
  
  }
