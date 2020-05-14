import { Component, OnInit } from '@angular/core';
import {UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  login: boolean = false; //areyes para el manejo de sesiones   menus dinamicos
  menus: any; //areyes se crea variable para el manejo de menu dinamico
  constructor(private usuarioService: UsuarioService, private router:Router) {

  }

  collapse() {
    this.isExpanded = false;
  }

  ngOnInit() {
    //areyes para el manejo de sesiones  menus dinamicos
    this.usuarioService.obtenerSesion().subscribe(data => {
      if (data) {
        this.login = true;
        //si el login es correcto llamamos a la configuracion de paginas
        this.usuarioService.listarPaginas().subscribe(dato => {
          this.menus = dato; // se recupera listado de paginas y se guarda en la variable local.
        });

      } else {
        this.login = false;
        this.router.navigate(["/login"]); //en caso no hay iniciado sesion redireccionamos al login
      }
    });
    //areyes para el manejo de sesiones  menus dinamicos
  }

  //areyes cerrar session
  cerrarSesion() {
    this.usuarioService.cerrarSesion().subscribe(res => {
      if (res.valor == "OK") {
        this.login = false;// con esto ocultamos o mostramos las opciones del menu

      }
    })
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
