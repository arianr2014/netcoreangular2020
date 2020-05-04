import { Component, OnInit, Input} from '@angular/core';
import { PersonaService } from '../../services/persona.service';


@Component({
  selector: 'tabla-persona',
  templateUrl: './tabla-persona.component.html',
  styleUrls: ['./tabla-persona.component.css']
})
export class TablaPersonaComponent implements OnInit {
  @Input() personas: any;
  @Input() isMantenimiento = false;

  cabeceras: string[] = ["codigo", "nombre", "telefono", "correo"];
  constructor(private personaService: PersonaService) { }

  ngOnInit() {
    this.personaService.getPersona().subscribe(data => this.personas = data);
  }

  eliminar(idPersona) {
    if (confirm("Desea Eliminar") == true) {
      this.personaService.eliminarPersona(idPersona).subscribe(data => {
        this.personaService.getPersona().subscribe(data => this.personas = data);
      });
    }
    
  }

}
