import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-alumnos-screen',
  templateUrl: './alumnos-screen.component.html',
  styleUrls: ['./alumnos-screen.component.scss']
})
export class AlumnosScreenComponent implements OnInit, AfterViewInit {

  public name_user: string = "";
  public rol: string = "";
  public token: string = "";
  public lista_alumnos: any[] = [];

  displayedColumns: string[] = [
    'matricula', 'nombre', 'email', 'fecha_nacimiento', 'edad',
    'curp', 'rfc', 'telefono', 'ocupacion', 'editar', 'eliminar'
  ];

  dataSource = new MatTableDataSource<DatosUsuario>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public facadeService: FacadeService,
    private alumnosService: AlumnosService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();
    this.rol = this.facadeService.getUserGroup();
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);

    if (this.token == "") {
      this.router.navigate([""]);
    }
    this.obtenerAlumnos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.initPaginator();
  }

  public initPaginator() {
    setTimeout(() => {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
          if (length === 0 || pageSize === 0) {
            return `0 / ${length}`;
          }
          const startIndex = page * pageSize;
          const endIndex = startIndex < length
            ? Math.min(startIndex + pageSize, length)
            : startIndex + pageSize;
          return `${startIndex + 1} - ${endIndex} de ${length}`;
        };
        this.paginator._intl.firstPageLabel = 'Primera página';
        this.paginator._intl.lastPageLabel = 'Última página';
        this.paginator._intl.previousPageLabel = 'Página anterior';
        this.paginator._intl.nextPageLabel = 'Página siguiente';
      }
    }, 500);
  }

  public obtenerAlumnos() {
    this.alumnosService.obtenerListaAlumnos().subscribe(
      (response) => {
        this.lista_alumnos = response;
        console.log("Respuesta de la API:", response);

        if (this.lista_alumnos.length > 0) {
          this.lista_alumnos.forEach(usuario => {
            usuario.first_name = usuario.user.first_name;
            usuario.last_name = usuario.user.last_name;
            usuario.email = usuario.user.email;
          });

          this.dataSource.data = this.lista_alumnos as DatosUsuario[]; // ✅ Aquí se actualiza el dataSource correctamente
          console.log("Datos procesados:", this.lista_alumnos);
        }
      },
      (error) => {
        console.error("Error al obtener la lista de usuarios:", error);
        alert("No se pudo obtener la lista de usuarios");
      }
    );
  }

  public goEditar(idUser: number) {
    // lógica para editar
  }

  public delete(idUser: number) {
    // lógica para eliminar
  }
}

export interface DatosUsuario {
  id: number,
  matricula: string;
  first_name: string;
  last_name: string;
  email: string;
  fecha_nacimiento: string,
  curp: string,
  rfc: string,
  edad: number,
  telefono: string,
  ocupacion: string
}
