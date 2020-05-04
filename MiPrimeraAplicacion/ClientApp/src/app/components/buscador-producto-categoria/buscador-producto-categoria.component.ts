import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { CategoriaService } from '../../services/categoria.service'
@Component({
  selector: 'buscador-producto-categoria',
  templateUrl: './buscador-producto-categoria.component.html',
  styleUrls: ['./buscador-producto-categoria.component.css']
})
export class BuscadorProductoCategoriaComponent implements OnInit {

  categorias: any;
  @Output() clickBuscar: EventEmitter<any>;
  @Output() clickLimpiar: EventEmitter<any>;


  constructor(private categoriaServicio: CategoriaService) {
    this.clickBuscar = new EventEmitter();
    this.clickLimpiar = new EventEmitter();
    
  }

  ngOnInit() {
    this.categoriaServicio.getCategoria().subscribe(data => this.categorias = data);
  }

  public buscar(categoria) {
    this.clickBuscar.emit(categoria);
  }

  public limpiar(categoria) {
    this.clickLimpiar.emit(categoria);
  }

}
