import { Component, Input, OnInit } from '@angular/core';
import { AdministradoresService } from 'src/app/services/admistradores.service';
import { Location } from '@angular/common';
declare var $:any;

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.scss']
})
export class RegistroAdminComponent implements OnInit {
  @Input() rol: string = "";
  @Input() datos_user: any = {};

  public admin:any = {};
  public errors:any = {};
  public editar:boolean = false;

    //Para contraseñas
    public hide_1: boolean = false;
    public hide_2: boolean = false;
    public inputType_1: string = 'password';
    public inputType_2: string = 'password';

  constructor(
    private location: Location,
    private administradoresService: AdministradoresService
  ){}

  ngOnInit(): void {
    this.admin = this.administradoresService.esquemaAdmin();
    this.admin.rol = this.rol;
    console.log("Los datos del admin son: ", this.admin);
  }

   //Funciones para password
  showPassword()
  {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar()
  {
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  public regresar(){
    this.location.back();
  }

  public registrar(){
        //Validación del formulario
        this.errors = [];

        this.errors = this.administradoresService.validarAdmin(this.admin, this.editar);
        if(!$.isEmptyObject(this.errors)){
          return false;
        }
        if(this.admin.password == this.admin.confirmar_password){
          //Ejecuta
        }else{
          alert("Las contraseñas no coinciden");
        }
        // TODO:Aquí va la demás funcionalidad para registrar
  }

  public actualizar(){

  }

  public soloLetras(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Permitir solo letras (mayúsculas y minúsculas) y espacio
    if (
      !(charCode >= 65 && charCode <= 90) &&  // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      charCode !== 32                         // Espacio
    ) {
      event.preventDefault();
    }
  }
}
