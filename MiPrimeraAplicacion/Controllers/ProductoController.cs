using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAplicacion.Clases;
using MiPrimeraAplicacion.Models;
namespace MiPrimeraAplicacion.Controllers
{
    public class ProductoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("api/Producto/listarProductos")]
        public IEnumerable<ProductoCLS> listarProductos() {
            using (BDRestauranteContext bd = new BDRestauranteContext()) {

                List<ProductoCLS> lista = (from producto in bd.Producto
                                           join categoria in bd.Categoria
                                           on producto.Iidcategoria equals categoria.Iidcategoria
                                           where producto.Bhabilitado==1
                                           select new ProductoCLS
                                           {
                                               idproducto=producto.Iidproducto,
                                               nombre=producto.Nombre,
                                               precio=(decimal)producto.Precio,
                                               stock=(int)producto.Stock,
                                               nombreCategoria = categoria.Nombre

                                           }).ToList();
                return lista;
            }
        }


        [HttpGet]
        [Route("api/Producto/filtrarProductosPorNombre/{nombre}")]
        public IEnumerable<ProductoCLS> FiltrarProductosPorNombre(string nombre)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {

                List<ProductoCLS> lista = (from producto in bd.Producto
                                           join categoria in bd.Categoria
                                           on producto.Iidcategoria equals categoria.Iidcategoria
                                           where producto.Bhabilitado == 1
                                           && producto.Nombre.ToUpper().Contains(nombre.ToUpper())
                                           select new ProductoCLS
                                           {
                                               idproducto = producto.Iidproducto,
                                               nombre = producto.Nombre,
                                               precio = (decimal)producto.Precio,
                                               stock = (int)producto.Stock,
                                               nombreCategoria = categoria.Nombre

                                           }).ToList();
                return lista;
            }
        }

        [HttpGet]
        [Route("api/Producto/filtrarProductosPorCategoria/{idcategoria}")]
        public IEnumerable<ProductoCLS> FiltrarProductosPorCategoria(int idcategoria)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {

                List<ProductoCLS> lista = (from producto in bd.Producto
                                           join categoria in bd.Categoria
                                           on producto.Iidcategoria equals categoria.Iidcategoria
                                           where producto.Bhabilitado == 1
                                           && producto.Iidcategoria== idcategoria
                                           select new ProductoCLS
                                           {
                                               idproducto = producto.Iidproducto,
                                               nombre = producto.Nombre,
                                               precio = (decimal)producto.Precio,
                                               stock = (int)producto.Stock,
                                               nombreCategoria = categoria.Nombre

                                           }).ToList();
                return lista;
            }
        }



        [HttpGet]
        [Route("api/Producto/listarMarcas")]
        public IEnumerable<MarcaCLS> ListarMarcas()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {

                List<MarcaCLS> lista = (from marca in bd.Marca
                                           where marca.Bhabilitado == 1
                                           
                                           select new MarcaCLS
                                           {
                                               iidmarca = marca.Iidmarca,
                                               nombre = marca.Nombre

                                           }).ToList();
                return lista;
            }
        }


        [HttpGet]
        [Route("api/Producto/obtenerProductoPorId/{idProducto}")]
        public ProductoCLS ObtenerProductoPorId(int idProducto)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {

                ProductoCLS oProductoCLS = (from producto in bd.Producto
                                           where producto.Bhabilitado == 1
                                           && producto.Iidproducto==idProducto
                                           select new ProductoCLS
                                           {
                                               idproducto = producto.Iidproducto,
                                               nombre = producto.Nombre,
                                               precio = (decimal)producto.Precio,
                                               stock = (int)producto.Stock,
                                               idcategoria =(int) producto.Iidcategoria,
                                               idmarca=(int)producto.Iidmarca

                                           }).First();
                return oProductoCLS;
            }
        }



    }
}