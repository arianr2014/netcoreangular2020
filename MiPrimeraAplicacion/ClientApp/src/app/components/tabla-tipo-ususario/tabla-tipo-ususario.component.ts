import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service'

@Component({
  selector: 'tabla-tipo-ususario',
  templateUrl: './tabla-tipo-ususario.component.html',
  styleUrls: ['./tabla-tipo-ususario.component.css']
})
export class TablaTipoUsusarioComponent implements OnInit {

  cabeceras: string[] = ["Id tipo usuario", "Nombre", "Descripcon"];
  tipoUsuarios: any;
  @Input() isMantenimiento: boolean = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.listarTipoUsuarios().subscribe(data => this.tipoUsuarios = data);
  }


  eliminar(iidtipousuario) {

  }
}
