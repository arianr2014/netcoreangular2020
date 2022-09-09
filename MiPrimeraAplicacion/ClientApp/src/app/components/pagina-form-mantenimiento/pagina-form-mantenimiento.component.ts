import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//instanciar al servicio
import { PaginaService } from '../../services/pagina.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'pagina-form-mantenimiento',
  templateUrl: './pagina-form-mantenimiento.component.html',
  styleUrls: ['./pagina-form-mantenimiento.component.css']
})
export class PaginaFormMantenimientoComponent implements OnInit {

  pagina: FormGroup;
  titulo: string = "";
  parametro: string;

  constructor(private paginaService: PaginaService, private route: Router,
    private activatedRoute: ActivatedRoute) {
    this.pagina = new FormGroup(
      {
        'iidPagina': new FormControl('0'),
        'mensaje': new FormControl('', [Validators.required, Validators.maxLength(100)]),
        'accion': new FormControl('', [Validators.required, Validators.maxLength(150)])

      });

    this.activatedRoute.params.subscribe(_parametro => {
      this.parametro = _parametro["id"];
      if (this.parametro == "nuevo") {
        this.titulo = "Agregando página";
      } else {
        this.titulo = "Editando página"

      }
    });


  }

  ngOnInit() {
    if (this.parametro != "nuevo") {
      //recuperamos el elemento
      this.paginaService.RecuperarPagina(this.parametro).subscribe(data => {

        this.pagina.controls["iidPagina"].setValue(data.iidPagina);
        this.pagina.controls["mensaje"].setValue(data.mensaje);
        this.pagina.controls["accion"].setValue(data.accion);
      });

    }

  }

  guardarDatos() {
    if (this.pagina.valid == true) {
      this.paginaService.guardarDatos(this.pagina.value)
        .subscribe(data => {
          //+ data.mensajeRetorno
          this.route.navigate(["/mantenimiento-pagina"])

        });
    }
  }
}
