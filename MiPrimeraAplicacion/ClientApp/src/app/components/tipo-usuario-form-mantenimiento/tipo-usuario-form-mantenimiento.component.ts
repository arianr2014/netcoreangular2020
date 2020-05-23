import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'tipo-usuario-form-mantenimiento',
  templateUrl: './tipo-usuario-form-mantenimiento.component.html',
  styleUrls: ['./tipo-usuario-form-mantenimiento.component.css']
})
export class TipoUsuarioFormMantenimientoComponent implements OnInit {

  tipoUsuario: FormGroup;//areyes para dar soporte a los controles y mapeo correspondiente
  parametro: string;//areyes para recibir parametro nuevo o id del registro en modo edicion
  titulo: string;// areyes para agregar titulo dinamico de nuevo o editar
  paginas: any;//areyes para almacenar las pagnias

  //areyes inyectamos los servicios a usar
  constructor(private usuarioService: UsuarioService, private route: Router,
    private activatedRoute: ActivatedRoute) {

    //areyes inicializamos el formGroup, los nombres deben ser iguales
    //a la clase CLS
    this.tipoUsuario = new FormGroup(
      {
        'iidtipousuario': new FormControl(""),
        'nombre': new FormControl('', [Validators.required, Validators.maxLength(100)]),
        'descripcion': new FormControl('', [Validators.required, Validators.maxLength(100)]),
        //'bhabilitado': new FormControl('' ),
        "valores": new FormControl(""),
      });

    this.usuarioService.listarPaginasTipoUsuario().subscribe(data => {
      this.paginas = data;
    });

    this.activatedRoute.params.subscribe(param => {
      this.parametro = param["id"];
      if (this.parametro == "nuevo") {
        this.titulo = "Agregar un tipo de usuario";
      } else {
        this.titulo = "Editando un tipo de usuario";
      }
    });
  }


  ngOnInit()
  {
  
    //recuperar informacion
      if (this.parametro != "nuevo")
      {
        this.usuarioService.ListarPaginasRecuperar(this.parametro).subscribe(res => {
          this.tipoUsuario.controls["iidtipousuario"].setValue(res.iidtipousuario);
          this.tipoUsuario.controls["nombre"].setValue(res.nombre);
          this.tipoUsuario.controls["descripcion"].setValue(res.descripcion);
          var listaPaginas = res.listaPagina.map(p => p.iidPagina);
          //pintar la informacion

          setTimeout(() => {
            var checks = document.getElementsByClassName("check");
            var nchek = checks.length;
            var check;
            for (var i = 0; i < nchek; i++) {
              check = checks[i];
              var indice = listaPaginas.indexOf(check.name * 1);//lo multiplicamos por 1 para ques e convierta en entero

              if (indice > -1) {
                check.checked = true;
              }

            }
          }, 500); // fin de timeout


        });

      } else
      {
        
      }
 

  }

  guardarDatos()
  {
    if (this.tipoUsuario.valid == true)
    {
      this.usuarioService.GuardarDatosTipoUsuario(this.tipoUsuario.value)
        .subscribe(data => { this.route.navigate(["/mantenimiento-tipoUsuario"]) });
    }
  }

  verCheck() {
    //tomamos los seleccionados
    var seleccionados = "";
    var checks = document.getElementsByClassName("check");
    var check;
    for (var i = 0; i < checks.length; i++) {
      check = checks[i];
      if (check.checked == true)
      {
        seleccionados += check.name;//areyes obtenemos el id de las paginas seleccionadas
        seleccionados += "$";
      }
    }
    if (seleccionados != "") {
      seleccionados=seleccionados.substring(0, seleccionados.length - 1);
    }

    //gurdamos los valores en un formcontrol 
    this.tipoUsuario.controls["valores"].setValue(seleccionados);

  }

}
