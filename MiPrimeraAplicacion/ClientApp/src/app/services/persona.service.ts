import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { core } from '@angular/compiler';


@Injectable()
export class PersonaService {
  urlBase: string = "";
  constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
    this.urlBase = baseUrl;  
  }
  
  public getPersona() {
    return this.http.get(this.urlBase + "api/Persona/listarPersonas").map(res => res.json());
  }

  public getPersonaFiltro(nombrecompleto) {
    return this.http.get(this.urlBase + "api/Persona/filtarPersona/" + nombrecompleto).map(res => res.json());
  }
  
  public agregarPersona(persona) {
    var url = this.urlBase + "api/Persona/guardarPersona";
    return this.http.post(url,persona ).map(res => res.json());
  }

  public recuperarPersona(idPersona) {

    return this.http.get(this.urlBase + "api/Persona/recuperarPersona/" + idPersona)
      .map(res => res.json());
  }
  
  public eliminarPersona(idPersona) {

    return this.http.get(this.urlBase + "api/Persona/eliminarPersona/" + idPersona)
      .map(res => res.json());
  }

  public validarCorreo(id, correo) {
   return this.http.get(this.urlBase + "api/Persona/validarCorreo/" + id + "/" + correo)
      .map(res => res.json());
  }

  public listarPersonasCombo() {
    return this.http.get(this.urlBase + "api/Persona/listarPersonasCombo")
      .map(res => res.json());
  }



}
