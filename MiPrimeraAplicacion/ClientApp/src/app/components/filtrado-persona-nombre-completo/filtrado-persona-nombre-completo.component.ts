import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service'

@Component({
  selector: 'app-filtrado-persona-nombre-completo',
  templateUrl: './filtrado-persona-nombre-completo.component.html',
  styleUrls: ['./filtrado-persona-nombre-completo.component.css']
})
export class FiltradoPersonaNombreCompletoComponent implements OnInit {

  personasData: any;
  constructor(private personaService: PersonaService) { }

  ngOnInit() {
  }

  buscar(nombrecompleto) {
    this.personaService.getPersonaFiltro(nombrecompleto.value).subscribe(data => this.personasData = data);
  }
}
