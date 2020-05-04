import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service'

@Component({
  selector: 'filtrado-usuario-tipo-usuario',
  templateUrl: './filtrado-usuario-tipo-usuario.component.html',
  styleUrls: ['./filtrado-usuario-tipo-usuario.component.css']
})
export class FiltradoUsuarioTipoUsuarioComponent implements OnInit {

  usuariosData: any;
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  filtrarPadre(tipoUsuario)
  {
    if (tipoUsuario.value == "")
    {
      this.usuarioService.getUsuario().subscribe(data => this.usuariosData = data);
    } else {
      this.usuarioService.getUsuarioPorTipo(tipoUsuario.value).subscribe(data => this.usuariosData = data);
    }
  }
}
