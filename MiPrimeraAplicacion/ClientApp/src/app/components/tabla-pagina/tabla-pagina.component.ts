import { Component, OnInit, Input } from '@angular/core';
import { PaginaService } from '../../services/pagina.service'

@Component({
  selector: 'tabla-pagina',
  templateUrl: './tabla-pagina.component.html',
  styleUrls: ['./tabla-pagina.component.css']
})
export class TablaPaginaComponent implements OnInit {

  @Input() paginas: any;
  @Input() isMantenimiento: false;
  cabeceras: string[] = ["Id pagina", "Nombre pagina", "Accion"];

  constructor(private paginaService: PaginaService) { }

  ngOnInit()
  {
    this.paginaService.ListarPaginasBD().subscribe(data => this.paginas = data);
  }
  

  eliminarPagina(idPagina) {

    if (confirm("¿Desea eliminar la pagina?") == true) {
      this.paginaService.EliminarPagina(idPagina).subscribe(data => {
        this.paginaService.ListarPaginasBD().subscribe(data => this.paginas = data);
      });
    }
  }

}
