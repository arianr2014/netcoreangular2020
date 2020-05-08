import { Injectable, Inject  } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  urlBase: string = "";
  constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
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

}
