using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAplicacion.Clases;
using MiPrimeraAplicacion.Models;

namespace MiPrimeraAplicacion.Controllers
{
    public class TipoUsuarioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }


        [HttpGet]
        [Route("api/TipoUsuario/listarTipoUsuario")]
        public List<TipoUsuarioCLS> ListarTipoUsuario()
        {
            List<TipoUsuarioCLS> listaTipoUsuario = new List<TipoUsuarioCLS>();
            using (BDRestauranteContext bd = new BDRestauranteContext()) {
                listaTipoUsuario = (from tipoUsuario in bd.TipoUsuario
                                    where tipoUsuario.Bhabilitado == 1
                                    select new TipoUsuarioCLS
                                    {
                                        iidtipousuario=tipoUsuario.Iidtipousuario,
                                        nombre=tipoUsuario.Nombre,
                                        descripcion=tipoUsuario.Descripcion,
                                        bhabilitado=(int)tipoUsuario.Bhabilitado,

                                    }).ToList();

            }
            return listaTipoUsuario;

        }


        [HttpGet]
        [Route("api/TipoUsuario/listarPaginasTipoUsuario")]
        public List<PaginaCLS> ListarPaginasTipoUsuario()
        {
            List<PaginaCLS> listaPaginas = new List<PaginaCLS>();
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                listaPaginas = (from pagina in bd.Pagina
                                    where pagina.Bhabilitado == 1
                                    select new PaginaCLS
                                    {
                                    
                                        iidPagina=pagina.Iidpagina,
                                        mensaje=pagina.Mensaje,
                                        bhabilitado = (int)pagina.Bhabilitado,

                                    }).ToList();

            }
            return listaPaginas;

        }

        [HttpGet]
        [Route("api/TipoUsuario/listarPaginasRecuperar/{idTipoUsuario}")]
        public TipoUsuarioCLS ListarPaginasRecuperar(int idTipoUsuario)
        { 
            TipoUsuarioCLS oTipoUsuarioCLS = new TipoUsuarioCLS();

            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<PaginaCLS> listarPaginas = (from tipoUsuario in bd.TipoUsuario
                                                 join paginatipoUsu in bd.PaginaTipoUsuario
                                                 on tipoUsuario.Iidtipousuario equals
                                                     paginatipoUsu.Iidtipousuario
                                                 join pagina in bd.Pagina
                                                 on paginatipoUsu.Iidpagina equals pagina.Iidpagina
                                                 where paginatipoUsu.Iidtipousuario == idTipoUsuario
                                                 && paginatipoUsu.Bhabilitado == 1
                                                 select new PaginaCLS
                                                 {
                                                     iidPagina=pagina.Iidpagina
                                                 }).ToList();

                TipoUsuario oTipoUsuario = bd.TipoUsuario.Where(p => p.Iidtipousuario == idTipoUsuario).First();
                oTipoUsuarioCLS.iidtipousuario = oTipoUsuario.Iidtipousuario;
                oTipoUsuarioCLS.nombre = oTipoUsuario.Nombre;
                oTipoUsuarioCLS.descripcion = oTipoUsuario.Descripcion;
                oTipoUsuarioCLS.listaPagina = listarPaginas;
            }

            return oTipoUsuarioCLS;

        }


        [HttpPost]
        [Route("api/TipoUsuario/guardarDatosTipoUsuario")]
        public int GuardarDatosTipoUsuario([FromBody]TipoUsuarioCLS oTipoUsuarioCLS)
        {

            int rpta = 0;
            try
            {

                using (BDRestauranteContext bd = new BDRestauranteContext())
                {

                    using (var transaccion = new TransactionScope())
                    {
                        if (oTipoUsuarioCLS.iidtipousuario == 0)
                        {
                            TipoUsuario oTipoUsuario = new TipoUsuario();
                            oTipoUsuario.Nombre = oTipoUsuarioCLS.nombre;
                            oTipoUsuario.Descripcion = oTipoUsuarioCLS.descripcion;
                            oTipoUsuario.Iidtipousuario = oTipoUsuarioCLS.iidtipousuario;
                            oTipoUsuario.Bhabilitado = 1;
                            bd.TipoUsuario.Add(oTipoUsuario);


                            int idTipoUsuarioGenerado = oTipoUsuario.Iidtipousuario;

                            string[] ids = oTipoUsuarioCLS.valores.Split("$");

                            for (int i = 0; i < ids.Length; i++) {
                                PaginaTipoUsuario oPaginaTipoUsuario = new PaginaTipoUsuario();
                                oPaginaTipoUsuario.Iidpagina =int.Parse(ids[i]);
                                oPaginaTipoUsuario.Iidtipousuario = idTipoUsuarioGenerado;
                                oPaginaTipoUsuario.Bhabilitado = 1;
                                bd.PaginaTipoUsuario.Add(oPaginaTipoUsuario);

                            }

                            bd.SaveChanges();
                            transaccion.Complete();

                            rpta = 1;

                        }
                        else
                        {

                            //Recuperamos la informacion

                            TipoUsuario oTipoUsuario = bd.TipoUsuario.Where(p => p.Iidtipousuario == oTipoUsuarioCLS.iidtipousuario).First();
                            oTipoUsuario.Nombre = oTipoUsuarioCLS.nombre;
                            oTipoUsuario.Descripcion = oTipoUsuarioCLS.descripcion;

                            string[] ids = oTipoUsuarioCLS.valores.Split("$");
                            //con el id tipo usuario (paginas asociadas lo vamos a deshabilitar)
                            List<PaginaTipoUsuario> lista = bd.PaginaTipoUsuario.Where(p => p.Iidtipousuario == oTipoUsuarioCLS.iidtipousuario).ToList();
                            foreach (PaginaTipoUsuario pag in lista) {
                                pag.Bhabilitado = 0;
                            }
                            //editar(si es que el id de  pagina es nuevo lo insertamos ,
                            //si es un editar lo cambiamos de habilitado 0 a 1)
                            int cantidad;
                            for (int i = 0; i < ids.Length; i++)
                            {
                                cantidad = lista.Where(p => p.Iidpagina == int.Parse(ids[i])).Count();
                                if (cantidad == 0)
                                {
                                    PaginaTipoUsuario oPaginaTipoUsuario = new PaginaTipoUsuario();
                                    oPaginaTipoUsuario.Iidpagina = int.Parse(ids[i]);
                                    oPaginaTipoUsuario.Iidtipousuario = oTipoUsuarioCLS.iidtipousuario;
                                    oPaginaTipoUsuario.Bhabilitado = 1;
                                    bd.PaginaTipoUsuario.Add(oPaginaTipoUsuario);
                                }
                                else {
                                    PaginaTipoUsuario op = lista.Where(p => p.Iidpagina == int.Parse(ids[i])).First();
                                    op.Bhabilitado = 1;

                                }
                            }
                            bd.SaveChanges();
                            transaccion.Complete();

                            rpta = 1;
                        }
                    }

                }
            }
            catch (Exception ex)
            {
                rpta = 0;
            }

            return rpta;
        }
    }
}