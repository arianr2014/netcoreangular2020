import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service'

@Component({
  selector: 'tabla-usuario',
  templateUrl: './tabla-usuario.component.html',
  styleUrls: ['./tabla-usuario.component.css']
})
export class TablaUsuarioComponent implements OnInit {

  @Input() usuarios: any;
  @Input() isMantenimiento: false;
  cabeceras: string[] = ["Id usuario", "Nombre usuario", "Nombre persona", "Nombre Tipo"];

  constructor(private usuarioService: UsuarioService) {

  }

  ngOnInit() {
    this.usuarioService.getUsuario().subscribe(data => this.usuarios = data);
  }
    
  
  eliminarUsuario(idUsuario) {

    if (confirm("¿Desea eliminar el usuario?") == true) {
      this.usuarioService.eliminarUsuario(idUsuario).subscribe(data => {
        this.usuarioService.getUsuario().subscribe(data => this.usuarios = data);
      });
    }

  }

}
