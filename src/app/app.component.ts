import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  Login:string='';

  ngOnInit(): void {

    console.log(this.loginservice.login);
    if(this.loginservice.user!=null){
    this.loginservice.login.next('Login')
  }else{
    this.loginservice.login.next('logout')
    this.loginservice.user.next(null);
  }
    this.loginservice.login.subscribe((value=>{
    this.Login=value;
    console.log(this.Login);

   }))
}
  constructor(public loginservice:LoginService){
  }
}
