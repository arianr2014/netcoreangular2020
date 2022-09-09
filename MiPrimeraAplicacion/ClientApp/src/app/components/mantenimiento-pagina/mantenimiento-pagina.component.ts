import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'mantenimiento-pagina',
  templateUrl: './mantenimiento-pagina.component.html',
  styleUrls: ['./mantenimiento-pagina.component.css']
})
export class MantenimientoPaginaComponent implements OnInit {

  mensajeRetorno: any;
  mesajeGuardarDatos: any;
  ver: boolean=false;  //areyes para ocultar o mostrar div controles en la pagina
  constructor(private route: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    //this.activatedRoute.params.subscribe(_parametro => {
    //  this.mensajeRetorno = _parametro["mensajeRetorno"];
    //  if (this.mensajeRetorno != null || this.mensajeRetorno != "") {
    //    this.mesajeGuardarDatos = this.mensajeRetorno;
    //    this.ver = true;
    //  } else {
    //    this.mesajeGuardarDatos = "";
    //    this.ver = false;
    //  }
    //});
  }

}
