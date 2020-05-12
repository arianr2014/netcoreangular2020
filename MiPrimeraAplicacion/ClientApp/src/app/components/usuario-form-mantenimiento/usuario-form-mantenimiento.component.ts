import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//instanciar al servicio
import { UsuarioService } from '../../services/usuario.service';
import { PersonaService } from '../../services/persona.service';
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'usuario-form-mantenimiento',
  templateUrl: './usuario-form-mantenimiento.component.html',
  styleUrls: ['./usuario-form-mantenimiento.component.css']
})
export class UsuarioFormMantenimientoComponent implements OnInit {

  usuario: FormGroup;
  parametro: string;
  titulo: string;
  tiposUsuarios: any;
  personas: any;
  ver: boolean;
  constructor(private usuarioService: UsuarioService, private route: Router,
    private activatedRoute: ActivatedRoute,
    private personaService:PersonaService) {

    this.usuario = new FormGroup(
      {
        'iidusuario': new FormControl('0'),
        'nombreUsuario': new FormControl('', [Validators.required, Validators.maxLength(100)], this.noRepetirUsuario.bind(this)), //como va a validar contra base de datos va como tercer parametro
        'contra': new FormControl('', [Validators.required, Validators.maxLength(100)]),
        'contra2': new FormControl('', [Validators.required, Validators.maxLength(100), this.validarContraIguales.bind(this)]),
        'iidPersona': new FormControl('', [Validators.required ]),
        'iidTipoUsuario': new FormControl('', [Validators.required]),
      
      }

    );

    
  }

  ngOnInit() {
      this.activatedRoute.params.subscribe(_parametro => {
            this.parametro = _parametro["id"];
            if (this.parametro == "nuevo") {
              this.titulo = "Agregando nuevo usario";
              this.ver = true;
            } else {
              this.titulo = "Editando usuario"

              //areyes: cuando no deseo que se muestren campos en modo edicion
              //se limpian los validators,
              this.ver = false;
              this.usuario.controls["contra"].clearValidators();
              this.usuario.controls["contra2"].clearValidators();
              this.usuario.controls["iidPersona"].clearValidators();
              this.usuario.controls["iidTipoUsuario"].clearValidators();

              //areyes: tambien podemos usar esta seccion para
              //colocarle valores por defecto a los controles 
              //Ej. this.usuario.controls["iidPersona"].setValue('22');


              //areyes: recuperando datos de bd para editar a travez deñ service
              this.usuarioService.recuperarUsuario(this.parametro).subscribe(data => {
                this.usuario.controls["iidusuario"].setValue(data.iidusuario);
                this.usuario.controls["nombreUsuario"].setValue(data.nombreUsuario);
                this.usuario.controls["iidTipoUsuario"].setValue(data.iidTipoUsuario);

              });


            }
      });

    this.usuarioService.getTipoUsuario().subscribe(data => {
      this.tiposUsuarios = data;
    })
    this.personaService.listarPersonasCombo().subscribe(data => {
      this.personas = data;
    })
  }

  validarContraIguales(control: FormControl) {
    if (control.value != "" && control.value != null) {
      if (this.usuario.controls["contra"].value != control.value) {
        return { noIguales: true }
      } else {
        return null;
      }
    }
  }

  noRepetirUsuario(control: FormControl) {
    var promesa = new Promise((resolve, reject) => {
      if (control.value != "" && control.value != null) {
        this.usuarioService.validarUsuario(this.usuario.controls["iidusuario"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExiste: true });
            } else {
              resolve(null);
            }
          });
      }

    });
    return promesa;
  }


  guardarDatos() {
    
  }



}
