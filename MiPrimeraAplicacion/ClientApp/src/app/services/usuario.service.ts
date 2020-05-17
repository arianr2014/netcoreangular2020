import { Injectable, Inject  } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { Router } from '@angular/router';


@Injectable()
export class UsuarioService {

  urlBase: string = "";
  constructor(private http: Http, @Inject('BASE_URL') baseUrl: string, private router:Router) {
    this.urlBase = baseUrl;
  }

  public getTipoUsuario() {
    return this.http.get(this.urlBase + "api/Usuario/listarTipoUsuario").map(res => res.json());
  }
  public getUsuario() {
    return this.http.get(this.urlBase + "api/Usuario/listarUsuario").map(res => res.json());
  }

  public getUsuarioPorTipo(idTipo) {
    return this.http.get(this.urlBase + "api/Usuario/listarUsuarioPorTipo/"+idTipo).map(res => res.json());
  }


  public validarUsuario(idUsuario, nombre) {
    return this.http.get(this.urlBase + "api/Usuario/validarUsuario/" + idUsuario + "/" + nombre)
      .map(res => res.json());
  }

  public recuperarUsuario(idUsuario) {
    return this.http.get(this.urlBase + "api/Usuario/recuperarUsuario/" + idUsuario )
      .map(res => res.json());
  }

  public guardarDatos(usuarioCLS) {
    var url = this.urlBase + "api/Usuario/guardarDatos";
    return this.http.post(url, usuarioCLS).map(res => res.json());
  }

  public eliminarUsuario(idUsuario) {
    return this.http.get(this.urlBase + "api/Usuario/eliminarUsuario/" + idUsuario)
      .map(res => res.json());
  }

  public login(usuario) {
    return this.http.post(this.urlBase + "api/usuario/login/",usuario)
      .map(res => res.json());
   }


  //areyes recibe el parametro de la pagina que quiere ingresar
  public obtenerVariableSescion(next) {
    //se comenta pra trabajar con el guards
    //return this.http.get(this.urlBase + "api/usuario/obtenerVariableSesion")
    //  .map(res => res.json());


    return this.http.get(this.urlBase + "api/usuario/obtenerVariableSesion")
      .map(res => {
        var data = res.json();
        var informacion = data.valor;
        if (informacion == "") {
         this.router.navigate(["/pagina-error"]); //<= si queremos redireccionar a otra pagina

          //return false;//<= si queremos que no ingrese
        } else {

          //logica para validar pagina
          var pagina = next["url"][0].path; //obtenemos el  nombre la pagina q intenta ingresar
          if (data.lista != null) {
            var paginas = data.lista.map(pagina => pagina.accion); // nombre de la pgina en base de datos
            if (paginas.indexOf(pagina) > -1 && pagina != "Login") {
              return true; // tiene acceso a la pagina
            } else {
              //lo redireccionamos a la pagina de error
              this.router.navigate(["/pagina-error-permiso"]); //<= si queremos redireccionar a otra pagina
              return false; // no tiene acceso a la pagina
            }
          }
          else {
            //lo redireccionamos a la pagina de error
            this.router.navigate(["/pagina-error-permiso"]); //<= si queremos redireccionar a otra pagina
            return false; // no tiene acceso a la pagina
          }

        }

      });
  }

   //areyes para el manejo de sesiones   menus dinamicos
  public obtenerSesion() {
   
    return this.http.get(this.urlBase + "api/usuario/obtenerVariableSesion")
      .map(res => {
        var data = res.json();
        var informacion = data.valor;
        if (informacion == "") {
          return false;
        } else {
          return true;
        }

      });
  }
   //areyes para el manejo de sesiones   menus dinamicos
  public cerrarSesion() {
    return this.http.get(this.urlBase + "api/usuario/cerrarSesion")
      .map(res => res.json());
  }

  public listarPaginas() {
    return this.http.get(this.urlBase + "api/usuario/listarPaginas")
      .map(res => res.json());
  }





 }
