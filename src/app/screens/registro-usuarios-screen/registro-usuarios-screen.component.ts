import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-usuarios-screen',
  templateUrl: './registro-usuarios-screen.component.html',
  styleUrls: ['./registro-usuarios-screen.component.scss']
})
export class RegistroUsuariosScreenComponent implements OnInit{

  public tipo:string = "registro-usuarios";
  public user:any = {};
  public editar:boolean = false;
  //Banderas para el tipo de usuario
  public isAdmin:boolean = false;
  public isAlumno:boolean = false;
  public isMaestro:boolean = false;

  public tipo_user:string = "";

  constructor(){}

  ngOnInit(): void {
    
  }


}
