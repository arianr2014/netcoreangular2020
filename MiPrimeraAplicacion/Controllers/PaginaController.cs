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
    public class PaginaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }


        [HttpGet]
        [Route("api/Pagina/listarPaginasBD")]
        public IEnumerable<PaginaCLS> ListarPaginasBD()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {

                List<PaginaCLS> lista = (from pagina in bd.Pagina
                                          where pagina.Bhabilitado == 1
                                          select new PaginaCLS
                                          {
                                              iidPagina= pagina.Iidpagina,
                                              mensaje = pagina.Mensaje,
                                              accion = pagina.Accion,
                                          }).ToList();
                return lista;
            }
        }



        [HttpPost]
        [Route("api/Pagina/guardarDatos")]
        public int GuardarDatos([FromBody]PaginaCLS oPaginaCLS)
        {
            string mensajeRetorno;
              int rpta = 0;
            try
            {

                using (BDRestauranteContext bd = new BDRestauranteContext())
                {

                    using (var transaccion = new TransactionScope())
                    {
                        if (oPaginaCLS.iidPagina == 0)
                        {
                            Pagina obj= new Pagina();
                            obj.Mensaje = oPaginaCLS.mensaje;
                            obj.Accion  = oPaginaCLS.accion;
                            obj.Bhabilitado = 1;
                            
                            bd.Pagina.Add(obj);
                            bd.SaveChanges();
                            transaccion.Complete();
                            rpta = 1;
                            mensajeRetorno = "Registrado correctamente";

                        }
                        else
                        {

                            Pagina obj = bd.Pagina.Where(p => p.Iidpagina == oPaginaCLS.iidPagina).First();
                            obj.Mensaje = oPaginaCLS.mensaje;
                            obj.Accion = oPaginaCLS.accion;
                            bd.SaveChanges();
                            transaccion.Complete();

                            rpta = 1;
                            mensajeRetorno = "Actualizado correctamente";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                rpta = 0;
                mensajeRetorno = "Error al guardar datos " + ex.Message;
            }
            return rpta;
        }


        [HttpGet]
        [Route("api/Pagina/eliminarPagina/{idPagina}")]
        public int EliminarPagina(int idPagina)
        {

            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {

                    Pagina obj = bd.Pagina.Where(p => p.Iidpagina == idPagina).First();
                    obj.Bhabilitado = 0;
                    bd.SaveChanges();
                }

                rpta = 1;
            }
            catch (Exception ex)
            {
                rpta = 0;
            }
            return rpta;
        }


        [HttpGet]
        [Route("api/Pagina/recuperarPagina/{idPagina}")]
        public PaginaCLS RecuperarPagina(int idPagina)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                PaginaCLS obj = new PaginaCLS();
                Pagina objBD = bd.Pagina.Where(p => p.Iidpagina == idPagina).First();
                obj.iidPagina = objBD.Iidpagina;
                obj.mensaje = objBD.Mensaje;
                obj.accion = objBD.Accion;

                return obj;

            }


        }
    }
}