import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { Router } from '@angular/router';


@Injectable()
export class PaginaService {

  urlBase: string = "";
  constructor(private http: Http, @Inject('BASE_URL') baseUrl: string, private router: Router) {
    this.urlBase = baseUrl;
  }
  //areyes seccion para crud de paginas

  public ListarPaginasBD() {
    return this.http.get(this.urlBase + "api/Pagina/listarPaginasBD")
      .map(res => res.json());
  }

  public EliminarPagina(idPagina) {
    return this.http.get(this.urlBase + "api/Pagina/eliminarPagina/" + idPagina)
      .map(res => res.json());
  }

  public RecuperarPagina(idPagina) {
    return this.http.get(this.urlBase + "api/Pagina/recuperarPagina/" + idPagina)
      .map(res => res.json());
  }


  public guardarDatos(paginaCLS) {
    var url = this.urlBase + "api/Pagina/guardarDatos";
    var d = this.http.post(url, paginaCLS,Response.arguments).map(res => res.json());
    return d;
  }

}
