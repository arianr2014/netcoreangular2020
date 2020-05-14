import { Injectable, Inject,Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms' // formGroup para manejo de mapeo de los inputs, validators para opciones de validacion de datos
import { UsuarioService } from '../../services/usuario.service'
import { ActivatedRoute, Router, Route } from '@angular/router'; //Router para poder hacer el redirect una vez que se guarde

@Injectable()// para obtener la url base Injectable

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: FormGroup;
  error: boolean = false;
  urlBase: string = "";
  constructor(private usuarioService: UsuarioService, private route: Router,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.usuario = new FormGroup({
      'nombreUsuario': new FormControl("",Validators.required),
      'contra': new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
  }

  //validamos si el logeo es correcto
  login() {
    if (this.usuario.valid) {
      this.usuarioService.login(this.usuario.value).subscribe(res => {
        if (res.iidusuario == 0) {
          //error
          this.error = true;
        } else {
          //ok
          this.error = false;
          //this.route.navigate(["/componente-bienvenida"]);//aqui navega pero sin refrescar el menu
          
          //areyes solo para este caso se usara este modo
          window.location.href = this.urlBase + "componente-bienvenida";

        }
      });
    }
  }
}
