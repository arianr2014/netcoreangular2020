import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/Producto.Service'

@Component({
  selector: 'app-filtrado-producto-nombre',
  templateUrl: './filtrado-producto-nombre.component.html',
  styleUrls: ['./filtrado-producto-nombre.component.css']
})
export class FiltradoProductoNombreComponent implements OnInit {

  productosData: any;
  constructor(private productoService: ProductoService) { }

  ngOnInit() {
  }

  filtrarDatos(nombre)
  {
    //console.log(nombre);
    if (nombre.value == "") {
      this.productoService.getProducto().subscribe(data => this.productosData = data);
    } else
    {
      this.productoService.getFiltroProductoPorNombre(nombre.value).subscribe(data => this.productosData = data);
    }

  }

  filtarPorCodigo(codigo) {
    console.log(codigo);
  }

  limpiar(nombre) {
    nombre.value = "";
    this.productoService.getProducto().subscribe(data => this.productosData = data);

  }
}
