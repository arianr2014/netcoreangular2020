import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms' // formGroup para manejo de mapeo de los inputs, validators para opciones de validacion de datos
import { ProductoService } from '../../services/Producto.Service' //servicio que se comunica con el controlador
import { CategoriaService } from '../../services/categoria.service'// servicio que se comunica con el contralador
import { ActivatedRoute, Router} from '@angular/router'; //Router para poder hacer el redirect una vez que se guarde


@Component({
  selector: 'producto-form-mantenimiento',
  templateUrl: './producto-form-mantenimiento.component.html',
  styleUrls: ['./producto-form-mantenimiento.component.css']
})
export class ProductoFormMantenimientoComponent implements OnInit {

  //variables que pueden ser accedidas desde la pagina html
  producto: FormGroup;
  categorias: any; //variable para almacenar la data del combo categoria
  marcas: any; // variable para almacenar la data de marcas
  titulo: string; // variable para almacenar el nombre del titulo de la pagina editar o nuevo
  parametro: string; // variable para almacenar el id del editar o de la palabra nuevo 
  //en el constructor se inyecta lo que se va inmportando 
  constructor(private productoService: ProductoService, private categoriaService: CategoriaService,
    private activateRoute: ActivatedRoute, private route: Router ) {
    
    //inicializamos el el formgroup que sera usado en la pantalla html
    this.producto = new FormGroup({
      'idproducto': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)]), //cuando tiene varios validators se coloca []
      'precio': new FormControl("0", Validators.required),
      'stock': new FormControl("0", [Validators.required, this.noPuntoDecimal]),
      'idmarca': new FormControl("", Validators.required),
      'idcategoria': new FormControl("", Validators.required)
    });

  


  }

  //este metodo se llama al cargar la pagina
  ngOnInit()
  {
    //tomamos los valores del parametro para identificar si es la opcion nuevo o
    //estamos en la opcion de editar 
    this.activateRoute.params.subscribe(param => {
      this.parametro = param["id"];
      if (this.parametro == "nuevo") {
        this.titulo = "Agregando un nuevo producto";
      } else {
        this.titulo = "Editando un producto";
      }
    });

    //Llenamos los combos para eso definimos una variable del tipo marcas y categorias
    this.productoService.listarMarcas().subscribe(res => this.marcas = res);
    this.categoriaService.getCategoria().subscribe(res => this.categorias = res);

  
    //si estamos en la opcion de editar llamamos al servicio para que nos devuelva la data segun el id que
    //vino como parametro
    if (this.parametro != "nuevo") {
      //llamamos al servicio que devuelve los datos por id de producto
      this.productoService.obtenerProductoPorId(this.parametro).subscribe(data => {
        //seteamos los datos recibidos en el parametro data y se lo pasamos a formGroup producto
        //para que llene el formulario con los datos
        this.producto.controls["idproducto"].setValue(data.idproducto);
        this.producto.controls["nombre"].setValue(data.nombre);
        this.producto.controls["precio"].setValue(data.precio);
        this.producto.controls["stock"].setValue(data.stock);
        this.producto.controls["idmarca"].setValue(data.idmarca);
        this.producto.controls["idcategoria"].setValue(data.idcategoria);

      });
    }
  }

  guardarDatos() {
    // si los datos son validos
    if (this.producto.valid == true) {
      //llamamos al servicio de registrar datos
      this.productoService.registrarProducto(this.producto.value).subscribe(data => {
        //redireccionamos a la pagina que lista los productos
        this.route.navigate(["/mantenimiento-producto"]);
      });
    }
  }


  //validador personalizado
  noPuntoDecimal(control: FormControl) {
    //cuando esta vacio lo toma como null entonces no puede ser convertido a toString()
    if (control.value != null && control.value != "") {
      if ((<string>control.value.toString()).indexOf(".") > -1) {
        return { puntoDecimal: true }
      }
    }  
    return null;
  }


}

