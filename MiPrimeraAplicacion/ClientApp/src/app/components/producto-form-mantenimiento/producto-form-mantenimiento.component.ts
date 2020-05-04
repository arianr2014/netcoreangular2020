import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ProductoService } from '../../services/Producto.Service'
import { CategoriaService } from '../../services/categoria.service'

@Component({
  selector: 'producto-form-mantenimiento',
  templateUrl: './producto-form-mantenimiento.component.html',
  styleUrls: ['./producto-form-mantenimiento.component.css']
})
export class ProductoFormMantenimientoComponent implements OnInit {

  producto: FormGroup;
  categorias: any;
  marcas: any;
  constructor(private productoService: ProductoService, private categoriaService: CategoriaService) {
    this.producto = new FormGroup({
      'iidproducto': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      'precio': new FormControl("0", [Validators.required, ]),
      'stock': new FormControl("0", [Validators.required]),
      'idmarca': new FormControl("", [Validators.required]),
      'idcategoria': new FormControl("", [Validators.required])
    });
  }

  ngOnInit()
  {
    this.productoService.listarMarcas().subscribe(res => this.marcas = res);
    this.categoriaService.getCategoria().subscribe(res => this.categorias = res);
  }

}

