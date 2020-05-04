import { Component, OnInit, Input } from '@angular/core';

import { ProductoService } from '../../services/Producto.Service'

@Component({
  selector: 'tabla-producto',
  templateUrl: './tabla-producto.component.html',
  styleUrls: ['./tabla-producto.component.css']
})
export class TablaProductoComponent implements OnInit {

  @Input() productos: any;
  @Input() isMantenimiento = false;

  cabeceras: string[] = ["Id Producto", "Nombre", "Precio", "Stock", "Nombre Categoria"];

  constructor(private productoService: ProductoService) {
   
  }
  //todo lo que pongamos en el ngOnInit se va a ejecutar cuando se carga la paggina
  ngOnInit() {

    this.productoService.getProducto().subscribe(data => this.productos = data);
  }

}
