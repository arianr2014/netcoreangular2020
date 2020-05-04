import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service'

@Component({
  selector: 'buscador-usuario-tipo-usuario',
  templateUrl: './buscador-usuario-tipo-usuario.component.html',
  styleUrls: ['./buscador-usuario-tipo-usuario.component.css']
})
export class BuscadorUsuarioTipoUsuarioComponent implements OnInit {

  @Output() changeTipoUsuario: EventEmitter<any>;

  tipoUsuarios: any;
  constructor(private usuarioService: UsuarioService) {
    this.changeTipoUsuario = new EventEmitter();
  }

  ngOnInit() {
    this.usuarioService.getTipoUsuario().subscribe(data => this.tipoUsuarios = data);
  }

  filtrar(tipo) {
    this.changeTipoUsuario.emit(tipo);
  }

}
