using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAplicacion.Clases;
using MiPrimeraAplicacion.Models;

namespace MiPrimeraAplicacion.Controllers
{
    public class CategoriaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/Categoria/listarCategorias")]
        public IEnumerable<CategoriaCLS> listarCategorias()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {

                List<CategoriaCLS> lista = (from categorias in bd.Categoria
                                           where categorias.Bhabilitado == 1
                                           select new CategoriaCLS
                                           {
                                               iidcategoria = categorias.Iidcategoria,
                                               nombre = categorias.Nombre

                                           }).ToList();
                return lista;
            }
        }
    }
}