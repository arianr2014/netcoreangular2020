import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { UsuarioService} from '../../services/usuario.service'



@Injectable()
export class SeguridadGuard implements CanActivate {

  constructor(private route: Router, private usuarioService: UsuarioService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot, //areyes next me da informacion a la pagina que se quiere ingresar
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //this.route.navigate(["pagina-error"]);
    //return false;

    //areyes next me da informacion a la pagina que se quiere ingresar
    //se la pasamos a la obtencion de variable se sesion para comparar
    //contra el listado de pagina y ver si tiene acceso
    return this.usuarioService.obtenerVariableSescion(next);
  }
}
