import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'buscador-producto-nombre',
  templateUrl: './buscador-producto-nombre.component.html',
  styleUrls: ['./buscador-producto-nombre.component.css']
})
export class BuscadorProductoNombreComponent implements OnInit {

  @Output() clickButton: EventEmitter<any>;
  @Output() clickButtonCodigo: EventEmitter<any>;
  @Output() limpiarButton: EventEmitter<any>;


  constructor() {
    this.clickButton = new EventEmitter();
    this.clickButtonCodigo = new EventEmitter();
    this.limpiarButton = new EventEmitter();
  }

  ngOnInit() {
  }

  filtrar(nombre, codigo) {
    //this.clickButton.emit(nombre.value + "|" + codigo.value);
    this.clickButton.emit(nombre);
  }

  filtrarPorCodigo(codigo) {
    this.clickButtonCodigo.emit(codigo.value);
  }

  Limpiar(nombre) {
    this.limpiarButton.emit(nombre);
  }

}
