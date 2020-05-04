import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/Producto.Service'
@Component({
  selector: 'filtrado-producto-categoria',
  templateUrl: './filtrado-producto-categoria.component.html',
  styleUrls: ['./filtrado-producto-categoria.component.css']
})
export class FiltradoProductoCategoriaComponent implements OnInit {

  constructor(private productoService:ProductoService) { }
  productosData: any;
  ngOnInit() {
  }

  buscar(categoria) {
    if (categoria.value == "") {
      this.productoService.getProducto().subscribe(data => this.productosData=data);
    } else {
      this.productoService.getFiltroProductoPorCategoria(categoria.value).subscribe(data => this.productosData = data);
    }
    
  }

  limpiar(categoria) {
    categoria.value = "";
    this.productoService.getProducto().subscribe(data => this.productosData = data);

  }
}
