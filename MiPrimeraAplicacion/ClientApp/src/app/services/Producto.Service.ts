import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class ProductoService {

  urlBase: string = "";
  constructor(private http: Http, @Inject('BASE_URL') baseUrl: string)
  {
    //urlbase tiene le nombre del dominio
    this.urlBase = baseUrl;  
  }
  //En el servicio va los CRUD
  public getProducto() {
    return this.http.get(this.urlBase + "api/Producto/listarProductos").map(res => res.json());
  }

  public getFiltroProductoPorNombre(nombre) {
    return this.http.get(this.urlBase + "api/Producto/filtrarProductosPorNombre/" + nombre).map(res => res.json());
  }

  public getFiltroProductoPorCategoria(idcategoria) {
    return this.http.get(this.urlBase + "api/Producto/filtrarProductosPorCategoria/" + idcategoria).map(res => res.json());
  }

  public obtenerProductoPorId(idProducto) {
    return this.http.get(this.urlBase + "api/Producto/obtenerProductoPorId/" + idProducto).map(res => res.json());
  }

  public listarMarcas() {
    return this.http.get(this.urlBase + "api/Producto/listarMarcas").map(res => res.json());
  }

}

